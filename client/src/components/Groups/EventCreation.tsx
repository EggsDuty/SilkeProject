import { FormEvent, useState } from "react";
import Validator from "../Auth/Validator";
import GroupField from "./GroupField";
import { CreateNewEventPromise } from "../DatabaseFunctions.ts";
import { useParams } from "react-router-dom";

interface Props {
    closeFunction: any,
    addEvent: any
}

function EventCreation(props: Readonly<Props>) {
    const { groupID } = useParams();
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");

    let hasErrors = false;
    if (Validator.ValidateEventTitle(title).length !== 0 || Validator.ValidateEventDate(startDate, endDate).length !== 0 || Validator.ValidateEventDescription(description).length !== 0) {
        hasErrors = true;
    }

    async function handleEventCreation(e: FormEvent) {
        e.preventDefault();

        if (hasErrors) {
            return;
        }
        
        const eventInfo=title+";"+startDate+";"+endDate+";"+description;

        console.log(groupID);
        console.log(eventInfo);
        await CreateNewEventPromise(groupID!, eventInfo);
        props.addEvent();

        props.closeFunction();
    }

    return (
        <form onSubmit={(e) => handleEventCreation(e)} className="mx-16">
            <GroupField name="Event title:" placeholder="Your title..." type="text" validateFunction={Validator.ValidateEventTitle} var={title} setter={setTitle} />
            <GroupField name="Start date:" placeholder="" type="datetime-local" validateFunction={Validator.ValidateEventDate} var={startDate} setter={setStartDate} />
            <GroupField name="End date:" placeholder="" type="datetime-local" validateFunction={Validator.ValidateEventDate} var={endDate} setter={setEndDate} />
            <GroupField isDescription={true} name="Event description (optional):" placeholder="Your event description..." type="text" validateFunction={Validator.ValidateEventDescription} var={description} setter={setDescription} />
            <button type="submit" className={`mb-6 mt-6 py-2 px-6 text-white rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white ${hasErrors ? "cursor-not-allowed" : ""}`}>Create</button>
        </form>

    )
}

export default EventCreation;