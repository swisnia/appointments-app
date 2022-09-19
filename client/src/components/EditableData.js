import React from 'react'

const EditableData = ({type, name, value, handleChange, labelText, disabled}) => {
  return (
    <div className='form-row'>
        <small>{labelText || name}</small> 
        <input
            type={type}
            value={value || ''}
            name={name}
            onChange={handleChange}
            className='form-input'
            disabled={disabled}
        />                
    </div>
  )
}

export default EditableData