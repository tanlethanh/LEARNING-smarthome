import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";
import BottomBar from "../components/BottomBar";

function MainLayout({ children }) {
    return (
        <SafeAreaView className="flex-1 bg-[#EFF1F5]">
            <BottomBar></BottomBar>
            <ScrollView className="min-h-screen">{children}</ScrollView>
        </SafeAreaView>
    );
}

export { MainLayout };
