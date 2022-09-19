import React, { useState} from 'react'
import {EditHours} from '../components'
import { useAppContext } from '../context/appContext'

const SalonHours = ({openingHours}) => {
  const [hours, setHours] = useState(openingHours)
  const {updateSalonOpeningHours} = useAppContext()

  const handleChange = (e) => {
    const newHours = hours.map((obj) => {          
      if(e.target.id === obj._id){
          if(e.target.name === 'checked') {
              return  {...obj, [e.target.name]: !obj.checked}
          }
          return  {...obj, [e.target.name]: e.target.value}
      }
      return obj
    })       
    setHours(newHours)
  }
  const saveNewHours = () => {
    updateSalonOpeningHours(hours)
  }
  return (
    <div className='working-hours-container'>
      {hours && hours.map((e) => {
        return(
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
      <div className='btn-container'>
            <button
                type='button'
                className='btn btn-block'
                onClick={saveNewHours}
            >
                Zapisz
            </button>
            <button
                type='button'
                className='btn btn-ghost'
                onClick={() => {setHours(openingHours)}}
            >
                Anuluj
            </button>
        </div>
    </div>
  )
}

export default SalonHours