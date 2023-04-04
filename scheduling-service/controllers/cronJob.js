import { CronJob, CronTime } from 'cron'
import { StatusCodes } from 'http-status-codes'
import Scheduling from '../models/scheduling'

const ALL_JOBS = []

class Job {
    jobId
    cronJob

    constructor (jobId, cronJob) {
        this.jobId = jobId
        this.cronJob = cronJob
    }
}

const cronTime = new CronTime(new Date())

// console.log(cronTime)

const timeD = new Date()
timeD.setSeconds(timeD.getSeconds() + 2)

const job = new CronJob(timeD, () => {
    console.log('hello world')
}, null, true)

// job.stop()

export const getAllSchedulings = (req, res) => {

}

export const addNewSchedulings = async (req, res) => {
    const { feedId, value, time } = req.body
    if (!feedId || !value || !time) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Require feedId, value, time'
        })
    }

    const triggerTime = new Date(time)

    if (triggerTime < Date.now()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'This action cannot trigger by this time'
        })
    }

    const scheduling = await Scheduling.create({
        user_id: '',
        feed_id: feedId,
        time: new Date(time)
    })

    const cronJob = new CronJob(triggerTime, () => {
        console.log('Trigger JOB')
    })

    ALL_JOBS.push(new Job(scheduling._id, cronJob))

    return res.status(StatusCodes.CREATED).json({
        message: 'Create scheduling success',
        scheduling
    })
}

export const deleteScheduling = (req, res) => {

}

export const getSchedulingById = (req, res) => {

}

export { job }
