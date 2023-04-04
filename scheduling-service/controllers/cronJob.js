import { CronJob } from 'cron'
import { StatusCodes } from 'http-status-codes'
import Scheduling from '../models/scheduling.js'

const ALL_JOBS = []

class Job {
    jobId
    cronJob

    constructor (jobId, cronJob) {
        this.jobId = jobId
        this.cronJob = cronJob
    }
}

// const cronTime = new CronTime(new Date())

// console.log(cronTime)

// const timeD = new Date()
// timeD.setSeconds(timeD.getSeconds() + 2)

// const job = new CronJob(timeD, () => {
//     console.log('hello world')
// }, null, true)

// job.stop()

export const getAllSchedulings = (req, res) => {
    return res.status(StatusCodes.OK).json({
        message: 'Hello world'
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

    const triggerTime = new Date(time)
    console.log(triggerTime.getTime(), Date.now())

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

    const cronJob = new CronJob(triggerTime, () => {
        console.log('Trigger JOB')
    }, null, true)

    ALL_JOBS.push(new Job(scheduling._id, cronJob))

    return res.status(StatusCodes.CREATED).json({
        message: 'Create scheduling success',
        scheduling
    })
}

export const deleteScheduling = (req, res) => {
    return res.status(StatusCodes.OK).json({
        message: 'Hello world'
    })
}

export const getSchedulingById = (req, res) => {
    return res.status(StatusCodes.OK).json({
        message: 'Hello getSchedulingById'
    })
}

// export { job }
