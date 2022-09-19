import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FormRow, Alert, RegisterAlert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import background from '../assets/images/background-firm.png'
import registerImg from '../assets/images/register-firm.png'
import {
    StepOne, 
    StepTwo,
    StepThree,
    StepFour,
    StepFive,
    SideBar
} from '../components/firm-register'

const initialState = {
    companyName: '',
    businessOwner: '',
    phoneNumber: '',
    street: '',
    number: '',
    postalCode: '',
    city: '',
    adress: '',
    location: [3456, 2345],
    workers: [],
    services: [],
    salonImages: [],
    openingHours: [
        {_id: 'monday', name: 'poniedziałek', checked: true, open:"08:00", close: "16:00"},
        {_id: 'tuesday', name: 'wtorek', checked: true, open:"08:00", close: "16:00"},
        {_id: 'wednesday', name: 'środa', checked: true, open:"08:00", close: "16:00"},
        {_id: 'thursday', name: 'czwartek', checked: true, open:"08:00", close: "16:00"},
        {_id: 'friday', name: 'piątek', checked: true, open:"08:00", close: "16:00"},
        {_id: 'saturday', name: 'sobota', checked: false, open:"08:00", close: "16:00"},
        {_id: 'sunday', name: 'niedziela', checked: false, open:"08:00", close: "16:00"},
    ],
    about: '',
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    regAndPrivacyPolicy: true,
    isMember: true,
    page: 1,
    showRegisterAlert: false,
    alertType: '',
    alertText: ''
}

const Register = () => {

    const [values,setValues] = useState(initialState)
    const navigate = useNavigate()
    const {firm, isLoading, showAlert, displayAlert, registerUser, loginUser} = useAppContext()//importuje i destruklturyzuje metody i zmienne z appContext

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember}) 
    }
    const validateForm = () => {
    
        if(values.page ===1){
            if(!values.email || !values.password || !values.repeatPassword){
                showRegisterAlert()
                return false
            }
            else if(values.password !== values.repeatPassword){
                showRegisterAlert('Hasła muszą być takie same')
                return false
            }
            else if(values.password.length < 7){
                showRegisterAlert('Hasła musi zawierać min 7 znaków')
                return false
            }
            // else if(!validateEmail){
            //     showRegisterAlert('Email nieprawidłowy')
            //     return false
            // }
            // else if(emailInUse){
            //     showRegisterAlert('Ten email jest już w uzyciu')
            //     return false
            // }
        }
        if(values.page === 2 && (!values.companyName || !values.businessOwner || !values.phoneNumber || !values.street ||
            !values.number || !values.postalCode || !values.city)){
            showRegisterAlert()
            return false
        }
        if(values.page === 4 && values.workers.length === 0){
            showRegisterAlert('Dodaj co najmniej jednego pracownika')
            return false
        }
        return true
    }
    const nextStep = () => {
        if(values.page < 7 && validateForm()){
            setValues({...values, page: values.page + 1})
        }
    }
    const prevStep = () => {
        if(values.page > 1){
            setValues({...values, page: values.page - 1})
        }
    }
    const  handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})        
    }
    const addWorker = (worker) => {
        if(!worker.workerName || !worker.workerPosition || !worker.workerEmail || !worker.workerPhone){
            showRegisterAlert()
        } else {
            worker.workingHours = values.openingHours
            setValues({...values, workers: [...values.workers, worker ]})
        }
    }
    const addService = (service) => {
        if(!service.serviceName || !service.servicePrice || !service.serviceTime || !service.serviceCategory) {
          showRegisterAlert()
        } else {
            setValues({...values, services: [...values.services, service ]})
        }
    }
    const showRegisterAlert = (txt) => {
        setValues({
            ...values, 
            showRegisterAlert: true,
            alertType: 'danger',
            alertText: txt || 'Wypełnij wymagane pola'
        })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(()=> {
            setValues({
                ...values, 
                showRegisterAlert: false,
                alertType: '',
                alertText: ''
            })
        },3000)
    }
    const addSalonImg = (img) => {
        setValues({...values, salonImages: [...values.salonImages, {img: img} ]})
    }
    const removePicture = (index) => {
        const newImages = values.salonImages
        newImages.splice(index, 1)
        setValues({...values, salonImages: newImages})
    }
    const handleChangeHour = (e) => { 
        const newHours = values.openingHours.map((obj) => {          
            if(e.target.id === obj._id){
                if(e.target.name === 'checked') {
                    return  {...obj, [e.target.name]: !obj.checked}
                }
                return  {...obj, [e.target.name]: e.target.value}
            }
            return obj
        })       
        setValues({...values, openingHours: newHours})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const {
            email,
            password,
            regAndPrivacyPolicy,
            companyName, 
            businessOwner, 
            about,
            phoneNumber,
            street,
            number,
            postalCode,
            city,
            location,
            workers,
            services,
            salonImages,
            openingHours,
            isMember} = values
        if(isMember && (!email || !password) ){
            displayAlert()//metoda z appContext
            return
        }
        const currentCompany = { 
            email,
            password,
            regAndPrivacyPolicy,
            companyName, 
            businessOwner, 
            about,
            phoneNumber,
            adress: `${street}, ${number}, ${postalCode}, ${city}`,
            location,
            workers,
            services,
            salonImages,
            openingHours,
        }
        if(isMember){
            loginUser(currentCompany) 
        }
        else{
            registerUser(currentCompany)//wywołanie metody z appContext i wysłanie "currentCompany"
        }
    }
    useEffect(()=>{
        if(firm){
            setTimeout(() => {
                navigate('/')                      
            }, 3000)                
        }
    } , [firm, navigate])
    
  return ( 
    <Wrapper className='full-page'>
        <img src={background} alt='' className='background'/>
        {values.page === 1 &&
        <div className='form-container'>
            {!values.isMember && values.page === 1 &&
            <div className='info-container'>
                <h3>Zarejestruj swoją firmę</h3>
                <p>Pozwól klientom Cię znaleźć. Prowadzenie firmy jeszcze nigdy nie było tak proste.</p>
                <img src={registerImg} alt='' className='register-img'/>
            </div>}
            
            {values.page === 1 &&
                <form className='form' onSubmit={onSubmit}>
                    <h3>{values.isMember ? 'Logowanie' : 'Zarejestruj swoją firmę za darmo!'}</h3>
                    {showAlert && <Alert />}
                    {values.showRegisterAlert && <RegisterAlert alertType={values.alertType} alertText={values.alertText} />}
                    
                    <FormRow 
                        type='email'
                        name='email'
                        labelText='adres email'
                        value={values.email}
                        handleChange={handleChange}
                    />
                    <FormRow 
                        type='password'
                        name='password'
                        labelText='hasło'
                        value={values.password}
                        handleChange={handleChange}
                    />
                    {!values.isMember && 
                        <FormRow 
                            type='password'
                            name='repeatPassword'
                            labelText='powtórz hasło'
                            value={values.repeatPassword}
                            handleChange={handleChange}
                        />           
                    }
                    <button 
                        type={values.isMember ? 'submit' : 'button'} 
                        className='btn btn-block' 
                        disabled={isLoading}
                        onClick={!values.isMember ? nextStep : undefined}
                    >
                        {values.isMember ? 'zaloguj się' : 'przejdź dalej'}
                    </button>
                    <p>
                        {values.isMember ? 'Nie masz jeszcze konta?' : 'Masz już konto?'}
                        <button type='button' onClick={toggleMember} className='member-btn'>
                            {values.isMember ? 'Zarejestruj się' : 'Zaloguj się'}
                        </button>
                    </p>
                </form>
            }
            </div>}
            {values.page > 1 &&
            <div className='register-container'>
                <SideBar page={values.page}/>
                <form onSubmit={onSubmit} className='inputs-container'> 
                    <div>
                        {showAlert && <Alert />}
                        {values.showRegisterAlert && <RegisterAlert alertType={values.alertType} alertText={values.alertText} />}
                        {values.page === 2 && <StepOne values={values} changeValue={handleChange}/>}
                        {values.page === 3 && <StepTwo openingHours={values.openingHours} changeValue={handleChangeHour}/>} 
                        {values.page === 4 && <StepThree workers={values.workers} addWorker={addWorker}/>} 
                        {values.page === 5 && <StepFour services={values.services} addService={addService}/>} 
                        {values.page === 6 && <StepFive salonImages={values.salonImages } addSalonImg={addSalonImg} removePicture={removePicture}/>} 
                    </div>
                    {values.page >= 2 && 
                        <div className='btn-container'>
                            <button 
                                type='button'
                                className='btn btn-ghost' 
                                onClick={prevStep}
                            >
                                cofnij
                            </button>
                            <button 
                                type={values.page === 7 ? 'submit' : 'button'} 
                                className='btn btn-block' 
                                disabled={isLoading}
                                onClick={nextStep}
                            >
                                {values.page >= 6 ? 'zarejestruj się' : 'przejdź dalej'}
                            </button>
                        </div>
                    }
                </form>
            </div>
            }  
        
            

        
    </Wrapper>
  )
}

export default Register