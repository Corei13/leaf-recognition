import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Badge, Image, ListItem } from "react-native-elements";
import { View } from "../components/Themed";
import { getResult } from "../utils/actions";

const ResultScreen = (props: any) => {
  const list = getResult(props);
  return (
    <ScrollView>
      {list.map((l, i) => (
        <ListItem key={i}>
          <Image
            source={{ uri: "https://bulma.io/images/placeholders/256x256.png" }}
            style={{ width: 150, height: 150 }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ color: "#2D5A27", fontWeight: "bold" }}>
              {l.name}
            </ListItem.Title>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Badge status="success" />
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default ResultScreen;

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
  avatar: {
    width: "100%",
  },
});
