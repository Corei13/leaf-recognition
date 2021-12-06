import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const list = [
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
  {
    name: "01 January 21",
    subtitle: "Habibur State, slot 02",
  },
];

const AllResults = ({ navigation }) => {
  const handleOnListItemPress = (i: number) => {
    console.log("click");
    navigation.navigate("Result");
  };

  return (
    <ScrollView>
      {list.map((l, i) => (
        <ListItem key={i} onPress={() => handleOnListItemPress(i)}>
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default AllResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "red",
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
