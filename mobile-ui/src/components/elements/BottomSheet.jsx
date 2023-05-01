import { Button, H1, H2, Input, Paragraph, Text, XStack } from "tamagui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Text as RNText, View } from "react-native";
import { Sheet } from "@tamagui/sheet";
import { useState } from "react";

export const SheetDemo = ({ children, openSheet, overlay = true }) => {
    const [position, setPosition] = useState(0);
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [innerOpen, setInnerOpen] = useState(false);

    return (
        <>
            <XStack space>
                <Button onPress={() => setOpen(true)}>Open</Button>
                <Button onPress={() => setModal((x) => !x)}>
                    {modal ? "Type: Modal" : "Type: Inline"}
                </Button>
            </XStack>

            <Sheet
                forceRemoveScrollEnabled={open}
                modal={modal}
                open={open}
                onOpenChange={setOpen}
                snapPoints={[60, 40, 20]}
                dismissOnSnapToBottom
                position={position}
                onPositionChange={setPosition}
                zIndex={100_000}
                animation="bouncy" // for the css driver
            >
                {overlay && <Sheet.Overlay />}
                <Sheet.Handle />
                <Sheet.Frame f={1} p="$4" jc="center" ai="center" space="$5">
                    {!children ? (
                        <View className="border border-slate-200 h-full w-full">
                            <Button
                                size="$3"
                                circular
                                icon={ChevronDown}
                                onPress={() => setOpen(false)}
                            />
                            <Input w={200} />
                            <View>
                                <Text>Hello world</Text>
                            </View>
                            {modal ? (
                                <>
                                    <InnerSheet
                                        open={innerOpen}
                                        onOpenChange={setInnerOpen}
                                    />
                                    <Button
                                        size="$6"
                                        circular
                                        icon={ChevronUp}
                                        onPress={() => setInnerOpen(true)}
                                    ></Button>
                                </>
                            ) : null}
                        </View>
                    ) : (
                        <View className="border border-slate-200 h-full w-full">
                            {children}
                        </View>
                    )}
                </Sheet.Frame>
            </Sheet>
        </>
    );
};

function InnerSheet(props) {
    const setDate = (event, date) => {
        console.log(date);
        const {
            type,
            nativeEvent: { timestamp },
        } = event;
    };

    //  New version
    const [date, setDate2] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate2(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        console.log("Here");
        showMode("time");
    };

    return (
        <Sheet modal snapPoints={[90]} dismissOnSnapToBottom {...props}>
            <Sheet.Overlay />
            <Sheet.Handle />
            <Sheet.Frame f={1} jc="center" ai="center" space="$5">
                <Sheet.ScrollView p="$4" space>
                    <Button
                        size="$8"
                        circular
                        als="center"
                        icon={ChevronDown}
                        onPress={() => props.onOpenChange?.(false)}
                    />
                    <H1>Hello world</H1>
                    <H2>You can scroll me</H2>
                    {/* <RNDateTimePicker
                        onChange={setDate}
                        value={new Date()}
                        mode='time'
                    /> */}
                    <View>
                        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
                        <Button
                            onPress={() => {
                                showDatepicker();
                            }}
                            title="Show time picker!"
                        >
                            Time
                        </Button>
                        <Text>selected: {date.toLocaleString()}</Text>
                    </View>
                    {[1, 2, 3].map((i) => (
                        <Paragraph key={i} size="$10">
                            Eu officia sunt ipsum nisi dolore labore est laborum
                            laborum in esse ad pariatur. Dolor excepteur esse
                            deserunt voluptate labore ea. Exercitation ipsum
                            deserunt occaecat cupidatat consequat est
                            adipisicing velit cupidatat ullamco veniam aliquip
                            reprehenderit officia. Officia labore culpa ullamco
                            velit. In sit occaecat velit ipsum fugiat esse
                            aliqua dolor sint.
                        </Paragraph>
                    ))}
                </Sheet.ScrollView>
            </Sheet.Frame>
        </Sheet>
    );
}
