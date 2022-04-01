import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import moment from "moment";
import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
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
    analyzed_results,
    asst_manage_name,
    estate_name,
    manager_name,
    slot,
  } = route.params;
  console.log(Array.from(route.params.analyzed_results));
  React.useEffect(() => {
    const storage = getStorage();
    getDownloadURL(
      ref(
        storage,
        "https://storage.googleapis.com/tea-leaf-86440.appspot.com//home/shakil/recruits/p-tea/leaf-recognition-api/temp/277519537_5568072976540766_4263385999536309196_n.jpg"
      )
    )
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        console.log(url);
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });

    // const starsRef = ref(
    //   storage,
    //   "277519537_5568072976540766_4263385999536309196_n.jpg"
    // );
    // getDownloadURL(
    //   ref(storage, "temp/277519537_5568072976540766_4263385999536309196_n.jpg")
    // )
    //   .then((url) => {
    //     console.log(url);
    //     // Insert url into an <img> tag to "download"
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        placeholderStyle={{}}
        transitionDuration={1000}
        source={{
          uri: "https://storage.googleapis.com/tea-leaf-86440.appspot.com//home/shakil/recruits/p-tea/leaf-recognition-api/temp/277519537_5568072976540766_4263385999536309196_n.jpg",
        }}
        style={{ height: 200, width: Dimensions.get("window").width }}
      />

      <View style={styles.container}>
        <View style={{ paddingBottom: 10 }}>
          <Card>
            <Text>Estate Name: {estate_name}</Text>
            <Text>Manager Name: {manager_name}</Text>
            <Text>Asst. Manage Name: {asst_manage_name}</Text>
            <Text>Slot: {slot}</Text>
            <Text>
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
            value="Two & Half : 8.5"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Badge
            badgeStyle={{ width: 200, height: 50 }}
            containerStyle={{}}
            status="warning"
            textProps={{}}
            textStyle={{ color: "black" }}
            value="four & Half : 4.5"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Badge
            badgeStyle={{ width: 200, height: 50 }}
            containerStyle={{}}
            status="error"
            textProps={{}}
            textStyle={{ color: "black" }}
            value="Seven & Half : 0.5"
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
