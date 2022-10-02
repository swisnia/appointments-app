import express from 'express'
const router = express.Router()
import {
    getAppointments, 
    addService, 
    deleteServices, 
    addWorker, 
    updateWorkerData, 
    updateWorkerServices, 
    updateWorkerWorkingHours,
    updateSalonData,
    updateSalonOpeningHours,
    addNewSalonImg,
    deleteSalonImg,
    addNewAppointment,
    deleteAppointment
} from '../controllers/firmController.js'
import authenticateUser from '../middleware/auth.js'
import validateAppointemnt from '../middleware/validate-appointment.js'

router.route('/').get(authenticateUser, getAppointments)
router.route('/services').patch(authenticateUser, addService).delete(authenticateUser, deleteServices)
router.route('/workers').patch(authenticateUser, addWorker)
router.route('/workers/data').patch(authenticateUser, updateWorkerData)
router.route('/workers/services').patch(authenticateUser, updateWorkerServices)
router.route('/workers/workingHours').patch(authenticateUser, updateWorkerWorkingHours)
router.route('/profile/data').patch(authenticateUser, updateSalonData)
router.route('/profile/openingHours').patch(authenticateUser, updateSalonOpeningHours)
router.route('/profile/gallery').patch(authenticateUser, addNewSalonImg).delete(authenticateUser, deleteSalonImg)
router.route('/calendar').patch(authenticateUser, validateAppointemnt, addNewAppointment).delete(authenticateUser, deleteAppointment)



export default router 