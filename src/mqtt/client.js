const { json } = require('body-parser')
const mqtt = require('mqtt')
const sensorService = require('../service/sensor')

const options = {
    host: 'broker.hivemq.com',
    port: 1883,
}

//initialize the MQTT client
const client = mqtt.connect(options)

const MQTT_URL = process.env.MQTT_URL

//setup the callbacks
client.on('connect', function () {
    console.log('>> MQTT Broker Connected.')
    // subscribe to topic
    client.subscribe(`${MQTT_URL}led`)
    client.subscribe(`${MQTT_URL}dht11`)
    client.subscribe(`${MQTT_URL}mq5`)
    client.subscribe(`${MQTT_URL}sound`)
})

client.on('error', function (error) {
    console.log(error)
})

client.on('message', function (topic, message) {
    //Called each time a message is received
    console.log('>> Received message:', topic, message.toString())
    const data = JSON.parse(message.toString())
    // console.log(data)
    sensorService.updateSensor(data)
})

// publish
const publish = (topic, data) => {
    client.publish(topic, JSON.stringify(data))
}  

module.exports = {
    client,
    publish
}