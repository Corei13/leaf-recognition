import Airtable from "airtable";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import moment from "moment";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

const base = new Airtable({ apiKey: "keysdvFSVMD8PvvPE" }).base(
  "appb7gS3ne4YyBIf4"
);
const firebaseConfig = {
  apiKey: "AIzaSyC6M4sKRJ4fyZP0WNZsbD7Ulhme12EWU-U",
  authDomain: "aracadia-leaf-analysis.firebaseapp.com",
  projectId: "aracadia-leaf-analysis",
  storageBucket: "aracadia-leaf-analysis.appspot.com",
  messagingSenderId: "23868285272",
  appId: "1:23868285272:web:ddd7ed1d70a0cd6a5a452d",
  measurementId: "G-C03J3B6B03",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AllResults = ({ navigation }) => {
  const [list, setList] = React.useState<object[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchResult = async () => {
    setLoading(true);
    const colls = collection(db, "results");
    const resultSnapshot = await getDocs(colls);
    const results = resultSnapshot.docs.map((doc) => doc.data());
    setList(results);
    console.log(results);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchResult();
  }, []);

  const handleOnListItemPress = (item: any) => {
    console.log(item, "item");
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
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  } else {
    return (
      <ScrollView>
        {list.reverse().map((item, i) => (
          <ListItem key={i} onPress={() => handleOnListItemPress(item)}>
            <ListItem.Content>
              <ListItem.Title>
                {i + 1} :{" "}
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
