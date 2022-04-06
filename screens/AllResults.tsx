import Airtable from "airtable";
import moment from "moment";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

const base = new Airtable({ apiKey: "keysdvFSVMD8PvvPE" }).base(
  "appb7gS3ne4YyBIf4"
);

const AllResults = ({ navigation }) => {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    base("results")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        console.log(records.map((record) => record.fields));
        setList(records.map((record) => record.fields));
        setLoading(false);
        fetchNextPage();
      });
    base("updates")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        fetchNextPage();
      });
  }, []);

  const handleOnListItemPress = (item: any) => {
    console.log("click");
    navigation.navigate("Result", item);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView>
        {list.map((item, i) => (
          <ListItem key={i} onPress={() => handleOnListItemPress(item)}>
            <ListItem.Content>
              <ListItem.Title>
                {moment(item.Created).format("MMMM Do YYYY, h:mm:ss a")}
              </ListItem.Title>
              <ListItem.Subtitle>{item.estate_name}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ScrollView>
    );
  }
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
