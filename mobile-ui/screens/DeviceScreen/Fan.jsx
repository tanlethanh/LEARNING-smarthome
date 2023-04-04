import { DeviceContext } from '../index'
import { DeviceLayout } from '../../layouts'
import { Fan } from '../../components'
import { Text } from 'react-native'
import { WeatherWidget } from '../../components/WeatherWidget'
import { publishDeviceState, updateDeviceState } from '../../reducer/devices'
import { store } from '../../store'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const FanScreen = ({ route, navigation }) => {
    const { deviceId } = route.params | undefined
    const fanValue = deviceId ? useSelector((state) => state.devices.devicesList.find((device) => (Number(device.deviceId) == Number(deviceId))).value) : 0
    const dispatch = useDispatch()
    const updateFanValue = (value) => {
        console.log('Update: ', value)
        if (deviceId != undefined) {
            dispatch(updateDeviceState(deviceId, value))
            dispatch(publishDeviceState(deviceId, value))
        }
    }
    return (
        <DeviceLayout deviceName="Fan Device" navigation={navigation}>
            <Fan powerState={fanValue} callback={updateFanValue}></Fan>
        </DeviceLayout>
    )
}
export { FanScreen }
