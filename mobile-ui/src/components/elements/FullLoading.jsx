import { View } from "react-native";
import Lottie from "lottie-react-native";

// export default function Animation () {
//     return (
//         <Lottie source={require('../path/to/animation.json')} autoPlay loop />
//     )
// }

export const FullLoading = () => {
    return (
        <View className="h-screen w-screen flex flex-col justify-center items-center">
            <Lottie
                source={require("../../assets/smart-home.json")}
                autoPlay
                loop
                w={40}
                h={40}
            />
        </View>
    );
};
