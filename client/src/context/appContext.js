import React from "react";
import { useReducer, useContext } from "react";
import { 
    DISPLAY_ALERT,
    CLEAR_ALERT, 
    REGISTER_USER_BEGIN, 
    REGISTER_USER_SUCCESS, 
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    /*UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,*/
    HANDLE_CHANGE,
    /*CLEAR_VALUES,
    CHANGE_PAGE,*/
    //APPOINTMENTS
    ADD_SERVICE_BEGIN,
    ADD_SERVICE_SUCCESS,
    ADD_SERVICE_ERROR,
    DELETE_SERVICE_BEGIN,
    DELETE_SERVICE_SUCCESS,
    ADD_WORKER_BEGIN,
    ADD_WORKER_SUCCESS,
    ADD_WORKER_ERROR,
    UPDATE_WORKER_BEGIN,
    UPDATE_WORKER_SUCCESS,
    UPDATE_WORKER_ERROR,
    UPDATE_WORKER_WORKING_HOURS_BEGIN,
    UPDATE_WORKER_WORKING_HOURS_SUCCESS,
    UPDATE_WORKER_WORKING_HOURS_ERROR,
    UPDATE_SALON_DATA_BEGIN,
    UPDATE_SALON_DATA_SUCCESS,
    UPDATE_SALON_DATA_ERROR,
    UPDATE_SALON_OPENING_HOURS_BEGIN,
    UPDATE_SALON_OPENING_HOURS_SUCCESS,
    UPDATE_SALON_OPENING_HOURS_ERROR,
    UPDATE_SALON_GALLERY_ERROR,
    UPDATE_SALON_GALLERY_BEGIN,
    UPDATE_SALON_GALLERY_SUCCESS,
    DELETE_SALON_IMG_BEGIN,
    DELETE_SALON_IMG_SUCCESS,
    ADD_NEW_APPOINTMENT_BEGIN,
    ADD_NEW_APPOINTMENT_SUCCESS,
    ADD_NEW_APPOINTMENT_ERROR,
    DELETE_APPOINTMENT_BEGIN,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_ERROR
} from "./actions";

import reducer from "./reducers";
import axios from "axios"

const token = localStorage.getItem('token')
const firm = localStorage.getItem('firm')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '', 
    firm: firm ? JSON.parse(firm) : null,
    token: token,
    userLocation: userLocation || '',
    showSidebar: false,
    isEditing: false,
    numOfPages: 1,
    page: 1,
    search: '',
    services: [],
    appointments: [],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)//reducer zwraca state i dispatch

    //axios
    const authFetch = axios.create({
        baseURL: '/api/v1'
    })
    //request
    authFetch.interceptors.request.use(
        (config) => {
        config.headers.common['Authorization'] = `Bearer ${state.token}`
        return config 
    },(error) => {
        return Promise.reject(error) 
    })
    //response
    authFetch.interceptors.response.use((response) => {
        return response
    },(error) => {
        console.log(error.response)
        if(error.response.status === 401){
            logutUser()
        }
        return Promise.reject(error) 
    }) 

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 3000)
    }
    const addUserToLocalStorage = (firm, token, location) => {
        localStorage.setItem('firm', JSON.stringify(firm))
        localStorage.setItem('token', token)    
        localStorage.setItem('location', location)    
    }
    const updateFirmInLocalStortage = (firm) => {
        localStorage.setItem('firm', JSON.stringify(firm))
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('firm')
        localStorage.removeItem('location')
    }


    const registerUser = async (currentUser) => {
        dispatch({type: REGISTER_USER_BEGIN})
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            const {firm, token, location, services, appointments} = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {firm, token, location, services, appointments}
            })
            addUserToLocalStorage(firm, token, location)
        } catch (error) {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const loginUser = async (currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN})
        try {
            const {data} = await axios.post('/api/v1/auth/login', currentUser)
            const {firm, token, location, services, appointments} = data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {firm, token, location, services, appointments}
            })
            addUserToLocalStorage(firm, token, location)
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR})
    }
    const logutUser = () => {
        dispatch({type: LOGOUT_USER})
        removeUserFromLocalStorage()
    }
    const handleChange = ({name, value}) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {name, value}
        })
    }
    /*APPOINTMENTS*/
    const addService = async (service) => {
        dispatch({type: ADD_SERVICE_BEGIN})
        try {
            const {serviceName, serviceTime, servicePrice, serviceCategory} = service
            const { data } = await authFetch.patch('firm/services', {
                serviceName, 
                serviceTime, 
                servicePrice, 
                serviceCategory
            })
            dispatch({type: ADD_SERVICE_SUCCESS, 
                payload: {
                    firm: data.firm,
                    services: data.services
                }})
            //clearValues()
        } catch(error){
            if(error.response.status === 401) return
            dispatch({
                type: ADD_SERVICE_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const deleteServices = async (services) => {
        dispatch({type: DELETE_SERVICE_BEGIN})
        try {
            const { data } = await authFetch.delete('firm/services', {data: {servicesIds: services}})
            dispatch({
                type: DELETE_SERVICE_SUCCESS,
                payload: {
                    firm: data.firm,
                    services: data.services,
                    count: services.length
                }
            })
        } catch (error) {
            logutUser()
        }
        clearAlert()
    }
    const addWorker = async (worker) => {
        dispatch({type: ADD_WORKER_BEGIN})
        try {
            const {workerName, workerEmail, workerPhone, workerPosition, workingHours} = worker
            const { data } = await authFetch.patch('firm/workers', {
                workerName, 
                workerEmail, 
                workerPhone, 
                workerPosition,
                workingHours
            })
            dispatch({type: ADD_WORKER_SUCCESS, 
                payload: {
                    firm: data.firm,
                    workers: data.workers
                }})
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: ADD_WORKER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const updateWorkerData = async (worker) => {
        dispatch({type: UPDATE_WORKER_BEGIN})
        try {
            const {_id, workerName, workerEmail, workerPhone, workerPosition, workerAbout, workerPhoto} = worker
            const { data } = await authFetch.patch('firm/workers/data', {
                _id,
                workerName, 
                workerEmail, 
                workerPhone, 
                workerPosition,
                workerAbout,
                workerPhoto
            })
            dispatch({type: UPDATE_WORKER_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: UPDATE_WORKER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }  
    const reduceImageFileSize = async (base64Str, MAX_WIDTH = 800, MAX_HEIGHT = 600) => {
        const resized_base64 = await new Promise((resolve) => {
            let img = new Image()
            img.src = base64Str
            img.onload = () => {
                let canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height
    
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width
                        width = MAX_WIDTH
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height
                        height = MAX_HEIGHT
                    }
                }
                canvas.width = width
                canvas.height = height
                let ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)
                resolve(canvas.toDataURL()) // this will return base64 image results after resize
            }
        });
        return resized_base64;
    }
    const updateWorkerServices = async (_id, services) => {
        dispatch({type: UPDATE_WORKER_BEGIN})
        try {
            const { data } = await authFetch.patch('firm/workers/services', {
                _id,
                services
            })
            dispatch({type: UPDATE_WORKER_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: UPDATE_WORKER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const updateWorkerWorkingHours = async (workingHours, _id) => {
        dispatch({type: UPDATE_WORKER_WORKING_HOURS_BEGIN})
        try {
            const { data } = await authFetch.patch('firm/workers/workingHours', {
                _id,
                workingHours
            })
            dispatch({type: UPDATE_WORKER_WORKING_HOURS_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: UPDATE_WORKER_WORKING_HOURS_ERROR,
                payload: {msg: error.response.data.msg}
            })
        } 
        clearAlert()
    }
    const updateSalonData = async (newData) => {
        dispatch({type: UPDATE_SALON_DATA_BEGIN})
        try {
            const {companyName, businessOwner, about, street, number, postalCode, city} = newData
            const { data } = await authFetch.patch('firm/profile/data', {
                companyName,
                businessOwner,
                about,
                adress: `${street}, ${number}, ${postalCode}, ${city}`
            })
            dispatch({type: UPDATE_SALON_DATA_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: UPDATE_SALON_DATA_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const updateSalonOpeningHours = async (newHours) => {
        dispatch({type: UPDATE_SALON_OPENING_HOURS_BEGIN})
        try {
            const { data } = await authFetch.patch('firm/profile/openingHours', {
                openingHours: newHours
            })
            dispatch({type: UPDATE_SALON_OPENING_HOURS_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: UPDATE_SALON_OPENING_HOURS_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const addNewSalonImage = async (newImage) => {
        dispatch({type: UPDATE_SALON_GALLERY_BEGIN})
        try {
            const { data } = await authFetch.patch('firm/profile/gallery', {
                newImage
            })
            dispatch({type: UPDATE_SALON_GALLERY_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: UPDATE_SALON_GALLERY_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const deleteSalonImg = async (id) => {
        dispatch({type: DELETE_SALON_IMG_BEGIN})
        try {
            const { data } = await authFetch.delete(`firm/profile/gallery?id=${id}`)
            dispatch({type: DELETE_SALON_IMG_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
        }
        clearAlert()
    }
    const addNewAppointment = async (newAppointment) => {
        dispatch({type: ADD_NEW_APPOINTMENT_BEGIN})
        try {
            const { data } = await authFetch.patch(`firm/calendar`, {
                newAppointment
            })
            dispatch({type: ADD_NEW_APPOINTMENT_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
            //clearValues()
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: ADD_NEW_APPOINTMENT_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    const deleteAppointment = async (id) => {
        dispatch({type: DELETE_APPOINTMENT_BEGIN})
        try {
            const { data } = await authFetch.delete(`firm/calendar?id=${id}`)
            dispatch({type: DELETE_APPOINTMENT_SUCCESS, 
                payload: {
                    firm: data.firm,
                }})
            updateFirmInLocalStortage(data.firm)
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({
                type: DELETE_APPOINTMENT_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    return (
        <AppContext.Provider value = {{
            ...state, 
            displayAlert, 
            registerUser, 
            loginUser, 
            toggleSidebar, 
            logutUser, 
            //updateUser, 
            handleChange, 
            //clearValues,
            //changePage,
            //Appointments
            addService,
            deleteServices,
            addWorker,
            updateWorkerData,
            reduceImageFileSize,
            updateWorkerServices,
            updateWorkerWorkingHours,
            updateSalonData,
            updateSalonOpeningHours,
            addNewSalonImage,
            deleteSalonImg,
            addNewAppointment,
            deleteAppointment
            }}>

            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}