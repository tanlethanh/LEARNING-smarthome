import { Button, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SheetDemo } from '../components/elements/BottomSheet'
import { StatusBar } from 'expo-status-bar'
import { ToastDemo } from '../components/elements/Toast'
import BottomBar from '../components/BottomBar'

function MainLayout ({ children }) {
    return (
        <SafeAreaView className="flex-1 bg-[#EFF1F5]">
            <ScrollView>
                {children}
            </ScrollView>
            <BottomBar></BottomBar>

        </SafeAreaView>
    )
}

export { MainLayout }
