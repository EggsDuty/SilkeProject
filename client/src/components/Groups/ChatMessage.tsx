import { Message } from "../DatabaseTypes";

interface MemberInfo {
    userID: string,
    displayName: string,
    image: string
}

interface Props {
    messageInfo: Message,
    allMembersInfo: MemberInfo[]
}

function ChatMessage(props: Readonly<Props>) {
    const messageInfo = props.messageInfo;
    let member: MemberInfo | null = null;

    for (const _member of props.allMembersInfo) {
        if (_member.userID === messageInfo.userID) {
            member = _member;
            break;
        }
    }

    if (!member) return;

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

export default ChatMessage;