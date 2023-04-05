import { BottomBar } from '../../components/BottomBar'
import { Button, ScrollView, Text, View } from 'react-native'
import { DeviceLayout } from '../../layouts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { selectSample, updateSample } from '../../devices/sample'
import { useDispatch, useSelector } from 'react-redux'
import Lock from '../../components/Lock'

const LockScreen = ({ route, navigation }) => {
    const { deviceId } = route.params
    const dispatch = useDispatch()
    const lockValue = useSelector((state) => state.devices.devicesList.find((device) => (Number(device.deviceId) == Number(deviceId))).value)
    return (
        <DeviceLayout deviceName={'LOCK'}>
            <Lock LockState = {lockValue}></Lock>
        </DeviceLayout>
    )
}

export { LockScreen }
