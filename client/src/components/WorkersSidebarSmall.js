import React from 'react'
import {WorkerAvatar} from '../components'

const WorkerSidebarSmall = ({workers, setWorker, showAddWorker}) => {
  return (
    <div className='workers-sidebar-small'>
      {workers.map((worker) => {
        return(
          <div
            key={worker._id}
            id={worker._id}
            onClick={setWorker}
          >
            <WorkerAvatar  
              className='worker-avatar'                      
              name={worker.workerName} 
              position={worker.workerPosition}
              photo={worker.workerPhoto}
            />
          </div>
        )
        })}
          <button
              type='button'
              className='btn btn-ghost btn-add-worker'
              onClick={showAddWorker}
          >
              +
          </button>
    </div>
  )
}

export default WorkerSidebarSmall