import { Schema, model } from 'mongoose'

const scheduling = new Schema({
    user_id: {
        type: String
    },
    feed_id: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    trigger_time: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['INIT', 'DONE', 'FAIL'],
        default: 'INIT'
    }
})

const Scheduling = model('Scheduling', scheduling)
export default Scheduling
