import React from 'react'
import { EditHours } from '../../components'
const StepTwo = ({openingHours, changeValue}) => {
  return (
    <div> 
      <h4>Dodaj godziny otwarcia</h4>
      {openingHours.map((e) => {
        return <EditHours key={e._id} {...e} handleChange={changeValue}/>
      })}
    </div>
  ) 
}

export default StepTwo