import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    HomeScreen,
    DetailsScreen,
    LoginScreen,
    DeviceScreen,
    SignUpScreen
} from "./screens";
import { Logs } from "expo";
import { useEffect } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import initAllDevice from "./reducer";

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        initAllDevice();
    }, []);    
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="DeviceScreen"
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="DeviceScreen" component={DeviceScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
