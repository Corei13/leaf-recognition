import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  View,
} from "react-native";

const SERVER_URL = "http://192.168.0.126:6000";

const App = ({ route, navigation }) => {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [loading, setLoading] = useState(false);

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  };

  const handleUploadPhoto = () => {
    setLoading(true);
    const { asstManageName, estateName, managerName, slot } = route.params;
    const uriParts = pickedImagePath.split(".");
    const fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();

    formData.append("photo", {
      uri: pickedImagePath,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    formData.append("asst_manage_name", asstManageName);
    formData.append("estate_name", estateName);
    formData.append("manager_name", managerName);
    formData.append("slot", slot);

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
          navigation.navigate("Result", response.data);
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
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <Button onPress={showImagePicker} title="Select an image" />
            <Button onPress={openCamera} title="Open camera" />
          </View>
          <View style={styles.imageContainer}>
            {pickedImagePath !== "" && (
              <Image source={{ uri: pickedImagePath }} style={styles.image} />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleUploadPhoto} title="Analyze" />
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
    height: 300,
    resizeMode: "cover",
  },
});
