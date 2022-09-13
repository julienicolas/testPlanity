import moment from "moment";

export const getEventPosition = (startMinute) => {
  const windowHeight = window.innerHeight - 2;
  return startMinute * windowHeight / 720;

}

export const getEventHeight = (duration) => {
  const windowHeight = window.innerHeight - 2;

  return (duration * windowHeight / 720);
}


export const areEventsOverlapping = (eventA, eventB) => {
  console.log('COUCOU areEventsOverlapping', eventA, eventB)
  return ((eventB.startMinute >= eventA.startMinute && eventB.startMinute < eventA.endMinute ) 
  || (eventB.endMinute > eventA.startMinute && eventB.endMinute <= eventA.endMinute))
}


export const getEventColor = (eventId) => `rgb(151, ${215 + eventId*(Math.random(0, 100) * 10) }, ${200 + eventId*(Math.random(0, 100) * 10) })`


export const verifyEvents = (events) => {
  let errors = []
  events.forEach(event => {
    if (event.startMinute < 0 || event.startMinute > 1260)
      errors.push(event.id);
  })
  return errors;
}
