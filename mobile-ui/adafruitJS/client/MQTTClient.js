import mqtt from "async-mqtt";

class MQTTClient {
    username;
    apiKey;
    client;
    listSubs;

    constructor(username, apiKey) {
        this.username = username;
        this.apiKey = apiKey;
        this.listSubs = [];
    }

    async connect() {
        this.client = await mqtt.connectAsync("tcp://io.adafruit.com", {
            username: this.username,
            password: this.apiKey,
        });
    }

    async subcribeFeed(feedId) {
        await this.client.subscribe(`${this.username}/feeds/${feedId}`);
    }

    async onMessage(callback) {
        this.client.on("message", (topic, message) => {
            callback(topic, JSON.parse(message));
        });
    }

    async publish(feedId, value) {
        await this.client.publish(
            `${this.username}/feeds/${feedId}`,
            JSON.stringify({ value })
        );
    }
}

export { MQTTClient };
