import React from 'react'
import Wrapper from '../assets/wrappers/SingleService'

const SingleService = ({name, time, price, _id, checked, addToDelete}) => {
  return (
    <Wrapper id={_id}>
        <input 
            type='checkbox'
            className='input-checkbox'
            checked={checked}
            onChange={addToDelete}
        /> 
        <h5>{name}</h5> 
        <h5 className='center'>{time}</h5>
        <h5 className='center'>{price}</h5>
    </Wrapper>
  )
}

export default SingleService