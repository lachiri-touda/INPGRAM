import React, { useState, useRef, useEffect } from "react";
import { COLORS, SIZES, FONTS } from "../../constants";

import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import EditStyle from "./style/EditStyle";
import { connect } from "react-redux";
const styles = StyleSheet.create({ ...EditStyle });
import axios from "axios";
import { modifypost } from "../../actions/postsActions";
import { baseURL } from "../../constants";

function EditPost(props) {
  const [Description, putDescription] = useState("");

  /*static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-pencil" style={{ color: tintColor }} />
    )
  }*/

  const didMountRef = useRef(false);
  // useEffect()to check if states have changed
  // 2nd argument is the list of states you want to watch for
  useEffect(() => {
    putDescription(props.postdata.description);
    if (didMountRef.current) {
      // if login success, go to home screen
      if (props.isModified) {
        Alert.alert('Post has been updated!')
        props.navigation.navigate("Profile");
      }
    } else {
      didMountRef.current = true;
    }
  }, [props.isModified]);

  const ModifyPost = () => {
    const data = {
      urlpost: props.postdata.urlpost,
      userid: props.postdata.userid,
      postid: props.postdata.Id,
      description: Description,
    };

    // calling login() dispatch function
    props.modifypost(data);
  };

  const DeletePost = async () => {
    axios({
      method: "post",
      url: "/DeletePost",
      baseURL: baseURL,
      data: {
        userid: props.postdata.userid,
        postid: props.postdata.Id,
      },
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    })
      .then((res) => {
        const message = res.data.message;

        if (res.data.value) {
          props.navigation.navigate("Profile");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={{ marginTop: 100 }}>
      <View style={styles.userRow}>
        <Image
          style={styles.userImage}
          source={{ uri: props.postdata.urlpost }}
        />

        <View style={styles.container}>
          <View style={styles.item1}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Caption</Text>
          </View>
          <View regular style={styles.item2}>
            <TextInput
              style={styles.TextInput}
              value={Description}
              onChangeText={(text) => putDescription(text)}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{ marginTop: 120 }}>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 120,
                backgroundColor: "#48bfe3",
                borderRadius: SIZES.radius / 0.2,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={ModifyPost}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                Modify Post
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: 120,
              backgroundColor: "#48bfe3",
              borderRadius: SIZES.radius / 0.2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={DeletePost}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              Delete Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const mapStatetoProps = (state) => {
  return {
    isModified: state.postsReducer.isModified,
    postdata: state.postsReducer.postdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    modifypost: (data) => dispatch(modifypost(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(EditPost);
