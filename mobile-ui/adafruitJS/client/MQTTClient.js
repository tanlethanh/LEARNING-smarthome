import Paho from "paho-mqtt";
class MQTTClient {
    username;
    apiKey;
    client;
    listSubs;
    connected = false;
    conn = undefined;

    constructor(username, apiKey) {
        this.username = username;
        this.apiKey = apiKey;
        this.listSubs = [];
        this.client = new Paho.Client("wss://io.adafruit.com:443/", "soviteam");
        // io.adafruit.com mqtts://io.adafruit.com:8883
    }

    async connect() {
        if (!this.connected) {
            return new Promise((resolve, reject) => {
                this.client.connect({
                    onSuccess: (conn) => {
                        console.log("Connected to MQTT broker.");
                        this.conn = conn;
                        this.connected = true;
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

    async subcribeFeed(feedId) {
        // await this.client.subscribe(`${this.username}/feeds/${feedId}`);
        this.client.subscribe(`${this.username}/feeds/${feedId}`, {
            qos: 0,
            onSuccess: () => {
                console.log(
                    `Subscribed to MQTT topic. ${this.username}/feeds/${feedId}`
                );
            },
            onFailure: (error) => {
                console.error("Failed to subscribe to MQTT topic: ", error);
            }
        });
    }

    async onMessage(callback) {
        this.client.onMessageArrived = (message) => {
            callback(message);
        };
    }

    async publish(feedId, value) {
        const message = new Paho.Message(JSON.stringify(value));
        message.destinationName = `${this.username}/feeds/${feedId}`;
        this.client.send(message);
    }
}

export { MQTTClient };
