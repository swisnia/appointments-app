import React from 'react'

const Loading = ({center}) => {
  return (
    <div className='loading-container'>
      <div className={center ? 'loading loading-center' : 'loading'}></div>
    </div>
  )
}
 
export default Loading