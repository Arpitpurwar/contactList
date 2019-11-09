const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating contact schema with respective fields

const ContactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        min: 6,
        max: 255,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        min: 6,
        max: 255,
        required: true
    },
    address: {
        type: String,
        trim: true,
        max: 1024,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Contact', ContactSchema);
