import { getEventColor, getEventHeight, getEventPositionInWindow } from "../helpers";

// We can group events that dont overlap in column so they take the maximum width available
const groupEventsPerColumn = (events) => {
  let eventsPerColumn = [];

  events.forEach((event) => {
    if (eventsPerColumn.length == 0) {
      eventsPerColumn.push([event]);
    } else {
      let columnIndex = eventsPerColumn.length;
      for (let i = 0; i < eventsPerColumn.length; i++) {
        let column = eventsPerColumn[i];
        let lastColumnEvent = column[column.length - 1];

        if (event.startMinute >= lastColumnEvent.endMinute) {
          columnIndex = i;
          break;
        }
      }
      if (columnIndex == eventsPerColumn.length) eventsPerColumn.push([event]);
      else eventsPerColumn[columnIndex].push(event);
    }
  });
  return eventsPerColumn;
};

const OverlappingEventsGroup = ({ events }) => {
  const eventsPerColumn = groupEventsPerColumn(events);

  return (
    <div className="event-wrapper">
      {eventsPerColumn.map((columnEvent, index) => (
        <div className="event-column" key={`event-column-${index}`}>
          {columnEvent.map((event, index) => (
            <div
              className="event-block"
              style={{
                top: getEventPositionInWindow(event.startMinute),
                height: getEventHeight(event.duration),
                backgroundColor: getEventColor(event.id),
              }}
              key={`event-block-${index}`}
            >
              {event.id}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OverlappingEventsGroup;
