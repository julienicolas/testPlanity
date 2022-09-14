const DAY_DURATION_IN_MINUTES = 720;

export const getEventPositionInWindow = (startMinute) => {
  const windowHeight = window.innerHeight - 2;
  return startMinute * windowHeight / DAY_DURATION_IN_MINUTES;
}

export const getEventHeight = (duration) => {
  const windowHeight = window.innerHeight - 2;
  return (duration * windowHeight / DAY_DURATION_IN_MINUTES);
}

export const areEventsOverlapping = (eventA, eventB) => {
  return ((eventB.startMinute >= eventA.startMinute && eventB.startMinute < eventA.endMinute ) 
  || (eventB.endMinute > eventA.startMinute && eventB.endMinute <= eventA.endMinute))
}

//generate a random blue color
export const getEventColor = (eventId) => `rgb(151, ${215 + eventId*(Math.random(0, 100) * 10) }, ${200 + eventId*(Math.random(0, 100) * 10) })`

export const verifyEventsIntegrity = (events) => {
  let errors = []
  events.forEach(event => {
    if (event.startMinute < 0 || event.startMinute >= DAY_DURATION_IN_MINUTES)
      errors.push(event.id);
  })
  return errors;
}

export const getInScheduleEvents = (events) => {
  return events.filter(event => event.startMinute >= 0 && event.endMinute <= DAY_DURATION_IN_MINUTES)
}
