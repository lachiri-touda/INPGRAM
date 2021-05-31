import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { COLORS, SIZES, FONTS } from "../../constants";

import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import ActionButton from "react-native-action-button";
import AsyncStorage from "@react-native-community/async-storage";

import Icon from "react-native-vector-icons/Ionicons";
import * as icon from "native-base";

import * as ImagePicker from "expo-image-picker";

import { firebaseConfig } from "../../fireBaseConfig";
import uuid from "uuid";

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from "./style/addPostStyle";

import firebase from "firebase";
import { baseURL } from "../../constants";
import { set } from "react-native-reanimated";

console.disableYellowBox = true;

const AddPost = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [caption, setCaption] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    (async () => {
      const Id = await AsyncStorage.getItem("Id");
      setUserId(Id);
    })();
  }, []);

  const uploadFromCamera = () => {
    ImagePicker.launchCameraAsync({
      width: 500,
      height: 500,
      cropping: false,
      allowsEditing: true,
    }).then((image) => {
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(image.uri);
    });
  };

  const uploadFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      width: 500,
      height: 500,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitPost = async () => {
    if (image != null) {
      const imageUrl = await uploadImageAsync();

      axios({
        method: "post",
        url: "/uploadpost",
        baseURL: baseURL,
        data: {
          id: userId,
          urlpost: imageUrl,
          description: caption,
          date: new Date().toISOString(),
        },
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      })
        .then((res) => {
          const message = res.data.message;
          if (res.data.value) {
            Alert.alert(message);
          }
        })
        .catch((err) => console.log(err));
      setImage(null);
      setCaption(null);
      props.navigation.navigate("Profile");
    }
    Alert.alert("Choose Image");
  };

  async function uploadImageAsync() {
    const uri = image;

    setUploading(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    setUploading(false);
    setImage(null);

    return await snapshot.ref.getDownloadURL();
  }

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{ uri: image }} /> : null}

        <InputField
          placeholder="Caption"
          multiline
          numberOfLines={4}
          value={caption}
          onChangeText={(content) => setCaption(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} Completed!</Text>
          </StatusWrapper>
        ) : (
          <TouchableOpacity
            style={{
              height: 50,
              width: 120,
              backgroundColor: "#48bfe3",
              borderRadius: SIZES.radius / 0.2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={submitPost}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>publish</Text>
          </TouchableOpacity>
        )}
      </InputWrapper>
      <ActionButton buttonColor="#f15bb5">
        <ActionButton.Item
          buttonColor="#06d6a0"
          title="Camera"
          onPress={uploadFromCamera}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#118ab2"
          title="Gallery"
          onPress={uploadFromGallery}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPost;

AddPost["navigationOptions"] = {
  tabBarIcon: ({ tintColor }) => (
    //<Icon name="pluscircle" />

    <icon.Icon name="ios-add" style={{ color: tintColor }} />
  ),
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
