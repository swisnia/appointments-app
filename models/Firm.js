import mongoose from "mongoose"
import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Appointment from "./Appointment.js"
import Worker from "./Worker.js"
import OpeningHours from "./OpeningHours.js"
import Service from "./Service.js"
import ImageModel from "./ImageModel.js"

const arrayLimit = (val) => {
    return val.length >= 7;
}

const FirmSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false
    },
    regAndPrivacyPolicy: {
        type: Boolean,
        required: [true, 'Please accept regulations and privacy policy']
    },
    companyName: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    businessOwner: {
        type: String,
        required: [true, 'Please provide name of business owner'],
        maxlength: 20,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide phone number'],
        minlength: 9,
        trim: true,
    },
    adress: {
        type: String,
        required: [true, 'Please provide your company adress'],
        trim: true,
    },
    location: {
        type: Array,
        required: [true, 'Please provide your company adress'],
    },
    workers: {
      type: [Worker],
      required: [true, 'Please provide minimun one worker'],
    },
    services: {
        type: [Service],
        default: []
    },
    openingHours: {
        type: [OpeningHours],
        required: [true, 'Please provide opening hours'],
        validate: [arrayLimit, 'Please provide all weekdays']
    },
    salonImages: {
        type: [ImageModel],
        default: []
    },
    appointments: [Appointment],
    about: {
        type: String,
        default: ''
    }

}, { timestamps: true })

FirmSchema.pre('save', async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

FirmSchema.methods.createJWT = function() {
   return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME}) 
}

FirmSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('Firm', FirmSchema)