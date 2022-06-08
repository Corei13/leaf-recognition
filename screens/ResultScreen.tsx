import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import moment from "moment";
import * as React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Badge, Card, Image, Text } from "react-native-elements";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC6M4sKRJ4fyZP0WNZsbD7Ulhme12EWU-U",
  authDomain: "aracadia-leaf-analysis.firebaseapp.com",
  projectId: "aracadia-leaf-analysis",
  storageBucket: "aracadia-leaf-analysis.appspot.com",
  messagingSenderId: "23868285272",
  appId: "1:23868285272:web:ddd7ed1d70a0cd6a5a452d",
  measurementId: "G-C03J3B6B03",
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

// const storageRef = ref(storage);

const ResultScreen = ({ route }) => {
  const [imageUrl, setImageUrl] = React.useState(undefined);
  const {
    Created,
    asst_manage_name,
    estate_name,
    manager_name,
    slot,
    img_url,
    resultArr,
  } = route.params;

  const calculateResultSummery = (resultArr: any, type: any) => {
    console.log(resultArr, "resultArr");
    let sum = 0;
    let totalSum = 0;
    resultArr.forEach((res: any, index: any) => {
      sum = sum + res[1.5];
      Object.entries(res).forEach(([key, value]) => {
        console.log(value);
        totalSum = totalSum + value;
        if (key === type) {
          sum = sum + value;
        }
      });
    });

    return parseInt((sum / totalSum) * 100);
  };

  React.useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, img_url))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        setImageUrl(url);
        console.log(url);
      })
      .catch((error) => {
        console.log(error);
        // fail silently
      });
  }, []);

  return (
    <View>
      {imageUrl !== undefined ? (
        <Image
          placeholderStyle={{}}
          transitionDuration={1000}
          source={{
            uri: imageUrl,
          }}
          style={{ height: 220, width: Dimensions.get("window").width }}
        />
      ) : (
        <View>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}

      <View>
        <View style={{ paddingBottom: 5 }}>
          <Card>
            <Text style={{ textAlign: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Estate Name:</Text>{" "}
              {estate_name}
            </Text>
            <Text style={{ textAlign: "center" }}>
              <Text style={{ fontWeight: "bold" }}> Manager Name:</Text>{" "}
              {manager_name}
            </Text>
            <Text style={{ textAlign: "center" }}>
              <Text style={{ fontWeight: "bold" }}> Asst. Manage Name:</Text>{" "}
              {asst_manage_name}
            </Text>
            <Text style={{ textAlign: "center" }}>
              <Text style={{ fontWeight: "bold" }}> Slot: </Text>
              {slot}
            </Text>
            <Text style={{ textAlign: "center" }}>
              <Text style={{ fontWeight: "bold" }}> Created: </Text>
              {moment(Created).format("MMMM Do YYYY, h:mm:ss a")}
            </Text>
          </Card>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 30 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={"One and Half : " + calculateResultSummery(resultArr, "1.5")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 30 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={"Two and Half : " + calculateResultSummery(resultArr, "2.5")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 30 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={
              "Three and Half : " + calculateResultSummery(resultArr, "3.5")
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 30 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={
              "Four and Half : " + calculateResultSummery(resultArr, "4.5")
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 30 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={"Five and Half :" + calculateResultSummery(resultArr, "5.5")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 30 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={"Soft Bungee : " + calculateResultSummery(resultArr, "sb")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 30 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={"Hard Bungee : " + calculateResultSummery(resultArr, "hb")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 5,
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 30 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={"Damaged : " + calculateResultSummery(resultArr, "x")}
          />
        </View>
      </View>
    </View>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
