import Popup from "reactjs-popup"
import GroupBox from "../components/Groups/GroupBox"
import Header from "../components/Header"
import GroupCreation from "../components/Groups/GroupCreation"
import { useEffect, useState } from "react"
import firebase from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { UserInfo, GroupInfo} from "../components/DatabaseTypes.ts"

const auth = getAuth(firebase.app);

interface ExtendedGroupInfo extends GroupInfo{
    groupID: string
}

function AllGroupsPage() {

    const [user, loading] = useAuthState(auth);
    const defaultValue: ExtendedGroupInfo[] = [];
    const [groupInfo, setGroupInfo] = useState(defaultValue);
    const [doneGettingGroups, setDoneGettingGroups] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState(" ");
    const [filteredAndSortedGroupArray, setFilteredAndSortedGroupArray] = useState(defaultValue);

    function handleSearch(){
        const searchBar = document.getElementById("group-page-search-bar") as HTMLTextAreaElement
        setSearchBarValue(searchBar.value)
    }

    function addGroup(group: ExtendedGroupInfo){
        const newGroups = [...groupInfo];
        newGroups.splice(0, 0, group);
        setGroupInfo(newGroups);
    }

    async function getGroups(){
        const userRef = doc(firebase.db, "users", user!.uid);
        const docUserSnap = await getDoc(userRef);
        if(docUserSnap.exists()){
            const userData = docUserSnap.data() as UserInfo;
            const groupArray = [];
            for(const groupID of userData.groups){
                const groupRef = doc(firebase.db, "groups", groupID);
                const docGroupSnap = await getDoc(groupRef);
                if(docGroupSnap.exists()){
                    const groupData = docGroupSnap.data() as ExtendedGroupInfo;
                    groupData.groupID = groupID;
                    groupArray.push(groupData);
                }
            }
            const sortedGroupArray: ExtendedGroupInfo[] =  [];
            while(groupArray.length > 0){
                let biggest = 0;
                let biggestIndex = -1;
                for(let i = 0; i < groupArray.length; i++){
                    if(groupArray.at(i)!.creationDate.seconds > biggest){
                        biggest = groupArray.at(i)!.creationDate.seconds;
                        biggestIndex = i;
                    }
                }

                sortedGroupArray.push(groupArray.at(biggestIndex)!);           
                groupArray.splice(biggestIndex, 1);
            }
            
            setGroupInfo(sortedGroupArray);
            setDoneGettingGroups(true);
            handleSearch();
        }
    }
    useEffect(() => {
        if(user === null){
            return
        }
        getGroups();

    }, [loading]);

    useEffect(() => {
        const tempFilteredGroupArray: ExtendedGroupInfo[] =  [];
        for(let i = 0; i < groupInfo.length; i++){
            if(groupInfo.at(i)?.name.match(new RegExp(searchBarValue, "i")) !== null){
                tempFilteredGroupArray.push(groupInfo.at(i)!);
            }
        }
        setFilteredAndSortedGroupArray(tempFilteredGroupArray)
    }, [searchBarValue])

    
    return (
        <>
            <div className="w-screen absolute bg-repeat-y">
                <Header />
                <h1 className="text-left mt-24 text-4xl text-white w-max ml-[9vw] border-l-4 pl-5 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]" >Your groups:</h1>

                <div className="flex flex-row relative pl-[9vw] ml-[860px] text-left mt-10">
                    <div className="absolute z-10 mt-[2px] ml-[6px] pointer-events-auto">
                        <img className="h-7 invert contrast-[20%]" src="search_picture.svg" />
                    </div>
                    <input id="group-page-search-bar" onChange={handleSearch} type="text" className="relative h-8 w-56 pr-8 pl-10 rounded-lg z-0 focus:shadow focus:outline-none opacity-80" placeholder="Search name..."/> 
                </div>

             

                <div className="bg-blue-400 w-[1100px] rounded-lg bg-opacity-20 mt-3 ml-[9vw] mr-[9vw] overflow-y-scroll max-h-[1000px] h-[50vh]">
                    {filteredAndSortedGroupArray.length > 0 ? 
                    filteredAndSortedGroupArray.map((_group, index) => (
                        
                        <GroupBox key={index} index={index} groupID={_group.groupID} groupName={_group.name} description={_group.description} leaderName={_group.leaderName}/>
                    )) : 
                    (doneGettingGroups ? 
                    <p className="text-gray-500 text-3xl font-bold mt-6 ml-6">No groups...</p> :
                    <div className="flex flex-row  mt-6 ml-6 align-middle">
                        <img src="loading_picture.svg" className="animate-spin invert h-10"/>
                        <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
                    </div>
                    )}
                </div>


                <Popup
                    trigger={
                     <div className="relative cursor-pointer">
                        <img src="group_add_picture.svg" className="invert absolute z-20 ml-[9vw] pl-4 mt-1 h-9 w-auto peer"/>
                        <p className="w-max text-white py-2 pl-16 pr-6 mt-4 ml-[9vw] rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100">Create group</p>
                    </div> 
                    }

                    modal
                    nested
                    closeOnDocumentClick={false}
                >
                    {/* @ts-ignore */}
                    {(close) => (
                    <div className="animate-anvil text-white bg-extraColor1 rounded-lg w-[40vw] min-w-[500px] m-auto overflow-y-scroll h-[80vh] min-h-[600px] bg-opacity-90 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                        <button onClick={close} className="text-3xl ml-2">X</button>
                        <h1 className="text-4xl text-center mt-10">Create a Group</h1>
                        <GroupCreation closeFunction={close} addGroup={addGroup}/>
                    </div>
                        )}

              </Popup>
      
            </div>
        </>
    )
}

export default AllGroupsPage