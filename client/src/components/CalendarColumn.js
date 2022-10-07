import React, { useState,  useEffect} from 'react'
import {BsTrash} from 'react-icons/bs'

const CalendarColumn = (
  { rows, 
    appointments,
    workerId, 
    open, 
    close, 
    date, 
    removeAppointment, 
    workerStart, 
    workerFinish,
    calendarSidebarHeight,
    isWorking }) => {

  const [workersAppointments, setWorkersAppointments] = useState()
  const [emptyArea, setEmptyArea] = useState()

  const getOneMinuteHeight = () => {
    const calendarSidebar = document.getElementById('calendar-sidebar').offsetHeight
    const openingTime = rows.length * 30//counting time showed in sidebar 
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
    const top = (appointment.hour - open + (open % 30) + 30) * oneMinuteHeight
    return {...appointment , height: height, top: top}
  }
  const changeTimeFormat = (t) => {
    return `${parseInt(t/60)}:${('00' + t%60).slice(-2)}`
  }
  const setEmptyAreaAttributes = (oneMinuteHeight) => {
    const calendarSidebar = document.getElementById('calendar-sidebar').offsetHeight
    if(!isWorking){
      const beforeOpen = {top: 0, height: calendarSidebar}
      const afterClose = {top: 0, height: 0}

      return [beforeOpen, afterClose]
    }
    const beforeOpenHeight = (workerStart - open + (open % 30) + 30) * oneMinuteHeight
    const afterCloseTop = (workerFinish - open + (open % 30) + 30) * oneMinuteHeight
    const afterCloseHeight = calendarSidebar - afterCloseTop

    const beforeOpen = {top: 0, height: beforeOpenHeight}
    const afterClose = {top: afterCloseTop, height: afterCloseHeight}

    return [beforeOpen, afterClose]
  }

  useEffect(() => {
    const oneMinuteHeight = getOneMinuteHeight()
    setEmptyArea(setEmptyAreaAttributes(oneMinuteHeight))
    if(appointments){
      const convertedAppointments = filteredAppointments().map(e => {
        return setAppointmentAttributes(e, oneMinuteHeight)
      })
      setWorkersAppointments(convertedAppointments)
    }
    // eslint-disable-next-line
  }, [appointments, open, close, workerId, date])
  return (
    <div className='calendar-column'>
        {rows && rows.map((e, index) => {
            return(
                <div className='calendar-row' key={index}> 
                </div>
            )
        })}
        {emptyArea && emptyArea.map((e, index) => {
          return(
            <div 
              className='empty-area'
              key={index}
              style={{
                height: `${e.height}px`,
                top: `${e.top}px`
              }}
            >
            </div>
          )
        })}
        {workersAppointments && workersAppointments.map(e => {
          return (
          <div 
            className='appointment-container' 
            key={e._id}
            id={e._id}
            style={{
              height: `${e.height}px`,
              top: `${e.top}px`
            }}>
              <div>
                <h6 className='service-name'>{e.serviceName}</h6>
                <small>
                  {changeTimeFormat(e.hour)}-
                  {changeTimeFormat(e.hour+e.time)}
                </small>
              </div>
              <BsTrash 
                className='delete-appointment-btn'
                onClick={removeAppointment}
              />              
            </div>
          )
        })}
    </div>
  )
}

export default CalendarColumn