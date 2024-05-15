import { FormEvent, useEffect, useRef, useState } from "react";
import { CreateMessage, GetMessages } from "../DatabaseFunctions";
import { Message } from "../DatabaseTypes";
import { Timestamp, collection, onSnapshot, query, where } from "firebase/firestore";
import firebase from "../../firebase";
import ChatMessage from "./ChatMessage";

interface MemberInfo {
    userID: string,
    displayName: string,
    image: string
}

interface ExtendedMessage extends Message {
    messageID: string
}

interface Props {
    groupID: string | undefined,
    memberInfo: MemberInfo[]
}

const db = firebase.db;

function ChatComponent(props: Readonly<Props>) {
    const uid = localStorage.getItem("uid");
    const name = localStorage.getItem("username");

    const textBoxRef = useRef(null);
    const [messages, setMessages] = useState<ExtendedMessage[]>([]);
    const [oldestMessageDate, setOldestMessageDate] = useState<Date>();
    const [loadingMoreMessages, setLoadingMoreMessages] = useState<boolean>(false);
    const [reachedEnd, setReachedEnd] = useState<boolean>(false);

    async function handleSend(event: FormEvent) {
        event.preventDefault();
        const textBox = textBoxRef.current as HTMLTextAreaElement | null;
        if (!textBox) return;
        if (textBox.value === null || textBox.value === "") return;

        const _message = textBox.value;
        textBox.value = "";

        if (!props.groupID) return;
        if (!uid) return;
        if (!name) return;

        await CreateMessage(props.groupID, uid, name, _message);
    }

    async function loadMoreMessages() {
        if (loadingMoreMessages) return;
        setLoadingMoreMessages(true);

        const groupID = props.groupID;
        if (!groupID) return;

        const newMessages = await GetMessages(groupID, oldestMessageDate);
        for (const _message of newMessages) {
            messages.push(_message);
        }
        if (newMessages.length === 0) {
            setReachedEnd(true);
            return;
        }
        setOldestMessageDate(newMessages[newMessages.length - 1].time.toDate());
        setLoadingMoreMessages(false);
        setMessages([...messages]);
    }

    // not a form event though is it
    function onScroll(event: FormEvent) {
        if (reachedEnd) return;
        const chatBox = event.target as HTMLDivElement;
        const scrollAmount = chatBox.scrollTop;
        if (scrollAmount < 100) {
            loadMoreMessages();
        }
    }

    useEffect(() => {
        if (!props.groupID) return;

        GetMessages(props.groupID).then((_messages) => {
            if (_messages.length > 0) {
                setOldestMessageDate(_messages[_messages.length - 1].time.toDate());
            }
            setMessages(_messages);
        });
    }, []);

    useEffect(() => {
        if (!props.groupID) return;

        const openingTime = Timestamp.now();
        const q = query(collection(db, "groups", props.groupID, "messages"), where("time", ">", openingTime));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const _message = change.doc.data() as ExtendedMessage;
                    _message.messageID = change.doc.id;
                    setMessages((prev) => [_message, ...prev]);
                }
            });
        });

        return function cleanup() {
            unsubscribe();
        }
    }, []);

    const reversedMessages = [...messages].reverse();
    return (
        <div className="relative flex flex-row bg-blue-400 w-[800px] rounded-lg bg-opacity-20 mt-3 ml-[9vw] h-[500px] mb-20">
            <div id="chat-scroll" className="divide-y overflow-y-scroll mb-10 w-full" onLoad={scrollToBottom} onScroll={(e) => onScroll(e)}>
                {reversedMessages.map((_messageInfo) => (
                    <div className="bg-blue-400 bg-opacity-30 flex flex-row mt-0 mb-0 py-2 pl-1 w-full" key={_messageInfo.messageID}>
                        <ChatMessage allMembersInfo={props.memberInfo} messageInfo={_messageInfo} />
                    </div>
                ))}
            </div>
            <form className="flex flex-row absolute bottom-0 h-10 w-full" onSubmit={(e) => handleSend(e)}>
                <input className="grow outline-none text-2xl pl-3" type="text" ref={textBoxRef}></input>
                <button className="px-10 bg-secondaryColor hover:brightness-150" type="submit"><img src="/send_picture.svg" /></button>
            </form>
        </div>
    );
}

function scrollToBottom() {
    const chatBox = document.getElementById("chat-scroll") as HTMLDivElement;
    chatBox.scrollTop = chatBox.scrollHeight;
}

export default ChatComponent;