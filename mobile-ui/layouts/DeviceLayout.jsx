import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'

function DeviceLayout ({ children, deviceName }) {
    return (
        <SafeAreaView>
            <View className="flex flex-col h-screen w-screen items-center p-8 space-y-10">
                <Text className="text-2xl font-medium mb-10">
                    {deviceName || 'No name'}
                </Text>
                {children}
            </View>
        </SafeAreaView>
    )
}

export { DeviceLayout }
