import { HTTPClient, MQTTClient } from "./client/index.js";

import * as dotenv from "dotenv";

dotenv.config();

const username = "pvbt2002";
const key = "aio_fQgz28z4vEZnLRaqhWGIbxTOI6rZ";

const httpClient = new HTTPClient(username, key);

// const mqttClient = new MQTTClient(username, key);

try {
    const feeds = await httpClient.Feeds.getFeeds();
    const feedData = await httpClient.Feeds.getFeedById(feeds[0].id);
    const resFeed = await httpClient.Feeds.createData(feeds[0].id, 9999);
    console.log(feeds);

    // await mqttClient.connect();

    // console.log("started");

    // await mqttClient.subcribeFeed(feeds[0].id);
    // mqttClient.onMessage((topic, message) => {
    //     console.log(topic);
    //     console.log(message);
    // });

    // const res = await mqttClient.publish(feeds[0].id, 99);
    // console.log(res);
} catch (error) {
    console.log(error);
}
