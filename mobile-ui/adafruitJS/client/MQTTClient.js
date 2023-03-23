import Paho from "paho-mqtt";
class MQTTClient {
    username;
    apiKey;
    client;
    listSubs;
    connected = false;
    conn = undefined;
    subcribers = {};

    constructor(username, apiKey) {
        this.username = username;
        this.apiKey = apiKey;
        this.listSubs = [];
        this.client = new Paho.Client("wss://io.adafruit.com:443/", "soviteam");
    }

    async connect() {
        if (!this.connected) {
            return new Promise((resolve, reject) => {
                this.client.connect({
                    onSuccess: (conn) => {
                        console.log("Connected to MQTT broker.");
                        this.conn = conn;
                        this.connected = true;
                        this.client.onMessageArrived = (message) => {
                            this.defautOnMessage(message)
                        };
                        resolve(conn);
                    },
                    onFailure: (error) => {
                        console.error(
                            "Failed to connect to MQTT broker: ",
                            error
                        );
                        reject(error);
                    },
                    userName: this.username,
                    password: this.apiKey
                });
            });
        }
        return this.conn;
    }

    async subcribeFeed(feedId, callback) {
        // Adding callback for each subcriber
        const subUrl = `${this.username}/feeds/${feedId}`;
        this.subcribers[subUrl] = callback;

        return new Promise((resolve, reject) => {
            // Subcribe to MQTT client
            this.client.subscribe(subUrl, {
                qos: 0,
                onSuccess: (sub) => {
                    console.log(`Subscribed to MQTT topic. ${subUrl}`);
                    resolve(sub);
                },
                onFailure: (error) => {
                    console.error("Failed to subscribe to MQTT topic: ", error);
                    reject(error);
                }
            });
        });
    }

    async onMessage(callback) {
        this.client.onMessageArrived = (message) => {
            console.log("onMessage custom");
            callback(message);
            this.defautOnMessage(message);
        };
    }

    async publish(feedId, value) {
        const message = new Paho.Message(JSON.stringify(value));
        message.destinationName = `${this.username}/feeds/${feedId}`;
        this.client.send(message);
    }

    defautOnMessage(message) {
        console.log(
            `onMessage: [topic]: ${message.topic} - [value]: ${message.payloadString}`
        );
        const feedCb = this.subcribers[message.topic];
        if (feedCb && typeof feedCb == "function") {
            feedCb(message);
        }
    }
}

export { MQTTClient };
