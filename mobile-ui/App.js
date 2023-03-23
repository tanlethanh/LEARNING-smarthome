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
import { HTTPClient, MQTTClient } from "./adafruitJS/client";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();
// console.log(Config)



export default function App() {
    // useEffect(() => {
    //     async function test() {
    //         try {
    //             const username = "soviteam";
    //             const key = "aio_qPwH91lNCZIj3AYLWkm5PJVQoora";

    //             const httpClient = new HTTPClient(username, key);

    //             const mqttClient = new MQTTClient(username, key);

    //             const feeds = await httpClient.Feeds.getFeeds();
    //             const feedData = await httpClient.Feeds.getFeedById(
    //                 feeds[0].id
    //             );
    //             const resFeed = await httpClient.Feeds.createData(
    //                 feeds[0].id,
    //                 100
    //             );
    //             console.log(resFeed);

    //             // Remember to put this line into try catch block
    //             const conn = await mqttClient.connect();
    //             console.log(conn);
    //             console.log("started");

    //             mqttClient.subcribeFeed(feeds[0].id);

    //             mqttClient.onMessage((message) => {
    //                 console.log(message);
    //             });

    //             const res = mqttClient.publish(feeds[0].id, 99);
    //             console.log(res);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     test();
    // }, []);
    return (
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
    );
}
