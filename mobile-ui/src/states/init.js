import { addNewDevice, updateDeviceState } from "./devices";
import { httpClient, mqttClient } from "./adafruit";
import { store } from "./store";

export const initAllDevice = async () => {
    try {
        await loadFeeds();

        connectMQTT();
    } catch (error) {
        console.log("Init device error: " + error.message, error);
    }
};

export const loadFeeds = async () => {
    console.log("Load all feeds");

    const feeds = await httpClient.Feeds.getGroupFeed("smarthome");

    // console.log(feeds);
    console.log("Loaded -> store feeds");

    feeds.map(async (feed) => {
        // Add new device into store
        store.dispatch(
            addNewDevice({
                key: feed.key,
                metadata: feed,
            }),
        );
    });

    console.log("Fetch all feeds successfully");
};

export const connectMQTT = async () => {
    // Remember to put this line into try catch block
    await mqttClient.connect();

    console.log("MQTT connected");

    mqttClient.subcribeGroup("smarthome", async (message) => {
        // Update state of device to newest
        const payload = JSON.parse(message.payloadString);
        const key = Object.keys(payload.feeds)[0];
        const device = Object.keys(store.getState().devices.devicesMap);
        if (device.includes("smarthome." + key) == false) {
            console.log("here");
            const feed = await httpClient.Feeds.getFeedById("smarthome." + key);
            store.dispatch(
                addNewDevice({
                    key: "smarthome." + key,
                    metadata: feed,
                }),
            );
        }
        store.dispatch(
            updateDeviceState({
                key: "smarthome." + key,
                value: Number(payload.feeds[key]),
                notPublish: true,
            }),
        );
    });
};
