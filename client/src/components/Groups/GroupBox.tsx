import { Link } from "react-router-dom"
import { Tooltip } from 'react-tooltip'

interface Props {
    groupID: string,
    groupName: string | JSX.Element,
    description: string,
    leaderName: string,
    index: number
}

function GroupsBox(props: Props) {

    return (
        <div className="flex flex-row bg-blue-400 bg-opacity-20 pb-3 px-3 h-14 items-center text-white border-b-[1px]">
            <div className="w-[20%]">
                <Link to={`/group/${props.groupID}`} className="truncate text-left mt-2 pl-3 hover:underline"> {props.groupName}</Link>
            </div>

            <p className={`${"s" + props.index.toString()} truncate text-left min-w-[60%] max-w-[60%] mt-2 text-gray-400 peer`}>{props.description}</p>
            <Tooltip anchorSelect={".s" + props.index.toString()} place="top" delayShow={600}>
                {props.description}
            </Tooltip>

            <p className="truncate text-right min-w-[20%] max-w-[20%] mt-2 pr-3">By {props.leaderName}</p>

        </div>
    )
}

export default GroupsBox