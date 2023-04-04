import { CronJob } from 'cron'
import { StatusCodes } from 'http-status-codes'
import Scheduling from '../models/scheduling.js'

export const ALL_JOBS = []

class Job {
    schedulingId
    cronJob

    constructor (schedulingId, cronJob) {
        this.schedulingId = schedulingId
        this.cronJob = cronJob
    }
}

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

    const triggerTime = new Date()
    triggerTime.setSeconds(triggerTime.getSeconds() + 1)

    // const triggerTime = new Date(time)

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

    const cronJob = new CronJob(
        triggerTime,
        function () {
            console.log('Trigger Job')
            this.stop()
        },
        async function () {
            // Release job after completing job
            const jobIndex = ALL_JOBS.findIndex(job => job.cronJob === this)

            await Scheduling.updateOne({
                _id: ALL_JOBS[jobIndex].schedulingId
            }, { status: 'DONE' })

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

    if (!schedulingId) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Invalid scheduling id ' + schedulingId
        })
    }

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
