import Firm from '../models/Firm.js'
import {BadRequestError, NotFoundError, UnAuthenticatedError} from "../errors/index.js"
import async from 'async'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

const getAppointments = async (req,res,next) => {
    console.log('get appointments');
}
const addService = async (req,res,next) => {
    try {
        const {serviceName, serviceTime, servicePrice, serviceCategory} = req.body
        if(!serviceName, !serviceTime, !servicePrice){
            throw new BadRequestError('Please provide all values')
        }
        const firm = await Firm.findOne({_id: req.user.userId})

        const newService = {
            serviceName,
            serviceTime,
            servicePrice,
            serviceCategory
        }
        firm.services.push(newService)

        await firm.save()

        res.status(200).json({firm, services: firm.services})
    } catch (error) {
        next(error)
    }
}
const deleteServices = async (req, res, next) => {
    try {
        const services = req.body.servicesIds
        if(!services || services.length === 0){
            throw new BadRequestError('Zaznacz usługi, które chcesz usunąć')
        }
        await async.eachSeries(services, (el, done) => {
            Firm.findOneAndUpdate({
                _id: req.user.userId,
            },
            {    
                $pull: {"services": {_id: el}}       
            }, done )
        })
        const firm = await Firm.findOne({_id: req.user.userId})

        res.status(200).json({firm, services: firm.services})

    } catch (error) {
        next(error)
    }
}
const addWorker = async (req, res, next) => {
    try {
        const {workerName, workerEmail, workerPhone, workerPosition, workingHours} = req.body
        if(!workerName, !workerEmail, !workerPhone){
            throw new BadRequestError('Please provide all values')
        }
        const firm = await Firm.findOne({_id: req.user.userId})

        const newWorker = {
            workerName, 
            workerEmail, 
            workerPhone, 
            workerPosition,
            workingHours
        }
        firm.workers.push(newWorker)

        await firm.save()

        res.status(200).json({firm, workers: firm.workers})
    } catch (error) {
        next(error)
    }
}
const updateWorkerData = async (req, res, next) => {
    try {
        const {_id, workerName, workerEmail, workerPhone, workerPosition, workerAbout, workerPhoto} = req.body
        if(!workerName, !workerEmail, !workerPhone){
            throw new BadRequestError('Please provide all values')
        } 
        await Firm.findOneAndUpdate({
            _id: req.user.userId,
            "workers._id": _id
        }, {
            $set: {"workers.$.workerName": workerName,
            "workers.$.workerPosition": workerPosition,
            "workers.$.workerPhone": workerPhone,
            "workers.$.workerAbout": workerAbout,
            "workers.$.workerPhoto": workerPhoto }
        })
        const firm = await Firm.findOne({_id: req.user.userId})
        //findOneAndUpdate is returning object before update!!!
        res.status(200).json({firm, workers: firm.workers})
    } catch (error) {
        next(error)
    }
}
const updateWorkerServices = async (req, res, next) => {
    try {
        const {_id, services} = req.body
        if(!_id, !services){
            throw new BadRequestError('Please provide all values')
        } 
        await Firm.findOneAndUpdate({
            _id: req.user.userId,
            "workers._id": _id
        }, {
            $set: {"workers.$.worker_services": services}            
        })
        const firm = await Firm.findOne({_id: req.user.userId})
        //findOneAndUpdate is returning object before update!!!
        res.status(200).json({firm, workers: firm.workers})
    } catch (error) {
        next(error)
    }
}
const updateWorkerWorkingHours = async (req, res, next) => {
    try {
        const {_id, workingHours} = req.body

        const firm = await Firm.findOne({_id: req.user.userId})
        const workerIndex = firm.workers.findIndex(e => String(e._id) === String(_id))
        const firmOpeningHours = firm.openingHours

        firmOpeningHours.map((e, i) => {
            const workerStart = moment(workingHours[i].open, 'h:mm')
            const firmStart = moment(e.open, 'h:mm')
            const workerFinish = moment(workingHours[i].close, 'h:mm')
            const firmFinish = moment(e.close, 'h:mm')
            
            if(workerStart.isBefore(firmStart)){
                throw new BadRequestError('You can not set hour before salon opening')
            }
            if(workerFinish.isAfter(firmFinish)){
                throw new BadRequestError('You can not set hour after salon closing')
            }
            if(workingHours[i].checked !== e.checked){
                throw new BadRequestError('You can not set worker working when salon is closed')
            }
        })
        firm.workers[workerIndex].workingHours = workingHours
        await firm.save()

        res.status(200).json({firm, workers: firm.workers})
    } catch (error) {
        next(error)
    }
}
const deleteWorker = async (req, res, next) => {
    try {
        const id = req.query.id
        if(!id){
            throw new BadRequestError('Please provide image id')
        }
        await Firm.findOneAndUpdate({
            _id: req.user.userId,
        }, {
            $pull: {"workers": {_id: id}}
        })
        const firm = await Firm.findOne({_id: req.user.userId})
        res.status(200).json({firm})
    } catch (error) {
      next(error)  
    }
}
const updateSalonData = async (req, res, next) => {
    try {
        const {companyName,businessOwner,about,adress} = req.body
        if(!companyName || !businessOwner || !adress){
            throw new BadRequestError('Please provide all values')
        }
        const firm = await Firm.findOne({_id: req.user.userId})

        firm.companyName = companyName
        firm.businessOwner = businessOwner
        firm.about = about
        firm.adress = adress

        await firm.save()

        res.status(200).json({firm})
    } catch (error) {
        next(error)
    }
}
const updateSalonOpeningHours = async (req, res, next) => {
    try{
        const {openingHours} = req.body
        if(!openingHours){
            throw new BadRequestError('Please provide all values')
        }
        const firm = await Firm.findOne({_id: req.user.userId})

        firm.workers.map(worker => {
            worker.workingHours.map((e, i) => {
                const workerStart = moment(e.open, 'h:mm')
                const firmStart = moment(openingHours[i].open, 'h:mm')
                const workerFinish = moment(e.close, 'h:mm')
                const firmFinish = moment(openingHours[i].close, 'h:mm')

                if(firmStart.isAfter(workerStart)){
                    e.open = openingHours[i].open
                }
                if(firmFinish.isBefore(workerFinish)){
                    e.close = openingHours[i].close
                }
                if(e.checked && !openingHours[i].checked){
                    e.checked = false
                }
            })
        })

        firm.openingHours = openingHours

        await firm.save()
        
        res.status(200).json({firm})
    } catch (error) {
        next(error)
    }

}
const addNewSalonImg = async (req, res, next) => {
    try {
        const {newImage} = req.body
        if(!newImage){
            throw new BadRequestError('Please provide all values')
        }
        const firm = await Firm.findOne({_id: req.user.userId})
        firm.salonImages.push(newImage)
        firm.save()

        res.status(200).json({firm})
    } catch (error) {
        next(error)
    }
}
const deleteSalonImg = async (req, res, next) => {
    try {
        const id = req.query.id
        if(!id){
            throw new BadRequestError('Please provide image id')
        }
        await Firm.findOneAndUpdate({
            _id: req.user.userId,
        }, {
            $pull: {"salonImages": {_id: id}}
        })

        const firm = await Firm.findOne({_id: req.user.userId})
        res.status(200).json({firm})

    } catch (error) {
        next(error)
    }
}
const addNewAppointment = async (req, res, next) => {
    try {
        const {date, time, hour, worker} = req.body.newAppointment
        const {newAppointment} = req.body

        const firm = await Firm.findOne({_id: req.user.userId})
        
        firm.appointments.forEach(e => {
            if(e.worker === worker && e.date === date && e.hour < hour + time && hour < e.hour + e.time){
                throw new BadRequestError('This hour is not available')
            }
        })
        const workerIndex = firm.workers.findIndex(e => String(e._id) === String(worker))
        let dayIndex = moment(date).day()
        dayIndex = dayIndex === 0 ? dayIndex = 6 : dayIndex = dayIndex -1
        const choosenWorker = firm.workers[workerIndex]
        const workerWorkingHours = choosenWorker.workingHours[dayIndex]
        const workerStart = moment(workerWorkingHours.open, 'h:mm')
        const workerFinish = moment(workerWorkingHours.close, 'h:mm')
        const appointmentStart = moment(changeTimeFormat(hour), 'h:mm')
        const appointmentFinish = moment(changeTimeFormat(hour+time), 'h:mm')

        if(appointmentStart.isBefore(workerStart) || appointmentFinish.isAfter(workerFinish)){
            throw new BadRequestError('Appointment time must be in worker working hours')
        }

        firm.appointments.push(newAppointment)
        await firm.save()

        res.status(200).json({firm}) 
    } catch (error) {
        next(error)
    }
}
const deleteAppointment = async (req, res, next) => {
    try {
        const appointmentId = req.query.id
        if(!appointmentId){
            throw new BadRequestError('Please provide appointment id')
        }
        await Firm.findOneAndUpdate({
            _id: req.user.userId,
        }, {
            $pull: {"appointments": {_id: appointmentId}}
        })

        const firm = await Firm.findOne({_id: req.user.userId})
        res.status(200).json({firm})
    } catch (error) {
        next(error)
    }
}

const changeTimeFormat = (t) => {
    return `${parseInt(t/60)}:${('00' + t%60).slice(-2)}`
}
export {
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
    deleteAppointment,
    deleteWorker
}