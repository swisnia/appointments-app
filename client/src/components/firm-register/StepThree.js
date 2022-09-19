import React, {useState} from 'react'
import { FormRow } from '../../components'
const initialState = {
  workerName: '',
  workerEmail: '',
  workerPhone: '',
  workerPosition: '',
  addWorkerWindow: false
}
const StepThree = ({addWorker, workers}) => {
  const [values, setValues] = useState(initialState)

  const toggleWindow = () => {
    setValues({...values, addWorkerWindow: !values.addWorkerWindow})
  }
  const  handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})        
  }
  const newWorker = () => {
    const worker = {
      workerName: values.workerName,
      workerEmail: values.workerEmail,
      workerPhone: values.workerPhone,
      workerPosition: values.workerPosition
    }
    addWorker(worker)
    //clearValues()
  }
  const clearValues = () => {
    setValues(initialState)
  }
  const editWorkers = () => {
    console.log('edit workers');
  }
  return (
    <div>
      <h4>Dodaj pracowników</h4>
      <header className='workers-header'>
        <h5>nazwa</h5>
        <h5>stanowisko</h5>
      </header>
        {workers && workers.map((worker, index) => {
          return (
            <div key={index} className='worker-container'>
              <h5>{worker.workerName}</h5>
              <h5>{worker.workerPosition}</h5>
            </div>
          )
        })} 
        {workers.length === 0 && <h5 className='info-txt'>Nie dodano żadnych pracowników</h5>}

      {values.addWorkerWindow && 
        <div className='add-worker-container'>
          <FormRow 
            type='text'
            name='workerName'
            labelText='Imię i nazwisko'
            value={values.workerName}
            handleChange={handleChange}               
          />
          <FormRow 
            type='text'
            name='workerPosition'
            labelText='Stanowisko'
            value={values.workerPosition}
            handleChange={handleChange}               
          />
          <FormRow 
            type='email'
            name='workerEmail'
            labelText='Adres email'
            value={values.workerEmail}
            handleChange={handleChange}               
          />
          <FormRow 
            type='tel'
            name='workerPhone'
            labelText='Telefon'
            value={values.workerPhone}
            handleChange={handleChange}               
          />
        </div>
      }
      <div className='btn-container'>
      <button 
        type='button'
        className='btn btn-ghost'
        onClick={values.addWorkerWindow ? toggleWindow && clearValues : editWorkers} 
      >
        {values.addWorkerWindow ? 'anuluj' : 'edytuj listę'}
      </button>
      <button 
        type='button' 
        className='btn btn-hero'
        onClick={values.addWorkerWindow ? newWorker : toggleWindow} 
      >
        dodaj pracownika
      </button>
      </div>
    </div> 
  )
} 

export default StepThree