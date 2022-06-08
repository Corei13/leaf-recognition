import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  View,
} from "react-native";

const SERVER_URL = "https://tea-backup-hf2pexin3a-em.a.run.app";
// const SERVER_URL = "https://localhost:5000";
const App = ({ route, navigation }) => {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    console.log(result, "image result");

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setImageWidth(result.width);
      setImageHeight(result.height);
      console.log(result);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  };

  const handleUploadPhoto = () => {
    setLoading(true);
    const { asstManageName, estateName, managerName, slot, mode, type } =
      route.params;
    const uriParts = pickedImagePath.split(".");
    const fileType = uriParts[uriParts.length - 1];
    console.log(uriParts, "~~~>");
    let formData = new FormData();

    formData.append("photo", {
      uri: pickedImagePath,
      name: `${String(new Date())}.${fileType}`,
      type: `image/${fileType}`,
    });

    formData.append("asst_manage_name", asstManageName);
    formData.append("estate_name", estateName);
    formData.append("manager_name", managerName);
    formData.append("slot", slot);
    formData.append("mode", mode);
    formData.append("type", type);

    let options = {
      method: "POST",
      body: formData,
    };

    fetch(`${SERVER_URL}/analyze`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        if (response) {
          setLoading(false);
          if (mode === "multiple") {
            navigation.navigate("Result", response.data);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <Button
              color="#2D5A27"
              onPress={showImagePicker}
              title="Select an image"
            />
            <Button color="#2D5A27" onPress={openCamera} title="Open camera" />
          </View>
          <View style={styles.imageContainer}>
            {pickedImagePath !== "" && (
              <Image
                source={{ uri: pickedImagePath }}
                style={{
                  width: 500,
                  height: 500,
                  resizeMode: "contain",
                }}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color="#2D5A27"
              onPress={handleUploadPhoto}
              title="Analyze"
              disabled={pickedImagePath.trim().length < 1 ? true : false}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 500,
    resizeMode: "cover",
  },
});
