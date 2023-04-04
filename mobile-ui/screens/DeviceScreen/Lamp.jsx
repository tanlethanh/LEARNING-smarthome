import { DeviceLayout } from '../../layouts'
import { Lamp } from '../../components'
import { Text } from 'react-native'
import { publishDeviceState, updateDeviceState } from '../../reducer/devices'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const LampScreen = ({ route, navigation }) => {
    const { deviceId } = route.params | undefined
    const lampValue = deviceId ? useSelector((state) => state.devices.devicesList.find((device) => (Number(device.deviceId) == Number(deviceId))).value) : 0
    const dispatch = useDispatch()
    const updateLampValue = (value) => {
        console.log('Update: ', value)
        dispatch(updateDeviceState(deviceId, value))
        dispatch(publishDeviceState(deviceId, value))
    }
    return (
        <DeviceLayout deviceName="Lamp Device" navigation={navigation}>
            <Lamp powerState={lampValue} callback={updateLampValue}></Lamp>
        </DeviceLayout>
    )
}

export { LampScreen }
