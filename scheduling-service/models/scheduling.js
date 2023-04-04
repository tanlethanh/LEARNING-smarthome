import { Schema, model } from 'mongoose'

export const SchedulingStatus = {
    INIT: 'INIT',
    DONE: 'DONE',
    FAIL: 'FAIL',
    CANCEL: 'CANCEL'
}

export const SchedulingOption = {
    EVERYDAY: 'EVERYDAY',
    ONCE: 'ONCE'
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
        default: SchedulingStatus.INIT
    },
    option: {
        type: String,
        enum: Object.values(SchedulingOption),
        default: SchedulingOption.ONCE
    }
})

const Scheduling = model('Scheduling', scheduling)
export default Scheduling
