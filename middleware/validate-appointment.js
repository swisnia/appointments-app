import {BadRequestError} from "../errors/index.js"

const validateAppointemnt = (req, res, next) => {
    const {date, service, time, hour, worker, serviceName} = req.body.newAppointment

    if(!date || !service || !time || !hour || !worker || !serviceName){
        throw new BadRequestError('Please provide all values')
    }
    next()
}

export default validateAppointemnt