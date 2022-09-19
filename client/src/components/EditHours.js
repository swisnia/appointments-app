import React from 'react'

const EditHours = ({_id, name, checked, open, close, handleChange}) => {
   
  return (
    <div className='day-container'>
        <div className='row'>
            <input
                id={_id}
                type='checkbox'
                name='checked' 
                checked={checked} 
                className='input-checkbox'
                onChange={handleChange}
            />
            <h5>{name}</h5>
        </div>
        <div className='row'>
            <input
                id={_id}
                type='time'
                name='open'
                value={open}
                className='input-time'
                onChange={handleChange}
            />
            <input
                id={_id}
                type='time'
                name='close'
                value={close}
                className='input-time'
                onChange={handleChange}
            />
        </div>
    </div>
  )
}

export default EditHours