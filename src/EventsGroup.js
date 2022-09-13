import {getEventColor, getEventHeight, getEventPosition} from './helpers';

// We can group events that dont overlap in column so they take the maximum width available
const groupEventsPerColumn = (events) => {
  let eventsPerColumn = []

  events.forEach(event => {
    if (eventsPerColumn.length == 0){
      eventsPerColumn.push([event])
    }
    else {
      let columnIndex = eventsPerColumn.length;
      for(let i = 0;i < eventsPerColumn.length; i++) {
        let column = eventsPerColumn[i];
        let lastColumnEvent = column[column.length - 1]

        if (event.startMinute >= lastColumnEvent.endMinute) {
          columnIndex = i;
          break;
        }
      }
      if (columnIndex == eventsPerColumn.length)
        eventsPerColumn.push([event])
      else
        eventsPerColumn[columnIndex].push(event)
    }
  })
  return eventsPerColumn
}

const EventsGroup = ({events}) => {
  const eventsPerColumn = groupEventsPerColumn(events)

  return(
    <div className="event-wrapper">
 {eventsPerColumn.map(columnEvent => (
  <div className="event-column">
    {columnEvent.map(event => <div className="event-block" style={{
  top: getEventPosition(event.startMinute),
  height: getEventHeight(event.duration),
  backgroundColor: getEventColor(event.id)}}>
  {event.id}
</div>)}
  </div>
        
      ))}
</div>
)
  
}

export default EventsGroup
