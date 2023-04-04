import { Schema, model } from 'mongoose'

export const SchedulingStatus = {
    INIT: 'INIT',
    DONE: 'DONE',
    FAIL: 'FAIL',
    CANCEL: 'CANCEL'
}

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
        enum: Object.values(SchedulingStatus),
        default: 'INIT'
    }
})

const Scheduling = model('Scheduling', scheduling)
export default Scheduling
