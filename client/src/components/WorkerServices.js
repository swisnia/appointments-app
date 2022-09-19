import React, { useState, useEffect } from 'react'
import {WorkerSingleService} from '../components'
import { useAppContext } from '../context/appContext'

const WorkerServices = ({currentWorker, services}) => {
  const [workerServices, setWorkerServices] = useState([])
  const {updateWorkerServices} = useAppContext()
  
  const handleChange = (e) => {
    const id = e.target.parentElement.id

    if(!Array.isArray(workerServices) || workerServices.indexOf(id) === -1){
      setWorkerServices([...workerServices, id])
    }
    else {
      setWorkerServices(workerServices.filter(e => { return e !== id }))  
    }
  }
  const checkIfChecked = (_id) => {
    if(!Array.isArray(workerServices) || workerServices.indexOf(_id) === -1) return false
    else return true
  }
  const setDefaultServices = () => {
    setWorkerServices(currentWorker.worker_services)
  }
  const updateServices = () => {
    updateWorkerServices(currentWorker._id, workerServices)
  }
  const selectAll = (e) => {
    const checked = e.target.checked
    if(checked){
      const allServices = services.map( e => {
        return e._id
      })
      setWorkerServices(allServices)
    }
    else {
      setWorkerServices([])
    }
  }
  useEffect(() => {
    setWorkerServices(
      currentWorker.worker_services
    )
  },[currentWorker])


  return (
    <div className='worker-services-container'>
      <h6>USŁUGI WYKONYWANE PRZEZ {currentWorker && currentWorker.workerName.toUpperCase()}</h6>
      <div className='services-container'>
        <header>
          <WorkerSingleService 
            name='Nazwa usługi'
            handleChange={selectAll}
          />
        </header>
        {services && services.map((service) => {
          const checked = checkIfChecked(service._id)
          return (
            <WorkerSingleService
              key={service._id} 
              _id={service._id}
              name={service.serviceName}
              checked={checked}
              handleChange={handleChange}
            />
          )
        })}
      </div>
      <div className='btn-container'>
        <button
          type='button'
          className='btn btn-block'
          onClick={updateServices}
        >
          Zapisz zmiany
        </button>
        <button
          type='button'
          className='btn btn-ghost'
          onClick={setDefaultServices}
        >
          Anuluj
        </button>
      </div>
    </div>
  )
}

export default WorkerServices