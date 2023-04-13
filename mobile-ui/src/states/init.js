import { addNewDevice, updateDeviceState } from "./devices";
import { httpClient, mqttClient } from "./adafruit";
import { store } from "./store";

export const initAllDevice = async () => {
    try {
        // Get all feeds
        const feeds = await httpClient.Feeds.getFeeds();

        // Remember to put this line into try catch block
        const conn = await mqttClient.connect();
        console.log("started", conn);

        // Subcribe Fan feeds and register dispatch function on message
        feeds.map(async (feed) => {
            // Add new device into store
            store.dispatch(
                addNewDevice({
                    key: feed.key,
                    metadata: feed,
                }),
            );

            await mqttClient.subcribeFeed(feed.key, (message) => {
                // Update state of device to newest
                store.dispatch(
                    updateDeviceState({
                        key: feed.key,
                        value: Number(message.payloadString),
                        notPublish: true,
                    }),
                );
            });
        });
    } catch (error) {
        console.log("Init device error: " + error);
    }
};
