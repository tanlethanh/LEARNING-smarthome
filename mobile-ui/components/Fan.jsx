import {
    Alert,
    Animated,
    Easing,
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput
    , View, ViewBase
} from 'react-native'
import { Button } from 'tamagui'
import Lottie from 'lottie-react-native'
import React, { useEffect, useRef, useState } from 'react'
import Slider from '@react-native-community/slider'
import ToggleSwitch from 'toggle-switch-react-native'

function Fan ({ powerState, callback }) {
    const [power, setPower] = useState(powerState)
    const [timer, setTimer] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [hour, setHour] = useState(0)
    const [show, setShow] = useState('level')
    const minuteInput = useRef()
    const secondInput = useRef()

    const handleToggle = () => {
        const stateNumber = power == 0 ? 2 : 0
        handleSetPower(stateNumber)
    }
    const handleSetTimer = (newValue) => {
        handleSetPower(newValue == 0 ? 0 : 2)
        const sValue = newValue % 60
        const mValue = Math.floor(newValue / 60) % 60
        const hValue = Math.floor(newValue / 3600)
        setSecond(() => parseInt(sValue))
        setMinute(() => parseInt(mValue))
        setHour(() => parseInt(hValue))
        setTimer(newValue != 0)
    }
    const handleTimerTimeout = () => {
        setPower(0)
    }
    const handleSetPower = (value) => {
        // callback(value)
        setPower(value)
        value == 0 ? fanRef.current?.pause() : fanRef.current?.resume()
        console.log('Hello')
    }
    const fanRef = useRef(new Animated.Value(0))
    useEffect(() => {
        setPower(powerState)
    }, [powerState])
    // useEffect(() => {
    //     if (!timer) {
    //         return
    //     }
    //     const myInterval = setInterval(() => {
    //         if (second > 0) {
    //             setSecond((second) => second - 1)
    //         }
    //         if (second === 0) {
    //             if (minute > 0) {
    //                 setMinute((minute) => minute - 1)
    //                 setSecond(() => 59)
    //             }
    //             if (minute === 0) {
    //                 if (hour > 0) {
    //                     setHour((hour) => hour - 1)
    //                     setMinute(() => 59)
    //                     setSecond(() => 59)
    //                 } else if (hour === 0) {
    //                     handleTimerTimeout()
    //                     setTimer(false)
    //                     clearInterval(myInterval)
    //                 }
    //             }
    //         }
    //     }, 1000)
    //     return () => {
    //         clearInterval(myInterval)
    //     }
    // })
    const handleSubmit = () => {
        setModalVisible((value) => !value)
        setTimer(true)
    }
    return (
        <ScrollView className="w-full h-fit">
            <View className="flex flex-col w-full h-full items-center  p-3 gap-1">
                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.')
                        setModalVisible(!modalVisible)
                    }}
                >
                    <View className="flex-1 justify-center items-center mt-[22px] bg-[#000]/50 backdrop-blur-sm">
                        <View className="m-[20px] bg-white rounded-[20px] p-[35px] items-center shadow-[#000]">
                            <Text>Custom scheduled timer</Text>
                            <View className="flex flex-row justify-between items-center p-3 gap-[10px]">
                                <TextInput
                                    className="rounded-[10px] border h-[50px] w-[40px] text-center"
                                    autoFocus={true}
                                    value={toString(hour) | ''}
                                    onChange={(value) =>
                                        setHour(
                                            parseInt(value.nativeEvent.text) | 0
                                        )
                                    }
                                    onSubmitEditing={() => {
                                        minuteInput.current.focus()
                                    }}
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                />
                                <Text>:</Text>
                                <TextInput
                                    className="rounded-[10px] border h-[50px] w-[40px] text-center"
                                    returnKeyType="next"
                                    value={toString(minute) | ''}
                                    onChange={(value) =>
                                        setMinute(
                                            parseInt(value.nativeEvent.text) | 0
                                        )
                                    }
                                    onSubmitEditing={() => {
                                        secondInput.current.focus()
                                    }}
                                    keyboardType="numeric"
                                    ref={minuteInput}
                                    blurOnSubmit={false}
                                />
                                <Text>:</Text>
                                <TextInput
                                    ref={secondInput}
                                    className="rounded-[10px] border h-[50px] w-[40px] text-center"
                                    value={toString(second) | ''}
                                    onChange={(value) =>
                                        setSecond(
                                            parseInt(value.nativeEvent.text) | 0
                                        )
                                    }
                                    returnKeyType="next"
                                    onSubmitEditing={() => {
                                        handleSubmit()
                                    }}
                                    keyboardType="numeric"
                                />
                            </View>
                            <Button
                                onPress={() => {
                                    handleSubmit()
                                }}
                            >
                                <Text>Ok</Text>
                            </Button>
                        </View>
                    </View>
                </Modal> */}
                {/* <View className="flex justify-center items-center w-60 h-60">
                    <Image
                        className="w-52 h-52 mix-blend-multiply"
                        source={require('../assets/fan.png')}
                    ></Image>
                </View> */}
                <View className="w-[200px] h-[200px]">
                    <Lottie
                        ref = {fanRef}
                        source={require('./../assets/fan.json')}
                        loop={true}
                        autoPlay={false}
                        speed={ power}/>
                </View>
                <View className="flex flex-row justify-between items-center p-2 w-full">
                    <Text className="font-semibold text-gray-700 text-xl">
                        {power != 0 ? 'On' : 'Off'}
                    </Text>
                    <ToggleSwitch
                        isOn={power != 0}
                        onToggle={handleToggle}
                    />
                </View>
                <View className="flex flex-row justify-between items-center w-full rounded-[10px] overflow-hidden ">
                    <Button
                        className={show === 'level' ? 'bg-[#000]/50' : ''}
                        flex={1}
                        borderRadius={0}
                        onPress={() => {
                            setShow('level')
                        }}
                    >
                        <Text>Level</Text>
                    </Button>
                    <Button
                        className={show === 'humi' ? 'bg-[#000]/50' : ''}
                        flex={1}
                        borderRadius={0}
                        onPress={() => {
                            setShow('humi')
                        }}
                    >
                        <Text>Humi</Text>
                    </Button>
                    <Button
                        className={show === 'timer' ? 'bg-[#000]/50' : ''}
                        flex={1}
                        borderRadius={0}
                        onPress={() => {
                            setShow('timer')
                        }}
                    >
                        <Text>Scheduled</Text>
                    </Button>
                </View>
                {show === 'level'
                    ? (<View className="flex flex-col w-full gap-2 p-2">
                        <View className="flex flex-row w-fit justify-between items-center">
                            <Button
                                className={power == 1 ? 'bg-[#000]/20' : ''}
                                size="$5"
                                height="$4"
                                width="$9"
                                borderRadius="$9"
                                onPress={() => {
                                    handleSetPower(1)
                                }}
                            >
                                <Text>Slow</Text>
                            </Button>
                            <Button
                                className={power == 2 ? 'bg-[#000]/20' : ''}
                                size="$5"
                                height="$4"
                                width="$9"
                                borderRadius="$9"
                                onPress={() => {
                                    handleSetPower(2)
                                }}
                            >
                                <Text>Mid</Text>
                            </Button>
                            <Button
                                className={power == 3 ? 'bg-[#000]/20' : ''}
                                size="$5"
                                height="$4"
                                width="$9"
                                borderRadius="$9"
                                onPress={() => {
                                    handleSetPower(3)
                                }}
                            >
                                <Text>Fast</Text>
                            </Button>
                        </View>
                    </View>
                    )
                    : show === 'humi'
                        ? (<View className="flex flex-col items-start p-3 gap-1">
                            <View className="flex flex-row justify-center items-center w-full h-fit gap-3 ">
                                <Text>Low</Text>
                                <Slider
                                    style={{
                                        width: 200,
                                        height: 20
                                    }}
                                    minimumValue={0}
                                    maximumValue={3}
                                    value={power}
                                    onValueChange={(newValue) => {
                                        handleSetPower(newValue)
                                    }}
                                    // disabled={power == 0}
                                    step={1}
                                ></Slider>
                                <Text>High</Text>
                            </View>
                        </View>
                        )
                        : (
                            <View className="flex flex-col justify-between items-center p-2 w-full">
                                <View className="flex flex-row justify-between items-center w-full">
                                    <Text>Scheduled turn-off</Text>
                                    <Text>
                                        {hour < 10 ? '0'.concat(hour) : hour}:
                                        {minute < 10 ? '0'.concat(minute) : minute}:
                                        {second < 10 ? '0'.concat(second) : second}
                                    </Text>
                                </View>
                                <View className="flex flex-row w-fit h-fit justify-between items-center p-2 gap-1">
                                    <Button
                                        height="$4"
                                        width="$7"
                                        borderRadius="$9"
                                        onPress={() => handleSetTimer(0)}
                                    >
                                        <Text>Off</Text>
                                    </Button>
                                    <Button
                                        height="$4"
                                        width="$4"
                                        borderRadius="$9"
                                        onPress={() => handleSetTimer(60)}
                                    >
                                        <Text>1</Text>
                                    </Button>
                                    <Button
                                        height="$4"
                                        width="$4"
                                        borderRadius="$9"
                                        onPress={() => handleSetTimer(120)}
                                    >
                                        <Text>2</Text>
                                    </Button>
                                    <Button
                                        height="$4"
                                        width="$4"
                                        borderRadius="$9"
                                        onPress={() => handleSetTimer(180)}
                                    >
                                        <Text>3</Text>
                                    </Button>
                                    <Button
                                        height="$4"
                                        width="$4"
                                        borderRadius="$9"
                                        onPress={() => {
                                            setModalVisible(true)
                                        }}
                                    >
                                        <Text>+</Text>
                                    </Button>
                                </View>
                            </View>
                        )}
            </View>
        </ScrollView>
    )
}
export { Fan }
