import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";

import { connect } from "react-redux";
import ActionButton from "react-native-action-button";
import AsyncStorage from "@react-native-community/async-storage";

import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

import { firebaseConfig } from "../../fireBaseConfig";
import uuid from "uuid";
console.disableYellowBox = true;

import {
  AddImageProfile,
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from "./style/addPostStyle";

import firebase from "firebase";
import { baseURL } from "../../constants";

const EditPic = (props) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [caption, setCaption] = useState(null);
  const [userId, setUserId] = useState("");

  const didMountRef = useRef(false);

  useEffect(() => {
    setImage(props.postdata.urlpost);
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
    if (didMountRef.current) {
      // if login success, go to home screen
      if (props.isModified) {
        props.navigation.navigate("Profile");
      }
    } else {
      didMountRef.current = true;
    }
  }, [props.isModified]);

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
    const imageUrl = await uploadImageAsync();

    axios({
      method: "post",
      url: "/uploadprofilephoto",
      baseURL: baseURL,
      data: {
        id: props.postdata.userid,
        url: imageUrl,
      },
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    })
      .then((res) => {
        const message = res.data.message;
        if (message === "POST UPLOADED") {
          //dispatch(uploadSuccess(Data));
          Alert.alert("Image uploaded!");
        } else {
          // dispatch(uploadFailure(message));
          Alert.alert("Image is not uploaded!");
        }
      })
      .catch((err) => {
        console.log("postsActions.js, upload Request Error: ", err.message);
        //dispatch(uploadFailure("Fail to Upload"));
      });
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

    //Alert.alert("Image uploaded!");
    return await snapshot.ref.getDownloadURL();
  }

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImageProfile source={{ uri: image }} /> : null}

        {uploading ? (
          <StatusWrapper>
            <Text>Completed! </Text>
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
              marginTop: 25,
            }}
            onPress={submitPost}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Save</Text>
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

const mapStatetoProps = (state) => {
  return {
    isModified: state.postsReducer.isModified,
    postdata: state.postsReducer.postdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    //modifypost: (data) => dispatch(modifypost(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(EditPic);
