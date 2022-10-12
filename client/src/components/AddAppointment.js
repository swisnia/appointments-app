import React from 'react'
import { useState } from 'react'
import Wrapper from '../assets/wrappers/AddAppointment'
import {EditableData} from '../components'
import { useAppContext } from '../context/appContext'
import moment from 'moment'
import { useEffect } from 'react'

const initialState = {
    customerName: '',
    worker: 'anyworker',
    serviceName:  '',
    date: moment().format('YYYY-MM-DD') || '2022-01-01', 
    appointmentHour: '', 
    freeHours: []
}
const AddAppointment = ({services, workers, appointments, handleShowWindow, getOpeningHours}) => {
    const [values, setValues] = useState({
        ...initialState, 
        //worker: workers.length > 0 ? workers[0]._id : '', 
        service: services.length > 0 ? services[0]._id : '',
        serviceName: services.length > 0 ? services[0].serviceName : ''
    })
    const {addNewAppointment} = useAppContext()

    const checkFreeHours = () => {

        if(!values.date || !values.service || !values.worker || 
            !(moment().isSameOrBefore(values.date, 'day'))){ //check if date is in the future
            setValues({...values, freeHours: []})
            return
        }
        //Get day of a week
        let weekday = new Date(values.date).getDay()
        weekday === 0 ? weekday = 6 : weekday -= 1
        
        //Get time of a service in minutes
        const service = services.filter(e => {
            return e._id === values.service
        })
        let serviceTime = service[0].serviceTime
        serviceTime = parseInt(serviceTime.split(':')[0])*60 + parseInt(serviceTime.split(':')[1])

        //getting worker index
        const workerIndex = workers.findIndex(e => e._id === values.worker)
        //if any worker choosen
        if(workerIndex === -1){
            let freeHours = []
            workers.forEach((workerEl, workerInd) => {
                //filter all appointments by date and worker
                const filteredAppointments = appointments.filter(e => {
                    return e.date === values.date && e.worker === workerEl._id          
                })
                //sorting appointments
                filteredAppointments.sort((a,b) => {return a.hour - b.hour})
                const workerFreeHours = getFreeHours(filteredAppointments, workers, workerInd, weekday, serviceTime)

                const filteredWorkerkFreehours = workerFreeHours.filter(e => {
                    return freeHours.indexOf(e) === -1
                })
                freeHours = [...freeHours, ...filteredWorkerkFreehours]
            })
            freeHours.sort((a,b) => {return a - b})
            setValues({...values, freeHours: freeHours, time: serviceTime})
            return
        }
        
        //filter all appointments by date and worker
        const filteredAppointments = appointments.filter(e => {
            return e.date === values.date && e.worker === values.worker          
        })
        //sorting appointments
        filteredAppointments.sort((a,b) => {return a.hour - b.hour})
        
        const freeHours = getFreeHours(filteredAppointments, workers, workerIndex, weekday, serviceTime)

        // const [open, close, checked] = getOpeningHours(workers[workerIndex].workingHours, weekday)
        // let t = open
        // //checking if salon i open
        // if(!checked){
        //     setValues({...values, freeHours: freeHours})
        //     return
        // }
        // if(moment().isSame(values.date, 'day')){
        //     let now = moment().format('HH:mm')
        //     now = parseInt(now.split(':')[0])*60 + parseInt(now.split(':')[1])
        //     //checking if time is before closing
        //     if(now < close) {
        //         //setting counter for now
        //         t = now
        //         //filter appointments after now
        //         filteredAppointments = filteredAppointments.filter(e => {
        //             return e.hour >= t
        //         })
        //     } else {
        //         setValues({...values, freeHours: freeHours})
        //         return
        //     }
                
        // }
        // if(filteredAppointments.length > 0){
        //     filteredAppointments.forEach((e) =>{ 
        //         //getting all free hours between all appointments
        //         while(t <= close - serviceTime && t <= e.hour-serviceTime){
    
        //             if(!freeHours.includes(t)) freeHours.push(t)
        //             t += 15 //increase counter
        //         }
        //         t = e.hour + e.time //set timer for end of appointment
        //     })
        //     //getting free hours after last appointment
        //     while(t <= close - serviceTime ){
        //         if(!freeHours.includes(t)) freeHours.push(t)
        //         t += 15
        //     }
        // } else {
        //     while(t <= close - serviceTime ){

        //         if(!freeHours.includes(t)) freeHours.push(t)
        //         t += 15
        //     }
        // }

        setValues({...values, freeHours: freeHours, time: serviceTime})
    }
    const getFreeHours = (filteredAppointments, workers, workerIndex, weekday, serviceTime) => {
        let freeHours = []

        const [open, close, checked] = getOpeningHours(workers[workerIndex].workingHours, weekday)
        let t = open
        //checking if salon i open
        if(!checked) return freeHours        
        if(moment().isSame(values.date, 'day')){
            let now = moment().format('HH:mm')
            now = parseInt(now.split(':')[0])*60 + parseInt(now.split(':')[1])
            //checking if time is before closing
            if(now < close) {
                //setting counter for now
                t = now
                //filter appointments after now
                filteredAppointments = filteredAppointments.filter(e => {
                    return e.hour >= t
                })
            } else {
                return freeHours
            }               
        }
        if(filteredAppointments.length > 0){
            filteredAppointments.forEach((e) =>{ 
                //getting all free hours between all appointments
                while(t <= close - serviceTime && t <= e.hour-serviceTime){
    
                    if(!freeHours.includes(t)) freeHours.push(t)
                    t += 15 //increase counter
                }
                t = e.hour + e.time //set timer for end of appointment
            })
            //getting free hours after last appointment
            while(t <= close - serviceTime ){
                if(!freeHours.includes(t)) freeHours.push(t)
                t += 15
            }
        } else {
            while(t <= close - serviceTime ){

                if(!freeHours.includes(t)) freeHours.push(t)
                t += 15
            }
        }

        return freeHours
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleService = (e) => {
        setValues({...values, [e.target.name]: e.target.value, serviceName: e.target.selectedOptions[0].text})

    }
    const setAppointmentHour = (e) => {
        setValues({...values, appointmentHour: e.target.id})
    }
    const addAppointment = () => {
        const newAppointment = {
            date: values.date,
            time: values.time,
            hour: parseInt(values.appointmentHour),
            service: values.service,
            serviceName: values.serviceName,
            worker: values.worker,
            customerName: values.customerName
        }
        addNewAppointment(newAppointment)
        handleShowWindow()
    }
    useEffect(() => {
        checkFreeHours()  
        // eslint-disable-next-line      
    }, [values.date, values.service, values.worker])
    
  return (
    <Wrapper>
        <div className='add-service-container'>
        <h4>Dodaj wizytę</h4>
            <EditableData 
                type='text'
                name='customerName'
                labelText='Nazwisko klienta'
                handleChange={handleChange}
                value={values.customerName}           
            />
            <small>Pracownik</small>
            <select className='select input' name='worker' onChange={handleChange}>
                <option
                    id='anyWorker'
                    value='anyWorker'
                >
                    Dowolny
                </option>
                {workers && workers.map( e => {
                    return (
                        <option key={e._id} id={e._id} value={e._id}>
                            {e.workerName}
                        </option>   
                    )
                })}
            </select>
            <small>Usługa</small>
            <select 
                className='select input'  
                name='service' 
                onChange={handleService}
            >
                {services && services.map( e => {
                    return (
                        <option 
                            key={e._id} 
                            value={e._id}
                        >
                            {e.serviceName}
                        </option>   
                    )
                })}

            </select>
            <small>Data</small>
            <input
                type='date'
                name='date'
                className='select input'
                value={values.date} //set today
                min='2022-01-01' //set today
                max="2050-12-31"
                onChange={handleChange}
            >
            </input>
            <small>Godzina</small>
            <div className='free-hours-container'>
                {values.freeHours.length === 0 && 
                    <h6>Brak wolnych godzin w tym terminie</h6>}
                {values.freeHours && values.freeHours.map((e, index) => {
                    return(
                        <h6 
                            key={index}
                            onClick={setAppointmentHour}
                            id={e}
                            className={e === parseInt(values.appointmentHour) ? 'hour hour-checked' : 'hour'}
                        >
                            {`${parseInt(e/60)}:${('00' + e%60).slice(-2)}`}
                        </h6>
                    )
                })}

            </div>
            <button
                type='button'
                className='btn btn-hero'
                onClick={addAppointment}
            >
                Dodaj wizytę
            </button>
            <button
                type='button'
                className='btn btn-ghost'
                onClick={handleShowWindow}
            >
                Anuluj
            </button>
        </div>
    </Wrapper>
  )
}

export default AddAppointment