import { publishDeviceStateAction } from "./actions/device";

const mqttMiddleWare = (client) => (store) => (next) => (action) => {
    if (action.type === publishDeviceStateAction) {
        console.log("publish", action.payload);
        client.publish(action.payload.deviceId, action.payload.state);
    }
    return next(action);
};

export default mqttMiddleWare;
