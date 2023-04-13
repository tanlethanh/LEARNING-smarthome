import {
    BanknotesIcon as BanknotesIconOutline,
    ChevronLeftIcon as ChevronLeftIconOutline,
    ChevronRightIcon as ChevronRightIconOutline,
} from "react-native-heroicons/outline";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View className="border-t px-2 py-2 flex flex-row justify-center items-center">
            <ChevronLeftIconOutline color={"black"} size={16} />
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({
                                name: route.name,
                                merge: true,
                            });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={
                                options.tabBarAccessibilityLabel
                            }
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            className="flex flex-col justify-center items-center h-12 w-20 ml-2"
                        >
                            <BanknotesIconOutline
                                size={30}
                                className="text-black"
                                style={{
                                    color: isFocused ? "#673ab7" : "#222",
                                }}
                            />
                            <Text
                                style={{
                                    color: isFocused ? "#673ab7" : "#222",
                                }}
                            >
                                {label.substring(0, 10)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            <ChevronRightIconOutline color={"black"} size={16} />
        </View>
    );
}
