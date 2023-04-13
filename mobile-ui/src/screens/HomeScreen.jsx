import { Button, Text, View } from "react-native";
import { MainLayout } from "../layouts/MainLayout";
import { SheetDemo } from "../components/elements/BottomSheet";
import { StatusBar } from "expo-status-bar";
import { ToastDemo } from "../components/elements/Toast";

function HomeScreen({ navigation }) {
    return (
        <MainLayout>
            <View className="flex items-center justify-center bg-slate-500">
                <Text className="text-white">Hello world</Text>
                <StatusBar style="auto" />
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate("Details")}
                />
                <Button
                    title="Go to Devices"
                    onPress={() => navigation.navigate("Device")}
                />
                <SheetDemo></SheetDemo>
                <ToastDemo></ToastDemo>
                <Text>Hello world 2</Text>
            </View>
        </MainLayout>
    );
}

export { HomeScreen };
