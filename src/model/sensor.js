const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    data : {
        type: Object
    }
})

module.exports = mongoose.model('sensor', sensorSchema)