import React, {useState} from 'react'
import { useEffect } from 'react'
import {AiOutlineUser} from 'react-icons/ai'
import {EditableData} from '../components'
import { useAppContext } from '../context/appContext'

const initialState = {
    disabled: true,
    workerName: '',
    workerEmail: '',
    workerPhone: '',
    workerPosition: '',
    workerPhoto: '',
    workerAbout: ''
}

const WorkerData = ({currentWorker}) => {
    const [values, setValues] = useState(initialState)
    const {updateWorkerData, reduceImageFileSize} = useAppContext()

    const toggleEdition = () => {
        setValues({
            ...values, 
            disabled: !values.disabled,
            workerName: currentWorker.workerName,
            workerEmail: currentWorker.workerEmail,
            workerPhone: currentWorker.workerPhone,
            workerPosition: currentWorker.workerPosition,
            workerPhoto: currentWorker.workerPhoto,
            workerAbout: currentWorker.workerAbout
        })
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleImage = (e) => {
        const reader = new FileReader()
        reader.onload = async () => {
            const img = reader.result
            const resizedImg = await reduceImageFileSize(img)
            setValues({...values, workerPhoto: resizedImg})
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        e.target.value = null
    }
    const updateWorker = () => {
        const editedWorker = {
            _id: currentWorker._id,
            workerName: values.workerName,
            workerEmail: values.workerEmail,
            workerPhone: values.workerPhone,
            workerPosition: values.workerPosition,
            workerAbout: values.workerAbout,
            workerPhoto: values.workerPhoto
        }
        updateWorkerData(editedWorker)
    }
    useEffect((values) => {
        setValues({
            ...values,
            disabled: true,
            workerName: currentWorker.workerName,
            workerEmail: currentWorker.workerEmail,
            workerPhone: currentWorker.workerPhone,
            workerPosition: currentWorker.workerPosition,
            workerPhoto: currentWorker.workerPhoto,
            workerAbout: currentWorker.workerAbout
        })
    },[currentWorker])

    return (
    <div>
        <div className='photo-and-about-container'>
            <div className='photo-container'>
                {values.workerPhoto && 
                    <img
                        src={values.workerPhoto}
                        alt=''
                        className='worker-photo'
                    />
                }
                {!values.workerPhoto && 
                    <AiOutlineUser className='worker-photo'/>
                }
                {!values.disabled &&<label 
                    htmlFor='addWorkerPhoto' 
                    className='btn btn-hero'
                    disabled={values.disabled}
                >
                    Zmień
                </label>}
                <input
                    id='addWorkerPhoto'
                    type='file'
                    name='workerPhoto'
                    accept='image/*'
                    disabled={values.disabled}
                    onChange={handleImage}
                />               
                {!values.disabled && <button
                    type='button'
                    name='workerPhoto'
                    value=''
                    className='btn btn-ghost'
                    disabled={values.disabled}
                    onClick={handleChange}
                >
                    Usuń
                </button>}
            </div>
            <div className='about-container'>
                <textarea
                    name='workerAbout'
                    disabled={values.disabled}
                    value={values.workerAbout} 
                    onChange={handleChange}  
                >
                </textarea>
            </div>
        </div>

        <h6>PODSTAWOWE INFORMACJE</h6>
        <div className='worker-data-container'>
            <EditableData 
                type='text'
                name='workerName'
                labelText='Imię i nazwisko'
                value={values.workerName}
                disabled={values.disabled}
                handleChange={handleChange}
            />
            <EditableData 
                type='email'
                name='workerEmail'
                labelText='Adres email'
                value={values.workerEmail}
                disabled={values.disabled}
                handleChange={handleChange}

            />
            <EditableData 
                type='text'
                name='workerPosition'
                labelText='Stanowisko'
                value={values.workerPosition}
                disabled={values.disabled}
                handleChange={handleChange}

            />
            <EditableData 
                type='tel'
                name='workerPhone'
                labelText='Telefon'
                value={values.workerPhone}
                disabled={values.disabled}
                handleChange={handleChange}

            />
        </div>
        <div className='btn-container'>
            <button
                type='button'
                className='btn btn-block'
                onClick={updateWorker}
                disabled={values.disabled}
            >
                Zapisz zmiany
            </button>
            <button
                type='button'
                className='btn btn-ghost'
                onClick={toggleEdition}
            >
                {values.disabled ? 'Edytuj' : 'Anuluj'}
            </button>
        </div>
    </div>
  )
}

export default WorkerData