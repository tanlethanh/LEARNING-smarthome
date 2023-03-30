import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

function DetailsScreen ({ navigation }) {
    return (
        <SafeAreaView>
            <View className="flex items-center justify-center bg-slate-500 w-full h-full">
                <Text className="text-white">Details</Text>
                <StatusBar style="auto" />
                <Button
                    title="Go to Home"
                    onPress={() => navigation.navigate('Home')}
                />
                <Button
                    title="Go to Details... again"
                    onPress={() => navigation.push('Details')}
                />
            </View>
        </SafeAreaView>
    )
}

export { DetailsScreen }
