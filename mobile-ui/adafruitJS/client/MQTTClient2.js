import MQTT from "sp-react-native-mqtt";

class MQTTClient2 {
    username;
    apiKey;
    client;
    listSubs;

    constructor(username, apiKey) {
        this.username = username;
        this.apiKey = apiKey;

        
    }

    async connect() {
        this.client = await MQTT.createClient({
            uri: "mqtts://io.adafruit.com:8883",
            auth: true,
            user: username,
            pass: apiKey
        });
        this.client.connect();
        this.client.on("closed", function () {
            console.log("mqtt.event.closed");
        });

        this.client.on("error", function (msg) {
            console.log("mqtt.event.error", msg);
        });
        client.on("connect", function () {
            console.log("connected");
        });
    }

    async subcribeFeed(feedId) {
        await this.client.subscribe(`${this.username}/feeds/${feedId}`, 0);
    }

    async onMessage(callback) {
        this.client.on("message", (topic, message) => {
            callback(topic, message);
        });
    }

    async publish(feedId, value) {
        await this.client.publish(
            `${this.username}/feeds/${feedId}`,
            value,
            0,
            false
        );
    }
}

export { MQTTClient2 };
