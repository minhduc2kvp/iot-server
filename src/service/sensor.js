const Sensor = require('../model/sensor')

const findAllSensors = async () => {
    try {
        const result = await Sensor.find({}, { data: { $slice: -30 } })
        return result
    } catch (error) {
        throw error
    }
}

const updateSensor = async (data) => {
    try {
        let sensor = await Sensor.findOne({ name: data['name'] })
        if (!sensor) {
            sensor = new Sensor(data).save()
        }
        else {
            if (data.name == 'dht11') {
                data.data.time = new Date(Date.now()).toLocaleString()
                await Sensor.findOneAndUpdate({ name: data.name }, { $push: { data: data.data } })
            } else {
                await Sensor.findOneAndUpdate({ name: data.name }, data)
            }
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    findAllSensors,
    updateSensor,
}