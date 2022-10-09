import {BadRequestError} from "../errors/index.js"

const validateWorkingHours = (req, res, next) => {
    const {_id, workingHours} = req.body

    if(!_id || !workingHours){
        throw new BadRequestError('Please provide all values')
    }

    next()
}

export default validateWorkingHours