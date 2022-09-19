import React, {useState} from 'react'
import Wrapper from '../assets/wrappers/AddService'
import {FormRow} from '../components'
import { useAppContext } from '../context/appContext'

const initialState = {
    serviceName: '',
    serviceTime: '00:30',
    servicePrice: '',
    serviceCategory: '',
    showAddService: false
}

const AddService = ({hideWindow}) => {
    const [values, setValues] = useState(initialState)
    const {addService, displayAlert} = useAppContext()

    const  handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})        
    }
    const onSubmit = () => {
        const {
            serviceName,
            serviceTime,
            servicePrice,
            serviceCategory
        } = values
        if(!serviceName || !serviceTime || !servicePrice){
            displayAlert()
            return
        }
        const newService = {
            serviceName,
            serviceTime,
            servicePrice,
            serviceCategory
        }
        addService(newService)
        clearValues()
    }
    const clearValues = () => {
        setValues(initialState)
        hideWindow()
    }

 
  return (
    <Wrapper>
        <div className='add-service-container'>
            <h4>Dodaj usługę</h4>
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
          <button
            type='button'
            className='btn btn-hero'
            onClick={onSubmit}
          >
            Dodaj usługę
          </button>
          <button
            type='button'
            className='btn btn-ghost'
            onClick={clearValues}
          >
            Anuluj
          </button>
        </div>
    </Wrapper>
  )
}

export default AddService