import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SheetDemo } from '../components/elements/BottomSheet'
import { StatusBar } from 'expo-status-bar'
import { ToastDemo } from '../components/elements/Toast'

function HomeScreen ({ navigation }) {
    return (
        <SafeAreaView>
            <View className="flex items-center justify-center bg-slate-500 w-full h-full">
                <Text className="text-white">Hello world</Text>
                <StatusBar style="auto" />
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
                <Button
                    title="Go to Devices"
                    onPress={() => navigation.navigate('Devices')}
                />
                <SheetDemo></SheetDemo>
                <ToastDemo></ToastDemo>
                <Text>Hello world</Text>
            </View>

        </SafeAreaView>
    )
}

export { HomeScreen }
