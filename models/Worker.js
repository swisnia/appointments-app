import mongoose from "mongoose"
import OpeningHours from "./OpeningHours.js"

const arrayLimit = (val) => {
    return val.length >= 7;
}

const Worker = new mongoose.Schema({ 

    workerName: {
        type: String,
        required: [true, 'Please provide worker name']
    },
    workerEmail: {
        type: String,
        required: [true, 'Please provide worker email'],
    },
    workerPhone: {
        type: String,
        default: ''
    },
    workerPhoto: {
        type: String,
        default: ''
    },
    workerAbout: {
        type: String,
        default: ''
    },
    workerPosition:{
        type: String,
        default: ''
    },
    worker_services: {
        type: [String],
        default: []
    },
    workingHours: {
        type: [OpeningHours],
        required: [true, 'Please provide working hours'],
        validate: [arrayLimit, 'Please provide all weekdays']
    }
})

export default Worker