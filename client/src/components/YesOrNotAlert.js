import React from 'react'
import Wrapper from '../assets/wrappers/YesOrNotAlert'

const YesOrNotAlert = ({alertText, onYes, onNot}) => {
  return (
    <Wrapper>
        <div className='alert-container'>
            <h5 className='alert-txt'>{alertText}</h5>
            <div className='btn-container'>
                <button
                    type='button'
                    className='btn btn-yes'
                    onClick={onYes}
                >
                    Tak
                </button>
                <button
                    type='button'
                    className=' btn btn-no'
                    onClick={onNot}
                >
                    Nie
                </button>
            </div>
        </div>
    </Wrapper>
  )
}

export default YesOrNotAlert