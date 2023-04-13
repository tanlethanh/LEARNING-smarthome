import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";
import BottomBar from "../components/BottomBar";

function MainLayout({ children, withScrollView = true }) {
    return (
        <SafeAreaView className="flex-1 bg-[#EFF1F5]">
            {withScrollView ? (
                <ScrollView className="min-h-screen">{children}</ScrollView>
            ) : (
                children
            )}
            <BottomBar></BottomBar>
        </SafeAreaView>
    );
}

export { MainLayout };
