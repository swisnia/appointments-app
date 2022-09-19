import React, {useState} from 'react'
import Wrapper from '../assets/wrappers/AddService'
import {FormRow} from '../components'
import { useAppContext } from '../context/appContext'

const initialState = {
    workerName: '',
    workerEmail: '',
    workerPhone: '',
    workerPosition: '',
    workingHours: [], 
}

const AddWorker = ({hideWindow, openingHours}) => {
    const [values, setValues] = useState(initialState)
    const {displayAlert, addWorker} = useAppContext()

    const  handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})        
    }
    const onSubmit = () => {
        const {
            workerName,
            workerEmail,
            workerPhone,
            workerPosition
        } = values
        if(!workerName || !workerEmail || !workerPhone){//TODO check email
            displayAlert()
            return
        }
        const newWorker = {
            workerName,
            workerEmail,
            workerPhone,
            workerPosition,
            workingHours: openingHours
        }
        addWorker(newWorker)
        clearValues()
    }
    const clearValues = () => {
        setValues(initialState)
        hideWindow()
    }

  return (
    <Wrapper>
        <div className='add-service-container'>
            <h4>Dodaj pracownika</h4>
            <FormRow 
                type='text'
                name='workerName'
                labelText='Imię i nazwisko'
                value={values.workerName}
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
                labelText='Numer telefonu'
                value={values.workerPhone}
                handleChange={handleChange}               
            />
            <FormRow 
                type='text'
                name='workerPosition'
                labelText='Stanowisko'
                value={values.workerPosition}
                handleChange={handleChange}               
            />
            <button
                type='button'
                className='btn btn-hero'
                onClick={onSubmit}
            >
                Dodaj pracownika
            </button>
            <button
                type='button'
                className='btn btn-ghost'
                onClick={hideWindow}
            >
                Anuluj
            </button>
        </div>
    </Wrapper>
  )
}

export default AddWorker