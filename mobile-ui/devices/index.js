import { HTTPClient, MQTTClient } from '../adafruitJS/client'
import { REACT_APP_AIO_KEY, REACT_APP_AIO_USERNAME } from '@env'
import { randInt } from '../utils/numberUtils'
import { store } from '../store'
import { updateFan } from './fan'
import { updateSample } from './sample'
const username = REACT_APP_AIO_USERNAME
const key = REACT_APP_AIO_KEY
const httpClient = new HTTPClient(username, key)
const mqttClient = new MQTTClient(username, key)

const initAllDevice = async () => {
    try {
        // Get all feeds
        const feeds = await httpClient.Feeds.getFeeds()

        // Remember to put this line into try catch block
        const conn = await mqttClient.connect()
        console.log('started')

        // Subcribe Fan feeds and register dispatch function on message
        await mqttClient.subcribeFeed(feeds[0].id, (message) => {
            store.dispatch(updateFan(Number(message.payloadString)))
        })

        await mqttClient.subcribeFeed(feeds[1].id, (message) => {
            store.dispatch(updateSample(Number(message.payloadString)))
        })

        // Sample of public
        // for (let i = 0; i < 2; i++) {
        //     const value = randInt(1, 10);
        //     console.log("publish " + value);
        //     await mqttClient.publish(feeds[0].id, value);
        // }
    } catch (error) {
        console.log('Error: ' + error)
    }
}

export default initAllDevice
