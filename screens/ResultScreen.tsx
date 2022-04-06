import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import moment from "moment";
import * as React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Badge, Card, Image, Text } from "react-native-elements";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAysUbQfB-e1_1tLbFbSJY3n5HUvncFdJw",
  authDomain: "tea-leaf-86440.firebaseapp.com",
  projectId: "tea-leaf-86440",
  storageBucket: "tea-leaf-86440.appspot.com", //gs://tea-leaf-86440.appspot.com
  messagingSenderId: "66787787137",
  appId: "1:66787787137:web:44454aa28863b54902e880",
  measurementId: "G-2ZEY295EN6",
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
    type1,
    value1,
    type2,
    value2,
    type3,
    value3,
  } = route.params;

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
    <View style={styles.container}>
      {imageUrl !== undefined ? (
        <Image
          placeholderStyle={{}}
          transitionDuration={1000}
          source={{
            uri: imageUrl,
          }}
          style={{ height: 300, width: Dimensions.get("window").width }}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <View style={styles.container}>
        <View style={{ paddingBottom: 10 }}>
          <Card>
            <Text style={{ textAlign: "center" }}>
              Estate Name: {estate_name}
            </Text>
            <Text style={{ textAlign: "center" }}>
              Manager Name: {manager_name}
            </Text>
            <Text style={{ textAlign: "center" }}>
              Asst. Manage Name: {asst_manage_name}
            </Text>
            <Text style={{ textAlign: "center" }}>Slot: {slot}</Text>
            <Text style={{ textAlign: "center" }}>
              Created: {moment(Created).format("MMMM Do YYYY, h:mm:ss a")}
            </Text>
          </Card>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Badge
            badgeStyle={{ width: 200, height: 50 }}
            containerStyle={{}}
            status="success"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={`${type1} : ${value1}`}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Badge
            badgeStyle={{ width: 200, height: 50 }}
            containerStyle={{}}
            status="warning"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={`${type2} : ${value2}`}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Badge
            badgeStyle={{ width: 200, height: 50 }}
            containerStyle={{}}
            status="error"
            textProps={{}}
            textStyle={{ color: "black" }}
            value={`${type3} : ${value3}`}
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
