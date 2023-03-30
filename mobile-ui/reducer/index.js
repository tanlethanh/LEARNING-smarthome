import { HTTPClient, MQTTClient } from '../adafruitJS/client'
import { REACT_APP_AIO_KEY, REACT_APP_AIO_USERNAME } from '@env'
import { addDevice, updateDeviceState } from './devices'
import { store } from '../store'
import { updateFan } from './fan'

const username = REACT_APP_AIO_USERNAME
const key = REACT_APP_AIO_KEY

const httpClient = new HTTPClient(username, key)
const mqttClient = new MQTTClient(username, key)
export { mqttClient }
const initAllDevice = async () => {
    try {
        // Get all feeds
        const feeds = await httpClient.Feeds.getFeeds()
        // Remember to put this line into try catch block
        const conn = await mqttClient.connect()
        console.log('started')

        // Subcribe Fan feeds and register dispatch function on message
        feeds.map(async (feed) => {
            await mqttClient.subcribeFeed(feed.id, (message) => {
                store.dispatch(updateDeviceState(feed.id, Number(message.payloadString)))
            })
            store.dispatch(addDevice(feed.id, feed.key, feed.name))
        })
    } catch (error) {
        console.log('Erorr: ' + error)
    }
}

export default initAllDevice
