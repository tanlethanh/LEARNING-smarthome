import { HTTPClient, MQTTClient } from "../adafruitJS/client";
import { updateFan } from "./fan";
import { addDevice, updateDeviceState} from "./devices";
import { store } from "../store";
import {REACT_APP_AIO_USERNAME, REACT_APP_AIO_KEY} from '@env';


const username = REACT_APP_AIO_USERNAME;
const key = REACT_APP_AIO_KEY;

const httpClient = new HTTPClient(username, key);
const mqttClient = new MQTTClient(username, key);
export {mqttClient}
const initAllDevice = async () => {
    try {
        // Get all feeds
        const feeds = await httpClient.Feeds.getFeeds();
        // Remember to put this line into try catch block
        const conn = await mqttClient.connect();
        console.log("started");

        // Subcribe Fan feeds and register dispatch function on message
        feeds.map(async (feed) => {
            await mqttClient.subcribeFeed(feed.id, (message) => {
                store.dispatch(updateDeviceState(feed.id, Number(message.payloadString)));
            });
            store.dispatch(addDevice(feed.id, feed.key, feed.name))

        })

        // await mqttClient.subcribeFeed(feeds[1].id, (message) => {
        //     store.dispatch(updateSample(Number(message.payloadString)));
        // });
        // feeds.map(async (feed) => {
        //     await mqttClient.subcribeFeed(feed.id, (message) => {
        //         store.dispatch(update)
        //     })
        // })


        // Sample of public
        // for (let i = 0; i < 2; i++) {
        //     const value = randInt(1, 10);
        //     console.log("publish " + value);
        //     await mqttClient.publish(feeds[0].id, value);
        // }
    } catch (error) {
        console.log("Erorr: " + error);
    }
};

export default initAllDevice;
