import { addNewDevice, updateDeviceState } from "./devices";
import { httpClient, mqttClient } from "./adafruit";
import { store } from "./store";

export const initAllDevice = async () => {
    try {
        // Get all feeds
        // const feeds = await httpClient.Feeds.getFeeds();

        // Remember to put this line into try catch block
        const conn = await mqttClient.connect();
        console.log("started", conn);
        await mqttClient.subcribeGroup("smarthome", (message) => {
            // Update state of device to newest
            console.log(typeof message.payloadString);

            const payload = JSON.parse(message.payloadString);

            console.log(Object.keys(payload.feeds), "<--");
            const key = Object.keys(payload.feeds)[0];
            store.dispatch(
                updateDeviceState({
                    key: "smarthome." + key,
                    value: Number(payload.feeds[key]),
                    notPublish: true,
                }),
            );
        });
        const feeds = await httpClient.Feeds.getGroupFeed("smarthome");

        feeds.map(async (feed) => {
            // Add new device into store
            store.dispatch(
                addNewDevice({
                    key: feed.key,
                    metadata: feed,
                }),
            );
        });
    } catch (error) {
        console.log("Init device error: " + error);
    }
};

// export const reloadDevice = async () => {
//     try{

//     }catch(error){
//         console.log("Init device error: " + error);
//     }
// }
