import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { View } from "../components/Themed";

const ConfigurationScreen = ({ navigation }) => {
  const [estateName, setEstateName] = React.useState<string>();
  const [managerName, setManagerName] = React.useState<string>();
  const [asstManageName, setAsstManagerName] = React.useState<string>();
  const [slot, setSlot] = React.useState<string>();
  
  const onSubmitPress = () => {
    navigation.navigate("Cam", {
      estateName,
      managerName,
      asstManageName,
      slot,
    });
  };
  return (
    <View style={styles.container}>
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

      <Button
        title="Submit"
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
    alignItems: "center",
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
});
