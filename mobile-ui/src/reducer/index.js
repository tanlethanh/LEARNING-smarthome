import { AIO_KEY, AIO_USERNAME } from "@env";
import { HTTPClient, MQTTClient } from "../adafruitJS/client";
import { addDevice, updateDeviceState } from "./devices";
import { store } from "../store";

const username = AIO_USERNAME;
const key = AIO_KEY;

export const httpClient = new HTTPClient(username, key);
export const mqttClient = new MQTTClient(username, key);

const initAllDevice = async () => {
    try {
        // Get all feeds
        const feeds = await httpClient.Feeds.getFeeds();

        // Remember to put this line into try catch block
        const conn = await mqttClient.connect();
        console.log("started", conn);

        // Subcribe Fan feeds and register dispatch function on message
        feeds.map(async (feed) => {
            await mqttClient.subcribeFeed(feed.id, (message) => {
                // Update state of device to newest
                store.dispatch(
                    updateDeviceState(feed.id, Number(message.payloadString)),
                );
            });

            store.dispatch(addDevice(feed.id, feed.key, feed.name));
        });
    } catch (error) {
        console.log("Init device error: " + error);
    }
};

export default initAllDevice;
