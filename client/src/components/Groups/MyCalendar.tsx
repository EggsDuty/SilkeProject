import { FC, useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import addHours from 'date-fns/addHours'
import startOfHour from 'date-fns/startOfHour'

import 'react-big-calendar/lib/css/react-big-calendar.css'

interface Props {
  events: string[]
}


function MyCalendar(props: Props) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    
    const eventsInfo: Event[] = [];
    /* if(props.events === undefined){
      return;
    } */
    for(let i = 0; i < props.events.length; i++){
      const eventParts = props.events[i].split(";");
      const event: Event = {
        title: eventParts[0],
        start: new Date(eventParts[1]),
        end: new Date(eventParts[2])
      }
      eventsInfo.push(event);
    }
  
    setEvents(eventsInfo);
}, [])

  return (
    <Calendar
      defaultView='month'
      events={events}
      localizer={localizer}
      style={{ height: '100%' }}
      views={['month', 'agenda']}
      className='bg-white'
    />
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