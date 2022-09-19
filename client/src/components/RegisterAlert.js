import React from 'react'

const RegisterAlert = ({alertType, alertText}) => {
  return (
    <div className={`alert alert-${alertType}`}>{alertText}</div>   
  )
}

export default RegisterAlert