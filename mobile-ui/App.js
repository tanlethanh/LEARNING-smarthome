/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
import {
    DetailsScreen,
    DeviceScreen,
    HomeScreen,
    LoginScreen,
    SignUpScreen
} from './screens'
import { Logs } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { TamaguiProvider, Theme, ToastProvider } from 'tamagui'
import { Text, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { store } from './store'

import { FullLoading } from './components/elements/FullLoading'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import config from './tamagui.config'
import initAllDevice from './devices'

const Stack = createNativeStackNavigator()

Logs.enableExpoCliLogging()

export default function App () {
    const colorScheme = useColorScheme()

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
    })

    useEffect(() => {
        initAllDevice()
    }, [])

    return (
        loaded
            ? <TamaguiProvider config={config}>
                <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
                    <ToastProvider>
                        <Provider store={store}>
                            <NavigationContainer>
                                <Stack.Navigator
                                    initialRouteName="Home"
                                    screenOptions={{
                                        headerShown: false
                                    }}
                                >
                                    <Stack.Screen name="Home" component={HomeScreen} />
                                    <Stack.Screen
                                        name="Details"
                                        component={DetailsScreen}
                                    />
                                    <Stack.Screen
                                        name="Login"
                                        component={LoginScreen}
                                    />
                                    <Stack.Screen
                                        name="SignUp"
                                        component={SignUpScreen}
                                    />
                                    <Stack.Screen
                                        name="DeviceScreen"
                                        component={DeviceScreen}
                                    />
                                </Stack.Navigator>
                            </NavigationContainer>
                        </Provider>
                    </ToastProvider>
                </Theme>
            </TamaguiProvider>
            : <FullLoading></FullLoading>
    )
}
