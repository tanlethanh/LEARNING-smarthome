import { Button, Dimensions, Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { LineChart } from "react-native-chart-kit";
import { httpClient } from "../states";
import { useEffect, useState } from "react";

export function Chart({ devicekey, title }) {
    const [date, setDate2] = useState(new Date());

    const end = new Date(date);

    const start = new Date(date);

    const [data1, setData1] = useState({
        labels: [
            "1:00",
            "3:00",
            "5:00",
            "6:00",
            "9:00",
            "11:00",
            "13:00",
            "15:00",
            "17:00",
            "19:00",
            "21:00",
            "23:00",
        ],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                color: (opacity = 1) => `rgba(51, 51, 204, ${opacity})`, // optional
                strokeWidth: 2, // optional
            },
        ],
        legend: [title], // optional
    });

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#eff1f5",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#eff1f5",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(132, 132, 235, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };

    useEffect(() => {
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
        end.setMilliseconds(0);
    });

    useEffect(() => {
        httpClient.Feeds.getChartData(devicekey, start, end).then((res) => {
            const dat = JSON.parse(JSON.stringify(data1));
            dat.datasets[0].data.forEach((ele, index, arr) => (arr[index] = 0));
            console.log(res);
            res.data.forEach((ele) => {
                const temp = new Date(ele[0]);
                dat.datasets[0].data[temp.getUTCHours() / 2] = parseInt(
                    ele[1],
                    10,
                );
            });
            setData1(dat);
        });
    }, [date]);

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

    return (
        <View className="flex flex-col items-center justify-center gap-1 bg-transparent">
            <LineChart
                data={data1}
                width={screenWidth}
                height={290}
                verticalLabelRotation={90}
                chartConfig={chartConfig}
                bezier
            />
            <Text>{date.toDateString()}</Text>
            <Button
                onPress={() => {
                    showDatepicker();
                }}
                title="Pick date"
                backgroundColor={"#cccccc"}
            >
                Date
            </Button>
        </View>
    );
}
