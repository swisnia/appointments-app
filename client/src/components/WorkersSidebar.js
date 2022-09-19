import React from 'react'
import {WorkerAvatar} from '../components'


const WorkersSidebar = ({workers, setWorker, showAddWorker}) => {
  return (
    <div className='workers-sidebar-big'> 
        <h5>Lista pracowników</h5>
        {workers.map((worker) => {
            return(
                <div
                    key={worker._id}
                    id={worker._id}
                    onClick={setWorker}
                >
                    <WorkerAvatar                        
                        name={worker.workerName}
                        position={worker.workerPosition}
                        photo={worker.workerPhoto}
                    />
                </div>
            )
        })}
        <button
            type='button'
            className='btn btn-ghost'
            onClick={showAddWorker}
        >
            Dodaj pracownika
        </button>
    </div>
  )
}

export default WorkersSidebar