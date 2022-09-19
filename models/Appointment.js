import mongoose from "mongoose"

const Appointment = new mongoose.Schema({
    date: {
        type: String,
        required: [true, 'Please provide date of appointment'],
    },
    time: {
        type: Number,
        required: [true, 'Please provide time of service'],
    },
    service: {
        type: String,
        required: [true, 'Please provide service id'],
    },
    serviceName: {
        type: String,
        //required: [true, 'Please provide service name'],
    },
    hour: {
        type: Number,
        required: [true, 'Please provide appointment hour'],
    },
    worker: {
        type: String,
        required: true,
        default: 'dowolny'
    },
    customerName: {
        type: String,
        default: 'Bez nazwy'
    }
})

export default Appointment 