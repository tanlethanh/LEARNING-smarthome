import { CronJob } from 'cron'
import { StatusCodes } from 'http-status-codes'
import Scheduling from '../models/scheduling.js'
import { Types } from 'mongoose'

import { createRequire } from 'module'

import { updateFeedValue } from '../services/updatingService.js'
const require = createRequire(import.meta.url)

export const ALL_JOBS = []

const StopStatus = {
    CANCEL: 0,
    DONE: 1
}

class Job {
    schedulingId
    cronJob
    stopStatus

    constructor (schedulingId, cronJob) {
        this.schedulingId = schedulingId
        this.cronJob = cronJob
        this.stopStatus = StopStatus.DONE
    }
}

export const getAllSchedulings = async (req, res) => {
    const feedId = req.query['feed-id']
    const status = req.query['scheduling-status']

    let schedulings = []

    if (!feedId && !status) {
        schedulings = await Scheduling.find()
    } else if (!status) {
        schedulings = await Scheduling.find({
            feed_id: feedId
        })
    } else if (!feedId) {
        schedulings = await Scheduling.find({
            status
        })
    } else {
        schedulings = await Scheduling.find({
            feed_id: feedId,
            status
        })
    }

    return res.status(StatusCodes.OK).json({
        schedulings
    })
}

export const addNewScheduling = async (req, res) => {
    const { feedId, value, time } = req.body
    console.log(req.body)
    if (!feedId || !value || !time) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Require feedId, value, time'
        })
    }

    // Reload config
    const settings = require('../settings.json')

    let triggerTime
    if (settings.mode === 'dev') {
        console.log('We are in development mode for this api service. \n\t- Simulated job will be triggered after 2s')
        triggerTime = new Date()
        triggerTime.setSeconds(triggerTime.getSeconds() + 2)
    } else {
        triggerTime = new Date(time)
    }

    if (triggerTime.getTime() < Date.now()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'This action cannot trigger in this time'
        })
    }

    const scheduling = await Scheduling.create({
        user_id: '',
        feed_id: feedId,
        trigger_time: triggerTime,
        value
    })

    const cronJob = new CronJob(
        triggerTime,
        async function () {
            console.log('Trigger Job')
            const jobIndex = ALL_JOBS.findIndex(job => job.cronJob === this)

            if (jobIndex === -1) {
                throw Error('Not found jobIndex, internal error')
            }

            const scheduling = await Scheduling.findById(ALL_JOBS[jobIndex].schedulingId)

            try {
                await updateFeedValue(scheduling.feed_id, scheduling.value)
            } catch (error) {
                console.log(`Update error: ${error.message}`)
            }

            this.stop()
        },
        async function () {
            // Release job after completing job
            const jobIndex = ALL_JOBS.findIndex(job => job.cronJob === this)

            if (jobIndex === -1) {
                throw Error('Not found jobIndex, internal error')
            }

            if (ALL_JOBS[jobIndex].stopStatus === StopStatus.CANCEL) {
                await Scheduling.updateOne({
                    _id: ALL_JOBS[jobIndex].schedulingId
                }, { status: 'CANCEL' })
            } else {
                await Scheduling.updateOne({
                    _id: ALL_JOBS[jobIndex].schedulingId
                }, { status: 'DONE' })
            }

            ALL_JOBS.splice(jobIndex, 1)
            console.log(ALL_JOBS.map(ele => ele.schedulingId))
            // return ALL_JOBS
        }, true)

    ALL_JOBS.push(new Job(scheduling._id, cronJob))

    return res.status(StatusCodes.CREATED).json({
        message: 'Create scheduling success',
        scheduling
    })
}

export const deleteScheduling = (req, res) => {
    const { schedulingId } = req.params

    try {
        // eslint-disable-next-line no-unused-vars
        const id = new Types.ObjectId(schedulingId)
    } catch {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Invalid scheduling id ' + schedulingId
        })
    }

    const jobIndex = ALL_JOBS.findIndex(job => job.schedulingId?.toString() === schedulingId)

    if (jobIndex === -1) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Not found this job'
        })
    }

    ALL_JOBS[jobIndex].stopStatus = StopStatus.CANCEL
    ALL_JOBS[jobIndex].cronJob.stop()

    return res.status(StatusCodes.OK).json({
        message: 'Delete scheduling successfully'
    })
}

export const getSchedulingById = async (req, res) => {
    const { schedulingId } = req.params
    let id
    try {
        id = new Types.ObjectId(schedulingId)
    } catch {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Invalid scheduling id ' + schedulingId
        })
    }

    return res.status(StatusCodes.OK).json({
        scheduling: await Scheduling.findById(id)
    })
}
