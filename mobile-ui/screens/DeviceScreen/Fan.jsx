import { DeviceLayout } from '../../layouts'
import { Fan } from '../../components'
import { selectFan } from '../../devices/fan'
import { useDispatch, useSelector } from 'react-redux'

export default function FanScreen () {
    const fanValue = useSelector(selectFan)
    const dispatch = useDispatch()

    const updateFanValue = (value) => {
        // dispatch(updateFan(value))
    }

    return (
        <DeviceLayout deviceName="Fan Device">
            {console.log('fanValue ' + fanValue)}
            <Fan></Fan>
        </DeviceLayout>
    )
}
