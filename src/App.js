import './App.css';
import events from './input.json';
import {areEventsOverlapping, verifyEvents} from './helpers';
import moment from "moment";
import EventsGroup from './EventsGroup';

function App() {
  events = events.map(event => {
    const time = moment(event.start, 'hh:mm')
    return {...event, startMinute: time.hour() * 60 + time.minute() - 540, endMinute: time.hour() * 60 + time.minute() + event.duration - 540}
  }).sort((eventA, eventB) => eventA.startMinute - eventB.startMinute)

  const errors = verifyEvents(events)
  if (errors.length > 0)
    alert(`Some events are out of timeschedule : ${errors.join(',')}`)

  let overlappingEvents = [];

  events.forEach(event => {
    let overlappingEventsLength = overlappingEvents.length
    if (overlappingEventsLength == 0)
      overlappingEvents.push([event])
    else {
      let lastEventsGroup = overlappingEvents[overlappingEventsLength - 1]
      let overlappingResults = lastEventsGroup.map(lastGroupEvent => areEventsOverlapping(lastGroupEvent, event))
      // If the event overlaps with any event from a group we add it to this group
      if (overlappingResults.indexOf(true) != -1){
        overlappingEvents[overlappingEventsLength - 1].push(event)
      }
      else
        overlappingEvents.push([event])
    }
  })

  return (
    <div className="App">
           {overlappingEvents.map((eventsGroup) => <EventsGroup events={eventsGroup} /> 
           )}
    </div>
  );
}

export default App;
