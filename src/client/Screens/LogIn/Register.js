import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  View,
  Button,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, FONTS } from "../../constants";
import insta from "../../assets/image/insta.png";

const axios = require("axios");

import AuthStyle from "./style/AuthStyle";
const styles = StyleSheet.create({ ...AuthStyle });

import { signup } from "../../actions/signupActions";

import { isLogedIn } from "../../actions/AuthActions";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // useRef hook to check whether the component has just mounted or updated

  const didMountRef = useRef(false);
  // useEffect() to check if states have changed
  // 2nd argument is the list of states you want to watch for
  useEffect(() => {
    if (didMountRef.current) {
      // if signup success, go to login screen
      if (props.isAuth) {
        props.navigation.navigate("LogIn");
        Alert.alert("User is saved");
      } else if (!props.isAuth && !props.isLoading) {
        Alert.alert(props.errMsg);
      }
    } else {
      didMountRef.current = true;
    }
  }, [props.isAuth, props.isLoading]);

  const signupHandler = () => {
    const signupData = {
      email: email,
      name: name,
      username: username,
      password: password,
    };
    // calling signup() dispatch

    props.signup(signupData);
  };

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 50,
        }}
      >
        <Image
          source={insta}
          resizeMode="contain"
          style={{
            width: "60%",
          }}
        />
      </View>
    );
  }

  function renderButton(text, onPress) {
    return (
      <View style={{ margin: SIZES.padding * 0.5, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            height: 60,
            width: 250,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 0.2,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={onPress}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary]}
        style={{ flex: 1, alignItems: "center" }}
      >
        <ScrollView>
          {renderLogo()}

          <Text style={styles.titleText}>Sign Up </Text>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={styles.TextInput}
              placeholder="email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="username"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="name"
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          {renderButton("SignUp", signupHandler)}

          {renderButton("LogIn", () => props.navigation.navigate("LogIn"))}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = (state) => {
  return {
    // only map needed states here
    isLoading: state.signupReducer.isLoading,
    isAuth: state.signupReducer.isAuth,
    errMsg: state.signupReducer.errMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    signup: (signupData) => dispatch(signup(signupData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
