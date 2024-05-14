import { FormEvent, useEffect, useRef, useState } from "react";
import { CreateMessage, GetMessages } from "../DatabaseFunctions";
import { Message } from "../DatabaseTypes";
import { Timestamp } from "firebase/firestore";

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

function ChatComponent(props: Readonly<Props>) {
    const uid = localStorage.getItem("uid");
    const name = localStorage.getItem("username");

    const textBoxRef = useRef(null);
    const [messages, setMessages] = useState<ExtendedMessage[]>([]);
    const [oldestMessageDate, setOldestMessageDate] = useState<Date>();
    const [loadingMoreMessages, setLoadingMoreMessages] = useState<boolean>(false);
    const [reachedEnd, setReachedEnd] = useState<boolean>(false);

    function generateMessage(messageInfo: ExtendedMessage) {
        let member: MemberInfo | null = null;

        for (const _member of props.memberInfo) {
            if (_member.userID === messageInfo.userID) {
                member = _member;
                break;
            }
        }

        if (!member) return;

        //messageInfo.message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna orci, dictum ac nibh pellentesque, ultricies dapibus purus. Nullam vel tortor nec lorem ullamcorper congue. Cras ullamcorper rhoncus laoreet. Cras varius tortor et laoreet mollis. Duis in enim nec neque fringilla dignissim et non nibh. Sed id nisl maximus, tempor libero at, vehicula neque. Quisque lectus mi, molestie ut magna eget, sodales porttitor nisl. Proin mattis nisl vel euismod consequat. Donec molestie ipsum ut maximus bibendum."
        //member.displayName = "OnlyTwentyCharacters";

        const currentDay = new Date().getDate();

        const date = messageInfo.time.toDate();
        let hours: string | number = date.getHours();
        if (hours < 10) {
            hours = "0" + hours.toString();
        }
        let minutes: string | number = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes.toString();
        }

        return (
            <>
                <div className="ml-2 flex flex-col items-start">
                    <div className="flex flex-row items-start w-32">
                        <img className="mt-1 h-7 w-7 rounded-full" src={member?.image} />
                        <p className="ml-2 text-left px-1 w-24 text-neutral-300 truncate">{member.displayName}</p>
                    </div>
                    {date.getDate() < currentDay ? <p className="text-neutral-400 text-xs">{messageInfo.time.toDate().toDateString()}</p> : ""}
                    <p className="w-min h-auto text-neutral-400">{hours + ":" + minutes}</p>
                </div>
                <p className="h-full p-1 text-xl text-white text-left text-wrap w-full">{messageInfo.message}</p>
            </>
        );
    }

    async function handleSend(event: FormEvent) {
        event.preventDefault();
        const textBox = textBoxRef.current as HTMLTextAreaElement | null;
        if (!textBox) return;

        if (textBox.value === null || textBox.value === "") return;

        if (!props.groupID) return;
        if (!uid) return;
        if (!name) return;

        await CreateMessage(props.groupID, uid, name, textBox.value);
        textBox.value = "";
    }

    function scrollToBottom() {
        const chatBox = document.getElementById("chat-scroll") as HTMLDivElement;
        chatBox.scrollTop = chatBox.scrollHeight;
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

    const reversedImages = [...messages].reverse();
    return (
        <div className="relative flex flex-row bg-blue-400 w-[800px] rounded-lg bg-opacity-20 mt-3 ml-[9vw] h-[500px] mb-20">
            <div id="chat-scroll" className="divide-y overflow-y-scroll mb-10 w-full" onLoad={scrollToBottom} onScroll={(e) => onScroll(e)}>
                {reversedImages.map((_messageInfo) => (
                    <div className="bg-blue-400 bg-opacity-30 flex flex-row mt-0 mb-0 py-2 pl-1 w-full" key={_messageInfo.userID + _messageInfo.message + _messageInfo.time}>
                        {generateMessage(_messageInfo)}
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

export default ChatComponent;