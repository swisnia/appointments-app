import mongoose from "mongoose"

const openingHours = new mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    checked: { 
        type: Boolean,
        required: true,
    },
    open: {
        type: String,
        required: true,
    },
    close: {
        type: String,
        required: true,
    },
})


export default openingHours