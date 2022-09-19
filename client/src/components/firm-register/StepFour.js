import React, {useState} from 'react'
import { FormRow } from '../../components'

const initialState = {
  serviceName: '',
  serviceTime: '00:30',
  servicePrice: '',
  serviceCategory: '',
  addServiceWindow: false
}

const StepFour = ({services, addService}) => {
  const [values, setValues] = useState(initialState)

  const toggleWindow = () => {
    setValues({...values, addServiceWindow: !values.addServiceWindow})
  }
  const  handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})        
  }
  const newService = () => {
    const service = {
      serviceName: values.serviceName,
      serviceTime: values.serviceTime,
      servicePrice: values.servicePrice,
      serviceCategory: values.serviceCategory
    }
    addService(service)
    //clearValues()
  }
  const clearValues = () => {
    setValues(initialState)
  }
  return (
    <div>
      <h4>Dodaj usługi</h4>
      <header className='services-header'>
        <h5>nazwa usługi</h5>
        <h5>kategoria</h5>
        <h5>czas</h5>
        <h5>cena</h5>
      </header>
      {services && services.map((service, index) => {
          return (
            <div key={index} className='service-container'>
              <h5>{service.serviceName}</h5>
              <h5>{service.serviceCategory}</h5>
              <h5>{service.serviceTime}</h5>
              <h5>{service.servicePrice}zł</h5>
            </div>
          )
        })}
      {services.length === 0 && <h5 className='info-txt'>Nie dodano żadnych usług</h5>}
      {values.addServiceWindow && 
        <div className='add-worker-container'>
          <FormRow 
            type='text'
            name='serviceName'
            labelText='Nazwa usługi'
            value={values.serviceName}
            handleChange={handleChange}               
          />
          <input
            type='time'
            name='serviceTime' 
            value={values.serviceTime}
            className='input-time no-margin'
            onChange={handleChange}
          />
          <FormRow 
            type='text'
            name='serviceCategory'
            labelText='Kategoria usługi'
            value={values.serviceCategory}
            handleChange={handleChange}               
          />
          <FormRow 
            type='number'
            name='servicePrice'
            labelText='Cena'
            value={values.servicePrice}
            handleChange={handleChange}               
          />
        </div>
      }
      <div className='btn-container'>
      <button 
        type='button'
        className='btn btn-ghost'
        onClick={values.addServiceWindow ? toggleWindow && clearValues : undefined} 
      >
        {values.addServiceWindow ? 'anuluj' : 'edytuj listę'}
      </button>
      <button 
        type='button' 
        className='btn btn-hero'
        onClick={values.addServiceWindow ? newService : toggleWindow} 
      >
        dodaj usługę
      </button>
      </div>
    </div>
  )
}

export default StepFour