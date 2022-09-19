import React from 'react'
import Wrapper from '../assets/wrappers/WorkerAvatar'
import {FaRegUserCircle} from 'react-icons/fa'

const WorkerAvatar = ({name, position, photo}) => {

  return (
    <Wrapper>
        {photo && 
            <img 
                src={photo}
                alt=''
                className='avatar-img'
            />
        }
        {!photo &&
        <FaRegUserCircle 
            className='avatar-img'
        />
        }
        <div className='avatar-info'>
            <h6>{name}</h6>
            <small>({position})</small>
        </div>
    </Wrapper>
  )
}

export default WorkerAvatar