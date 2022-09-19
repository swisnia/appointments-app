import React from 'react'

const WorkerSingleService = ({name, _id, checked, handleChange}) => {
  return (
    <div id={_id} className='worker-service'>
        <h6>{name}</h6> 
        <input 
            type='checkbox'
            className='input-checkbox'
            checked={checked}
            onChange={handleChange}
        /> 
    </div>
  )
}

export default WorkerSingleService