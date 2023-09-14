import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Button, Divider, Snackbar, Text, TextInput } from "react-native-paper";
import { elements } from "../constants/Elements";

export default function Container() {
    const [visible, setVisible] = useState(false);
    const [elementName, setElementName] = useState("");
    const [elementMultiplier, setElementMultiplier] = useState(1);

    const [elementInfo, setElementInfo] = useState();

    const searchElement = () => {
        const element = elements.find((o) => o.symbol === elementName);

        if (element == undefined) {
            setVisible(true);
            return;
        }

        setElementInfo(element);

        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            {elementInfo == undefined ? (
                <></>
            ) : (
                <View style={{ alignItems: "center" }}>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Text variant="displayLarge">{elementInfo.symbol}</Text>
                        <View style={{ marginLeft: 20 }}>
                            <Text>
                                {elementInfo.number} {elementInfo.name}
                            </Text>
                            <Text>
                                Группа: {elementInfo.group} | Период: {elementInfo.period}
                            </Text>
                            <Text>
                                Атомная масса: {( elementInfo.atomic_mass * Number(elementMultiplier)).toFixed(4)}
                            </Text>
                        </View>
                    </View>
                    <Divider
                        style={{ width: 200, height: 1, marginVertical: 10 }}
                    />

                    <Text variant="labelLarge">Физические данные</Text>
                    <Text>Категория: {elementInfo.category}</Text>
                    <Text>Вид: {elementInfo.appearance}</Text>
                    <Text>
                        Плотность:{" "}
                        {Math.round(elementInfo.density * 1000) / 1000} кг/м3
                    </Text>
                    <Text>
                        Кипение: {Math.round(elementInfo.boil * 1000) / 1000} K
                        /{" "}
                        {Math.round((elementInfo.boil - 273.15) * 1000) / 1000}{" "}
                        °C
                    </Text>
                    <Text>
                        Плавление: {Math.round(elementInfo.melt * 1000) / 1000}{" "}
                        K /{" "}
                        {Math.round((elementInfo.melt - 273.15) * 1000) / 1000}{" "}
                        °C
                    </Text>

                    <Divider
                        style={{ width: 200, height: 1, marginVertical: 10 }}
                    />

                    <Text variant="labelLarge">Электронная конфигурация</Text>
                    <Text>{elementInfo.electron_configuration_semantic}</Text>
                    <Text>{elementInfo.electron_configuration}</Text>
                </View>
            )}

            <Divider
                style={{
                    width: "90%",
                    height: 1,
                    marginTop: 40,
                    marginBottom: 10,
                }}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginHorizontal: 15 }} variant="labelLarge">
                    Введите название элемента:
                </Text>
                <TextInput
                    mode="outlined"
                    value={elementName}
                    onChangeText={setElementName}
                    placeholder="Au"
                    onSubmitEditing={searchElement}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginHorizontal: 15 }} variant="labelLarge">
                    Введите множитель массы:
                </Text>
                <TextInput
                    mode="outlined"
                    style={{ marginLeft: 6 }}
                    value={elementMultiplier}
                    onChangeText={setElementMultiplier}
                    onSubmitEditing={searchElement}
                    defaultValue={"1"}
                />
            </View>
            <Button
                icon="magnify"
                mode="contained"
                disabled={elementName == ""}
                onPress={searchElement}
                style={{ marginTop: 10 }}
            >
                Поиск
            </Button>
            <View style={{marginBottom: 80}}/>
            <StatusBar style="auto" />
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                action={{
                    label: "Скрыть",
                    onPress: () => {
                        setVisible(false);
                    },
                }}
            >
                Не найдено элемента с таким названием
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
