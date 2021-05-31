const sensorService = require('../service/sensor')
const statusResponse = require('../common/status')
const {publish} = require('../mqtt/client')

const MQTT_URL = process.env.MQTT_URL

const getAllSensors = async (req, res) => {
    try {
        const sensors = await sensorService.findAllSensors()
        res.json(statusResponse.OK(sensors))
    }catch (error){
        res.json(statusResponse.ERROR(error))
    }
}

const updateSensor = async (req, res) => {
    try {
        const {data} = req.body
        const update = await sensorService.updateSensor(data)
        if(update){
            publish(MQTT_URL + data.name, data)
            res.json(statusResponse.OK(data))
        }
    }catch (error){
        console.log(error)
        res.json(statusResponse.ERROR())
    }
}

module.exports = {
    getAllSensors,
    updateSensor,
}