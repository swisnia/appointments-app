import mongoose from "mongoose"

const Service = new mongoose.Schema({
    serviceName: {
        type: String,
        required: [true, 'Please provide service name']
    },
    serviceTime: {
        type: String,
        required: [true, 'Please provide service time']
    },
    servicePrice: {
        type: String,
        required: [true, 'Please provide service price']
    },
    serviceCategory: {
        type: String,
        default: ''
    }
})

export default Service