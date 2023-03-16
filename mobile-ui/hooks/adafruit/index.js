import { Client } from "adafruit-io";

const client = new Client("pvbt2002", "aio_eRYM28ue2aoCKS0HYVZS1n1hgZra", {
    success: () => client.Feeds.getAllFeeds().then((data) => console.log(data)),
    failure: console.error
});

export default client