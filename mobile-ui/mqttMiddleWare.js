import {REACT_APP_AIO_USERNAME, REACT_APP_AIO_KEY} from '@env';
import { publishDeviceStateAction } from './actions/device';
export default mqttMiddleWare = (client) =>(store) => (next) => (action) => {
    if (action.type === publishDeviceStateAction) {
        console.log('publish', action.payload);
        client.publish(action.payload.deviceId, action.payload.state)
    }
    return next(action)
};