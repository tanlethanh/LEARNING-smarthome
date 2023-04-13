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
                    id: feed.id,
                    metadata: feed,
                }),
            );

            await mqttClient.subcribeFeed(feed.id, (message) => {
                // Update state of device to newest
                store.dispatch(
                    updateDeviceState({
                        id: feed.id,
                        value: Number(message.payloadString),
                    }),
                );
            });
        });
    } catch (error) {
        console.log("Init device error: " + error);
    }
};
