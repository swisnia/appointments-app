import React, { useState,  useEffect} from 'react'

const CalendarColumn = ({rows, appointments, workerId, open, close, date}) => {
  const [workersAppointments, setWorkersAppointments] = useState()

  const getOneMinuteHeight = () => {
    const calendarSidebar = document.getElementById('calendar-sidebar').offsetHeight-50 //-height of cell with hour
    const openingTime = close - open
    return calendarSidebar/openingTime
  }
  const filteredAppointments = () => {
    const filtered = appointments.filter(e => { 
      return e.worker === workerId && e.date === date
    })
    return filtered
  }
  const setAppointmentAttributes = (appointment, oneMinuteHeight) => {
    const height = appointment.time * oneMinuteHeight
    const top = (appointment.hour - open) * oneMinuteHeight
    return {...appointment , height: height, top: top}
  }
  const changeTimeFormat = (t) => {
    return `${parseInt(t/60)}:${('00' + t%60).slice(-2)}`
  }
  useEffect(() => {
    const oneMinuteHeight = getOneMinuteHeight()
    if(appointments){
      const convertedAppointments = filteredAppointments().map(e => {
        return setAppointmentAttributes(e, oneMinuteHeight)
      })
      setWorkersAppointments(convertedAppointments)
    }

  }, [appointments, open, close, workerId, date])
  return (
    <div className='calendar-column'>
        {rows && rows.map((e, index) => {
            return(
                <div className='calendar-row' key={index}> 
                </div>
            )
        })}
        {workersAppointments && workersAppointments.map(e => {
          return (
          <div 
            className='appointment-container' 
            key={e._id}
            style={{
              height: `${e.height}px`,
              top: `${e.top}px`
            }}>
                <h6 className='service-name'>{e.serviceName}</h6>
                <small>
                  {changeTimeFormat(e.hour)}-
                  {changeTimeFormat(e.hour+e.time)}
                </small>
          </div>
          )
        })}
    </div>
  )
}

export default CalendarColumn