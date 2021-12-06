import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { View } from "../components/Themed";

const ConfigurationScreen = ({ navigation }) => {
  const onSubmitPress = () => {
    navigation.navigate("Cam");
  };
  return (
    <View style={styles.container}>
      <Input placeholder="Estate Name" />
      <Input placeholder="Manager Name" />
      <Input placeholder="Asst. Manager Name" />
      <Input placeholder="Slot" keyboardType="numeric" />

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
