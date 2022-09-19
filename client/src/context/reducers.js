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
    CLEAR_FILTERS,
    CHANGE_PAGE,*/
    //appointments
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
    ADD_NEW_APPOINTMENT_ERROR  
} from "./actions"
import { initialState } from "./appContext"

const reducer = (state, action) => {/*action ustawiam za pomoca dispatch*/
    if(action.type === DISPLAY_ALERT ){/*dispatch({type: DISPLAY_ALERT})*/
        return {...state, /*const [ state, dispatch ] = useReducer(reducer, initialState), reducer zwraca state i dispatch*/
            //ustawiam dodatkowe propsy w moim stanie
            showAlert: true,
            alertType: 'danger', 
            alertText: 'Please provide all values!'}
    }

    if(action.type === CLEAR_ALERT ){
        return {...state, 
            showAlert: false, 
            alertType: '', 
            alertText: ''
        }
    }
    if(action.type === REGISTER_USER_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === REGISTER_USER_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            token: action.payload.token,
            firm: action.payload.firm,
            firmLocation: action.payload.location,
            services: action.payload.services,
            appointments: action.payload.appointments,
            showAlert: true,
            alertType: 'success',
            alertText: 'User created! Redirecting...'
        }
    }
    if(action.type === REGISTER_USER_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === LOGIN_USER_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === LOGIN_USER_SUCCESS){
        return {
            ...state,  
            isLoading: false,
            token: action.payload.token,
            firm: action.payload.firm,
            firmLocation: action.payload.location,
            services: action.payload.services,
            appointments: action.payload.appointments,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login succesfully! Redirecting...'
        }
    }
    if(action.type === LOGIN_USER_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === TOGGLE_SIDEBAR){
        return {
            ...state, 
            showSidebar: !state.showSidebar
        }
    }
    if(action.type === LOGOUT_USER){
        return {
            ...initialState,
            firm: null,
            token: null,
            firmLocation: '',
        }
    }
    /*if(action.type === UPDATE_USER_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === UPDATE_USER_SUCCESS){
        return {
            ...state,  
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!'
        }
    }
    if(action.type === UPDATE_USER_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }*/
    if(action.type === HANDLE_CHANGE){
        return {
            ...state,
            page: 1, 
            [action.payload.name]: action.payload.value
        }
    }
    /*if(action.type === CLEAR_VALUES){
        const initialState = {
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending'
        }
        return {
            ...state,
            ...initialState 
        }
    }*/
    /*if(action.type === CLEAR_FILTERS){
        return {
            ...state,  
            search: '',
            searchStatus: 'all',
            searchType: 'all',
            sort: 'latest',           
        }
    }*/
    /*if(action.type === CHANGE_PAGE){
        return {
            ...state,  
            page: action.payload.page 
                     
        }
    }*/
    //Appointemnts
    if(action.type === ADD_SERVICE_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === ADD_SERVICE_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            services: action.payload.services,
            showAlert: true,
            alertType: 'success',
            alertText: 'Dodano usługę'
        }
    }
    if(action.type === ADD_SERVICE_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === DELETE_SERVICE_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === DELETE_SERVICE_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            services: action.payload.services,
            showAlert: true,
            alertType: 'success',
            alertText: `Usunieto ${action.payload.count} usług`
        }
    }
    if(action.type === ADD_WORKER_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === ADD_WORKER_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            workers: action.payload.workers,
            showAlert: true,
            alertType: 'success',
            alertText: 'Dodano pracownika'
        }
    }
    if(action.type === ADD_WORKER_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === UPDATE_WORKER_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === UPDATE_WORKER_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            showAlert: true,
            alertType: 'success',
            alertText: 'Zaktualizowano dane pracownika'
        }
    }
    if(action.type === UPDATE_WORKER_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === UPDATE_WORKER_WORKING_HOURS_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === UPDATE_WORKER_WORKING_HOURS_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            showAlert: true,
            alertType: 'success',
            alertText: 'Zaktualizowano godziny pracy'
        }
    }
    if(action.type === UPDATE_WORKER_WORKING_HOURS_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === UPDATE_SALON_DATA_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === UPDATE_SALON_DATA_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            showAlert: true,
            alertType: 'success',
            alertText: 'Zaktualizowano dane salonu'
        }
    }
    if(action.type === UPDATE_SALON_DATA_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === UPDATE_SALON_OPENING_HOURS_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === UPDATE_SALON_OPENING_HOURS_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            showAlert: true,
            alertType: 'success',
            alertText: 'Zaktualizowano godziny otwarcia'
        }
    }
    if(action.type === UPDATE_SALON_OPENING_HOURS_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === UPDATE_SALON_GALLERY_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === UPDATE_SALON_GALLERY_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            showAlert: true,
            alertType: 'success',
            alertText: 'Zdjęcie dodano pomyślnie!'
        }
    }
    if(action.type === UPDATE_SALON_GALLERY_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === DELETE_SALON_IMG_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === DELETE_SALON_IMG_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            showAlert: true,
            alertType: 'success',
            alertText: 'Usunięto zdjęcie'
        }
    }
    if(action.type === ADD_NEW_APPOINTMENT_ERROR){
        return {
            ...state, 
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === ADD_NEW_APPOINTMENT_BEGIN){
        return {...state, isLoading: true}
    }
    if(action.type === ADD_NEW_APPOINTMENT_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            firm: action.payload.firm,
            showAlert: true,
            alertType: 'success',
            alertText: 'Wizyta dodana pomyślnie'
        }
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer
