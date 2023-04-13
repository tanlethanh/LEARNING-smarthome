import { BottomBar } from '../../components/BottomBar'
import { Button, ScrollView, Text, View } from 'react-native'
import { DeviceLayout } from '../../layouts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { selectSample, updateSample } from '../../devices/sample'
import { useDispatch, useSelector } from 'react-redux'
import Lock from '../../components/Lock'

export default function LockScreen ({ route, navigation }) {
    const { deviceId } = route.params | undefined
    const lockValue = deviceId ? useSelector((state) => state.devices.devicesList.find((device) => (Number(device.deviceId) == Number(deviceId))).value) : 0
    const dispatch = useDispatch()
    const updateLockValue = (value) => {
        if (deviceId != undefined) {
            dispatch(updateDeviceState(deviceId, value))
            dispatch(publishDeviceState(deviceId, value))
        }
    }
    return (
        <DeviceLayout
            deviceName="Lock"
            navigation={navigation}
        >
            <Lock LockState = {lockValue} callback={updateLockValue}></Lock>
        </DeviceLayout>
    )
}
