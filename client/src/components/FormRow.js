import React from 'react'

const FormRow = ({type, name, value, handleChange, labelText}) => { 
  return (
    <div className='form-row'>
        {/*<label htmlFor={name} className='form-lebel'>{labelText || name}</label>*/}
        <input
            type={type}
            value={value}
            placeholder={labelText || name}
            name={name}
            onChange={handleChange}
            className='form-input' 
        />                
    </div>
  )
}

export default FormRow