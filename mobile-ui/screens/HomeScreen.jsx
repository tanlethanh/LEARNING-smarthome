import { Button, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SheetDemo } from '../components/elements/BottomSheet'
import { StatusBar } from 'expo-status-bar'
import { ToastDemo } from '../components/elements/Toast'
import BottomBar from '../components/BottomBar'

function HomeScreen ({ navigation }) {
    return (
        <SafeAreaView className="flex-1 bg-green-500">
            <ScrollView>
                <View className="flex items-center justify-center bg-slate-500">
                    <Text className="text-white">Hello world</Text>
                    <StatusBar style="auto" />
                    <Button
                        title="Go to Details"
                        onPress={() => navigation.navigate('Details')}
                    />
                    <Button
                        title="Go to Devices"
                        onPress={() => navigation.navigate('Device')}
                    />
                    <SheetDemo></SheetDemo>
                    <ToastDemo></ToastDemo>
                    <Text>Hello world 2</Text>
                </View>
            </ScrollView>
            <BottomBar></BottomBar>

        </SafeAreaView>
    )
}

export { HomeScreen }
