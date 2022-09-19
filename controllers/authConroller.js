import Firm from "../models/Firm.js"
import {BadRequestError, UnAuthenticatedError} from "../errors/index.js"


const register = async (req, res, next) => {
    try {
        const {
            email, 
            password,
            regAndPrivacyPolicy,
            companyName,
            businessOwner,
            phoneNumber,
            adress,
            location,
            workers,
            services,
            openingHours,
            about,
            salonImages
        } = req.body

        if(!email || !password || !regAndPrivacyPolicy || !companyName || !businessOwner
            || !phoneNumber || !adress || !location || !workers || !openingHours){//dokoncz sprawdzanie czy wszystkie dane zostały podane
            throw new BadRequestError('please provide all values')
        }
        const firmAlreadyExist = await Firm.findOne({email})
        if(firmAlreadyExist){
            throw new BadRequestError('Email already in use')
        }
        const firm = await Firm.create({
            email, 
            password,
            regAndPrivacyPolicy,
            companyName,
            businessOwner,
            phoneNumber,
            adress,
            location,
            services,
            workers,
            openingHours,
            about,
            salonImages
        })
        const token = firm.createJWT()
        res.status(201).json({firm: {
            email: firm.email, 
            companyName: firm.companyName,
            businessOwner: firm.businessOwner,
            phoneNumber: firm.phoneNumber,
            adress: firm.adress,
            location: firm.location,
            services: firm.services,
            workers: firm.workers,
            openingHours: firm.openingHours,
            about: firm.about,
            salonImages: firm.salonImages
        }, 
        token,
        location: firm.location,
        services: firm.services,
        appointments: firm.appointments})
    } catch (error) {
        next(error)
    }
}
const login = async (req,res, next) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            throw new BadRequestError('Please provide all values')
        }
        
        const firm = await Firm.findOne({email}).select('+password')
        if(!firm){
            throw new UnAuthenticatedError('Invalid credentials')
        }
        
        const isPasswordCorrect = await firm.comparePassword(password)
        if(!isPasswordCorrect){
            throw new UnAuthenticatedError('Invalid credentials')
        }
        const token = firm.createJWT()
        firm.password = undefined
        res.status(200).json({
            firm, 
            token, 
            location: firm.location, 
            services: firm.services, 
            appointments: firm.appointments
        })
    } catch (error) {
        next(error)
    }

}
const updateUser = async (req,res,next) => {
    try{
        const {email, name, lastName, location} = req.body
        if(!email || !name || !lastName || !location){
            throw new BadRequestError('Please provide all values')
        }
        const user = await User.findOne({_id: req.user.userId})

        user.email = email
        user.name = name
        user.lastName =lastName
        user.location = location

        await user.save()

        const token = user.createJWT()

        res.status(200).json({user, token, location: user.location})
    } catch(error) {
        next(error)
    }
}

export {register, login, updateUser}