import mongoose from "mongoose"

const ImageModel = new mongoose.Schema({
    img: {
        type: String,
        required: [true, 'Please provide img file']
    }
}, { timestamps: true })

export default ImageModel