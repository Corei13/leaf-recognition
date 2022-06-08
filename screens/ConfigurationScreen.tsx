import * as React from "react";
import { Button, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Input } from "react-native-elements";
import { View } from "../components/Themed";

const data = [
  { label: "One & Half", value: "1.5" },
  { label: "Two & Half", value: "2.5" },
  { label: "Three & Half", value: "3.5" },
  { label: "Four and Half", value: "4.5" },
  { label: "Five & Half plus", value: "5.5" },
  { label: "Soft Bungee", value: "sb" },
  { label: "Hard Bungee", value: "hb" },
  { label: "Damaged", value: "x" },
];

const ConfigurationScreen = ({ navigation }) => {
  const [estateName, setEstateName] = React.useState<string>("TEST BUILD");
  const [managerName, setManagerName] = React.useState<string>("TEST BUILD");
  const [type, setType] = React.useState("1.5");
  const [isFocus, setIsFocus] = React.useState(false);
  const [asstManageName, setAsstManagerName] =
    React.useState<string>("TEST BUILD");
  const [slot, setSlot] = React.useState<string>("0");
  const [mode, setMode] = React.useState<string>("single");

  const onSubmitPress = () => {
    navigation.navigate("Cam", {
      estateName,
      managerName,
      asstManageName,
      slot,
      mode,
      type,
    });
  };

  const renderForm = () => {
    if (mode === "single") {
      return (
        <View style={{ paddingBottom: 10 }}>
          <Dropdown
            style={{
              height: 50,
              borderColor: "gray",
              borderWidth: 0.5,
              borderRadius: 8,
              paddingHorizontal: 8,
              padding: 10,
            }}
            placeholderStyle={{
              fontSize: 16,
            }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setType(item.value);
              setIsFocus(false);
            }}
            labelField="label"
            data={data}
          />
        </View>
      );
    } else if (mode === "multiple") {
      return (
        <>
          <Input
            placeholder="Estate Name"
            onChange={(e) => {
              setEstateName(e.nativeEvent.text);
            }}
          />
          <Input
            placeholder="Manager Name"
            onChange={(e) => {
              setManagerName(e.nativeEvent.text);
            }}
          />
          <Input
            placeholder="Asst. Manager Name"
            onChange={(e) => {
              setAsstManagerName(e.nativeEvent.text);
            }}
          />
          <Input
            placeholder="Slot"
            keyboardType="numeric"
            onChange={(e) => {
              setSlot(e.nativeEvent.text);
            }}
          />
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "center",
        }}
      >
        <Button
          color={`${mode === "single" ? "#0d865d" : "#2D5A27"} `}
          title="  Single  "
          onPress={() => setMode("single")}
        ></Button>
        <View style={{ width: 10 }}></View>
        <Button
          color={`${mode === "multiple" ? "#0d865d" : "#2D5A27"} `}
          title="Multiple"
          onPress={() => setMode("multiple")}
        ></Button>
      </View>
      {renderForm()}
      <Button
        title="Submit"
        disabled={
          estateName.trim().length < 1 ||
          managerName.trim().length < 1 ||
          asstManageName.trim().length < 1 ||
          slot.trim().length < 1
            ? true
            : false
        }
        buttonStyle={{ backgroundColor: "#2D5A27" }}
        onPress={() => onSubmitPress()}
      />
    </View>
  );
};

export default ConfigurationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "black",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "black",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    backgroundColor: "black",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "grey",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
