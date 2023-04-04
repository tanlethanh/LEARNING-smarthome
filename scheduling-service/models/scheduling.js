import { Schema, model } from 'mongoose'

const scheduling = new Schema({
    user_id: {
        type: String
    },
    feed_id: {
        type: String,
        require: true
    },
    value: {
        require: true
    },
    trigger_time: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        enum: ['INIT', 'DONE', 'FAIL'],
        default: 'INIT'
    }
})

const Scheduling = model('Scheduling', scheduling)
export default Scheduling
