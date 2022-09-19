import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import EditableData from './EditableData'

const initialState = {
    companyName: '',
    businessOwner: '',
    about: '',
    street: '',
    number: '',
    postalCode: '',
    city: '',
    disabled: true
}

const SalonData = ({firm}) => {
    const [values, setValues] = useState(initialState)
    const {updateSalonData} = useAppContext()

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})     
    }
    const handleEdit = () => {
        if(values.disabled) setValues({...values, disabled: !values.disabled})
        else setValues(initialState)
    }
    const saveData = () => {
        const newData = {
            companyName: values.companyName,
            businessOwner: values.businessOwner, 
            about: values.about, 
            street: values.street, 
            number: values.number, 
            postalCode: values.postalCode, 
            city: values.city
        }
        updateSalonData(newData)
    }
    useEffect((values) => {
        setValues({
            ...values,
            companyName: firm.companyName,
            businessOwner: firm.businessOwner,
            about: firm.about,
            street: firm.adress.split(",")[0],
            number: firm.adress.split(",")[1],
            postalCode: firm.adress.split(",")[2],
            city: firm.adress.split(",")[3],
        })
    }, [firm])

  return (
    <div className='salon-data-container'>
        <h6>Informacje ogólne</h6>
        <EditableData 
            type='text'
            name='companyName'
            labelText='Nazwa salonu'
            value={values.companyName} 
            handleChange={handleChange}
            disabled={values.disabled}
        />
        <EditableData 
            type='text'
            name='businessOwner'
            labelText='Właściciel'
            value={values.businessOwner} 
            handleChange={handleChange}
            disabled={values.disabled}
        />
        <small>O nas</small>        
        <textarea
            name='about'
            className='form-input salon-about'
                /*disabled={values.disabled}*/
            value={values.about || firm.about} 
            onChange={handleChange}
            disabled={values.disabled}
        />
        <h6>Adres</h6>
        <div className='street-and-number'>
            <EditableData 
                type='text'
                name='street'
                labelText='Ulica'
                value={values.street} 
                handleChange={handleChange}
                disabled={values.disabled}
            />
            <EditableData 
                type='text'
                name='number'
                labelText='Numer'
                value={values.number} 
                handleChange={handleChange}
                disabled={values.disabled}
            />
        </div>
        <div className='code-and-city'>
            <EditableData 
                type='text'
                name='postalCode'
                labelText='Kod pocztowy'
                value={values.postalCode} 
                handleChange={handleChange}
                disabled={values.disabled}
            />
            <EditableData 
                type='text'
                name='city'
                labelText='Miasto'
                value={values.city} 
                handleChange={handleChange}
                disabled={values.disabled}
            />
        </div>
        <div className='btn-container'>
            <button
                type='button'
                className='btn btn-block'
                onClick={saveData}
                disabled={values.disabled}
            >
                Zapisz
            </button>
            <button
                type='button'
                className='btn btn-ghost'
                onClick={handleEdit}
            >
                {values.disabled ? 'Edytuj' : 'Anuluj'}
            </button>
        </div>

    </div>
  )
}

export default SalonData