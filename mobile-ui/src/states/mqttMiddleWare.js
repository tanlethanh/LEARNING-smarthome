import { updateDeviceState } from "./devices";

const mqttMiddleWare = (client) => (store) => (next) => (action) => {
    if (action.type === updateDeviceState.type) {
        const { notPublish, key, value } = action.payload;
        if (!notPublish) {
            console.log("publish", action.payload);
            client.publish(key, value);
        }
    }
    return next(action);
};

export default mqttMiddleWare;
