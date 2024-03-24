import { useParams } from "react-router-dom"
import Header from "../components/Header"

function GroupPage(){
    const { groupID } = useParams();

    return(
        <>
            <div className="w-screen absolute text-center bg-repeat-y">
                <Header />
                <h1>{groupID}</h1>
            </div>
        </>
    )
}

export default GroupPage