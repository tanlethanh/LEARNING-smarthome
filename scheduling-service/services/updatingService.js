import request from 'request'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const username = process.env.AIO_USERNAME
const key = process.env.AIO_KEY

export const options = {
    baseUrl: `https://io.adafruit.com/api/v2/${username}`,
    headers: {
        'Content-Type': 'application/json',
        'X-AIO-Key': key
    }

}

export const updateFeedValue = async (feedId, value) => {
    return new Promise((resolve, reject) => {
        request.post(`/feeds/${feedId}/data`, {
            ...options,
            body: JSON.stringify({
                datum: {
                    value
                }
            })
        }, (_err, res) => {
            const body = JSON.parse(res.body)

            if (!body.error) {
                resolve(body)
            } else {
                reject(new Error(body.error))
            }
        })
    })
}
