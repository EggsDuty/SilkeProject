import { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import addHours from 'date-fns/addHours'
import startOfHour from 'date-fns/startOfHour'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import Popup from 'reactjs-popup'
import GroupField from './GroupField'
import Validator from '../Auth/Validator'
import { DeleteEventInfoPromise, UpdateEventInfoPromise } from '../DatabaseFunctions'
import { useParams } from 'react-router-dom'

interface Props {
  events: string[],
  reload: any
}


function MyCalendar(props: Readonly<Props>) {
  const { groupID } = useParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event>();

  const [currentEventInOneLine, setCurrentEventInOneLine] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  let hasErrors = false;
  if (Validator.ValidateEventTitle(title).length !== 0 || Validator.ValidateEventDate(dateStart, dateEnd).length !== 0 || Validator.ValidateEventDescription(description).length !== 0) {
      hasErrors = true;
  }

  useEffect(() => {
    const eventsInfo: Event[] = [];
    for(let i = 0; i < props.events.length; i++){
      const eventParts = props.events[i].split(";");
      const event: Event = {
        title: eventParts[0],
        start: new Date(eventParts[1]),
        end: new Date(eventParts[2]),
        resource: {id: i, title: eventParts[3]}
      }
      eventsInfo.push(event);
    }
  
    setEvents(eventsInfo);

}, [])

function handleSelectEvent(event: Event){
  const eventCopy = structuredClone(event);

  eventCopy.start?.setMinutes(eventCopy.start.getMinutes() - eventCopy.start.getTimezoneOffset());
  eventCopy.end?.setMinutes(eventCopy.end.getMinutes() - eventCopy.end.getTimezoneOffset());

  const newTitle = eventCopy?.title?.toString()!;
  const newStart = eventCopy?.start?.toISOString().slice(0,-8)!;
  const newEnd = eventCopy?.end?.toISOString().slice(0,-8)!;
  const newDescription = eventCopy?.resource.title;

  setCurrentEvent(eventCopy);
  setTitle(newTitle);
  setDateStart(newStart);
  setDateEnd(newEnd);
  setDescription(newDescription);

  const eventInfo=newTitle+";"+newStart+";"+newEnd+";"+newDescription;
  setCurrentEventInOneLine(eventInfo);
  setIsPopupOpen(true);
}

function handleXClick(close: any){
  setIsPopupOpen(false);
  close();
}

async function handleEventChange(close: any){
  if(hasErrors){
    return;
  }
  const eventInfo=title+";"+dateStart+";"+dateEnd+";"+description;
  await UpdateEventInfoPromise(groupID!, currentEventInOneLine, eventInfo);

  props.reload();
  setIsPopupOpen(false);
  close();
}

async function handleEventDelete(close: any){
  if(hasErrors){
    return;
  }
  await DeleteEventInfoPromise(groupID!, currentEventInOneLine);

  props.reload();
  setIsPopupOpen(false);
  close();
}

  return (
    <>
    <Calendar
      defaultView='month'
      events={events}
      localizer={localizer}
      style={{ height: '100%' }}
      views={['month', 'agenda']}
      className='bg-white'
      popup
   //   selected={selected}
      onSelectEvent={(_event) => {
        handleSelectEvent(_event);
      }}
      
    />

    <Popup
        open={isPopupOpen}
        modal
        nested
        closeOnDocumentClick={false}
    >
        {/* @ts-ignore */}
        {(close) => (
        <div className="animate-anvil text-white bg-extraColor1 rounded-lg w-[40vw] min-w-[500px] m-auto overflow-y-scroll h-[80vh] min-h-[620px] bg-opacity-90 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
            <button onClick={() => handleXClick(close)} className="text-3xl ml-2">X</button>
            <h1 className="text-4xl text-center mt-10">Event information</h1>
            <div className="mx-16">
              <GroupField name="Event title:" defaultValue={currentEvent?.title?.toString()} placeholder="New event title..." type="text" validateFunction={Validator.ValidateEventTitle} var={trimmedTitle} setter={setTitle} />
              <GroupField name="Start date:" defaultValue={currentEvent?.start?.toISOString().slice(0,-8)} placeholder="" type="datetime-local" validateFunction={Validator.ValidateEventDate} var={dateStart} setter={setDateStart} />
              <GroupField name="End date:" defaultValue={currentEvent?.end?.toISOString().slice(0,-8)} placeholder="" type="datetime-local" validateFunction={Validator.ValidateEventDate} var={dateEnd} setter={setDateEnd} />
              <GroupField isDescription={true} name="Description (optional):" defaultValue={currentEvent?.resource.title.toString()} placeholder="New event description..." type="text" validateFunction={Validator.ValidateGroupDescription} var={trimmedDescription} setter={setDescription} />
              <div className="flex flex-row">
                <button onClick={() => handleEventChange(close)} className={`w-max text-white py-1 mb-6 px-5 mt-2 rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100 ${hasErrors ? "cursor-not-allowed" : ""}`}>Save</button>
                <button onClick={() => handleEventDelete(close)} className={`w-max ml-auto mr-0 text-white py-1 mb-6 px-5 mt-2 rounded-lg bg-red-950 border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100 ${hasErrors ? "cursor-not-allowed" : ""}`}>Delete event</button>
              </div>
            </div>
        </div>
            )}

    </Popup>
</>
  )
}

const locales = {
  'en-US': enUS,
}
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 2)
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default MyCalendar