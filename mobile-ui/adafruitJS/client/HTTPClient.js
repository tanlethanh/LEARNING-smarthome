import Feeds from './Feeds.js'
import axios from 'axios'

class HTTPClient {
    username
    key
    api
    Feeds

    constructor (username, apiKey) {
        console.log(`Username ${username}`)
        console.log(`API Key ${apiKey}`)
        this.username = username
        this.key = apiKey

        this.api = axios.create({
            baseURL: `https://io.adafruit.com/api/v2/${this.username}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.api.interceptors.request.use((config) => {
            config.headers['X-AIO-Key'] = this.key
            return config
        })

        this.Feeds = new Feeds(this.api)
    }
}

export { HTTPClient }
