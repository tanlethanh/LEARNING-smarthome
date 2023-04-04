import { CronJob } from 'cron'
import { StatusCodes } from 'http-status-codes'
import Scheduling from '../models/scheduling.js'

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
    triggerTime.setSeconds(triggerTime.getSeconds() + 10)

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

    if (!schedulingId) {
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

export const getSchedulingById = (req, res) => {
    return res.status(StatusCodes.OK).json({
        message: 'Hello getSchedulingById'
    })
}

// export { job }
