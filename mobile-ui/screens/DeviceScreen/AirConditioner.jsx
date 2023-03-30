import { AirConditioner } from '../../components'
import { DeviceLayout } from '../../layouts'
import { selectSample, updateSample } from '../../devices/sample'
import { useDispatch, useSelector } from 'react-redux'

function AirConditionerScreen () {
    const dispatch = useDispatch()
    const sampleValue = useSelector(selectSample)

    return (
        <DeviceLayout deviceName={'Air conditioner'}>
            {console.log('sampleValue ' + sampleValue)}
            <AirConditioner></AirConditioner>
        </DeviceLayout>
    )
}

export default AirConditionerScreen
