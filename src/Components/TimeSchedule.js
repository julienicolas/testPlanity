import { areEventsOverlapping, getInScheduleEvents, verifyEventsIntegrity } from "../helpers";
import moment from "moment";
import OverlappingEventsGroup from "./OverlappingEventsGroup";
import CustomAlert from "./CustomAlert";
import { useState } from "react";

const DAY_START = 540

// getEventsWithTime return events with time calculation attributes
// knowing the day starts at 9am we remove 540mn to make calculations easier and start at 0mn
const getEventsWithTime = (events) => {
  return events.map((event) => {
    const time = moment(event.start, "hh:mm");
    const mmtMidnight = time.clone().startOf('day');
    const startMinute = time.diff(mmtMidnight, 'minutes');
    return {
      ...event,
      startMinute:  startMinute - DAY_START,
      endMinute: startMinute + event.duration - DAY_START,
    };
  }).sort((eventA, eventB) => eventA.startMinute - eventB.startMinute)
}

const TimeSchedule = ({inputEvents}) => {
  const eventsWithTime =  getEventsWithTime(inputEvents)
  const events =  getInScheduleEvents(eventsWithTime);
  const [errors, setErrors] = useState(verifyEventsIntegrity(eventsWithTime))
  
  let overlappingEvents = [];

  events.forEach((event) => {
    let overlappingEventsLength = overlappingEvents.length;
    if (overlappingEventsLength == 0) overlappingEvents.push([event]);
    else {
      let lastEventsGroup = overlappingEvents[overlappingEventsLength - 1];
      let overlappingResults = lastEventsGroup.map((lastGroupEvent) =>
        areEventsOverlapping(lastGroupEvent, event)
      );
      // If the event overlaps with any event from a group we add it to this group
      if (overlappingResults.indexOf(true) != -1) {
        overlappingEvents[overlappingEventsLength - 1].push(event);
      } else overlappingEvents.push([event]);
    }
  });

  if (errors.length > 0)
    setTimeout(() => setErrors([]), 3000) // errors alert is removed after 3s

  return (
    <div>
    {errors.length > 0 && <CustomAlert>{errors.join(",")}</CustomAlert>}
    {overlappingEvents.map((eventsGroup, index) => (
      <OverlappingEventsGroup events={eventsGroup} key={`event-group-${index}`} />
    ))}
    </div>
  )
}

export default TimeSchedule
