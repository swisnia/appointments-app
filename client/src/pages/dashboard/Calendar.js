import React,{ useState } from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/Calendar'
import { CalendarSidebar, CalendarColumn, AddAppointment} from '../../components'
import moment from 'moment'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

const initialState = {
  show: false,
  date: moment().format()
}

const Calendar = () => {
  const {firm} = useAppContext()
  const [values, setValues] = useState(initialState)
  
  const getOpeningHours = (weekday) => {
    const openHours = firm.openingHours[weekday].open.split(':')[0]
    const openMinutes = firm.openingHours[weekday].open.split(':')[1]
    const open = parseInt(openHours) * 60 + parseInt(openMinutes)

    const closeHours = firm.openingHours[weekday].close.split(':')[0]
    const closeMinutes = firm.openingHours[weekday].close.split(':')[1]
    const close = parseInt(closeHours) * 60 + parseInt(closeMinutes)

    const checked = firm.openingHours[weekday].checked

    return [open, close, checked]
  }
  const getWeekday = () => {
    let weekday = parseInt(moment(values.date).format('d')) 
    weekday > 0 ? weekday -= 1 : weekday = 6
    return weekday
  }
  const [open, close] = getOpeningHours(getWeekday())

  const getRows = () => {
    let rows = []
    let i = open

    while(i <= close){
        rows.push(`${parseInt(i/60)}:${('0' + (i%60)).slice(-2)}`)
        i += 30
    }
    return rows
  }
  const handleShowWindow = () => {
    setValues({...values, show: !values.show})
  }
  const prevDay = () => {
    const date = moment(values.date).subtract(1, 'days')
    setValues({...values, date: date})
  }
  const nextDay = () => {
    const date = moment(values.date).add(1, 'days')
    setValues({...values, date: date})
  }
  
  return (
    <Wrapper>
      {values.show &&<AddAppointment 
        workers={firm.workers}
        services={firm.services}
        appointments={firm.appointments}
        handleShowWindow={handleShowWindow}
        getOpeningHours={getOpeningHours}
      />}
      <div className='calendar-navibar'>
          <h5 className='distance'>00:00</h5>
          <AiOutlineArrowLeft 
            name='previous'
            onClick={prevDay}
          />
            {moment(values.date).format('dddd, DD.MM.YYYY')}
          <AiOutlineArrowRight 
            name='next'
            onClick={nextDay}
          />
      </div>
      <div className='workers-container'>
        <h5 className='distance'>00:00</h5>
        {firm.workers.map(e => {
          return(
           <h5 key={e._id} className='worker-name-txt'>
              {e.workerName}
            </h5> 
          )
        })}
      </div>
      <div className='timetable-container'>
        <CalendarSidebar 
          rows = {getRows()}
        />
        {firm.workers.map((e) => {
          return(
            <CalendarColumn 
              key={e._id}
              id={e._id}
              appointments={firm.appointments} 
              workerId={e._id}
              open={open}
              close={close}
              date={moment(values.date).format('YYYY-MM-DD')}
              rows={getRows()}
            />
          )
        })}
      </div>
      <button
        type='button'
        className='btn btn-block btn-add-appointment'
        onClick={handleShowWindow}
      >
        + Dodaj wizytę
      </button>
    </Wrapper>
  )
}

export default Calendar