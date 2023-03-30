import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

function HomeScreen ({ navigation }) {
    return (
        <SafeAreaView>
            <View className="flex items-center justify-center bg-slate-500 w-full h-full">
                <Text className="text-white">Hello</Text>
                <StatusBar style="auto" />
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
                <Button
                    title="Go to Devices"
                    onPress={() => navigation.navigate('Device')}
                />
            </View>
        </SafeAreaView>
    )
}

export { HomeScreen }
