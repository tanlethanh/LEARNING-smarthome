import { AIO_KEY, AIO_USERNAME } from "@env";
import { HTTPClient, MQTTClient } from "../adafruitJS/client";
const username = AIO_USERNAME;
const key = AIO_KEY;

export const httpClient = new HTTPClient(username, key);
export const mqttClient = new MQTTClient(username, key);
