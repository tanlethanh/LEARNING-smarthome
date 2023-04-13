import { SafeAreaView } from "react-native-safe-area-context";
import Device from "../components/device";

function DeviceSetting({ navigation }) {
    return (
        <SafeAreaView>
            <Device device={"Fan"}></Device>
        </SafeAreaView>
    );
}

export { DeviceSetting };
