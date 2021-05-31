const express = require('express')
const router = express.Router()
const sensorController = require('../controller/sensor')
const verify = require('../middleware/auth')

router.get('/', verify, sensorController.getAllSensors)
router.put('/', verify, sensorController.updateSensor)

module.exports = router