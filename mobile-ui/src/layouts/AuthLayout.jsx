import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function AuthLayout({ children, title, description }) {
    return (
        <ImageBackground
            source={require("../assets/Rectangle.png")}
            resizeMethod="auto"
            className="w-full h-full"
        >
            <SafeAreaView>
                <View className="h-screen w-screen flex flex-col items-center space-y-10">
                    <Text className="text-3xl mt-5 font-bold">
                        {title || "Authentication"}
                    </Text>
                    <Text className="mt-4 text-base">
                        {description || "Log in / Sign up screen"}
                    </Text>
                    <View className="h-[65%] w-[80%] flex flex-col space-y-5">
                        {children}
                    </View>
                    <View>
                        <Text>Hello world</Text>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export { AuthLayout };
