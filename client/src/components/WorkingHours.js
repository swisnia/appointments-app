import React, { useState, useEffect} from 'react'
import {EditHours} from '../components'
import { useAppContext } from '../context/appContext'


const WorkingHours = ({currentWorker}) => {
  const [workingHours, setWorkingHours] = useState()
  const {updateWorkerWorkingHours} = useAppContext()

  const handleChange = (e) => {
    const newHours = workingHours.map((obj) => {          
      if(e.target.id === obj._id){
          if(e.target.name === 'checked') {
              return  {...obj, [e.target.name]: !obj.checked}
          }
          return  {...obj, [e.target.name]: e.target.value}
      }
      return obj
    })       
    setWorkingHours(newHours)
  }
  const saveNewHours = () => {
    updateWorkerWorkingHours(workingHours, currentWorker._id)
  }
  useEffect(() => {
    setWorkingHours(
      currentWorker.workingHours
    )
  },[currentWorker])

  return (
  <>
    <div className='working-hours-container'>
      <h6>GODZINY PRACY {currentWorker && currentWorker.workerName.toUpperCase()}</h6>
      {workingHours && workingHours.map(e => {
          return (
            <div className='weekday-container' key={e._id}>
              <EditHours 
                _id={e._id}
                name={e.name}
                checked={e.checked}
                open={e.open}
                close={e.close}
                handleChange={handleChange}
              />
            </div>
          )
        })}
    </div> 
    <div className='btn-container'>
      <button
        type='button'
        className='btn btn-block'
        onClick={saveNewHours}
      >
        Zapisz zmiany
      </button>
      <button
        type='button'
        className='btn btn-ghost' 
      >
        Anuluj
      </button>
    </div>
  </>
  )
} 

export default WorkingHours