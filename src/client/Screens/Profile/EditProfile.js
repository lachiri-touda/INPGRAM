import React, { Component } from "react";
import { COLORS, SIZES, FONTS } from "../../constants";

import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import EditStyle from "./style/EditProfileStyle";
import { connect } from "react-redux";
const styles = StyleSheet.create({ ...EditStyle });
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { uploadprofilephoto } from "../../actions/postsActions";
import { baseURL } from "../../constants";

import { Icon } from "native-base";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      website: "",
      bio: "",
      url: "",
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-pencil" style={{ color: tintColor }} />
    ),
  };

  UploadProfilePhoto = () => {
    const Data = {
      id: this.props.userDetails,
      url: this.state.url,
    };
    // calling signup() dispatch

    this.props.uploadprofilephoto(Data);
  };

  saveEditProfile = async () => {
    if (!this.state.name) {
      Alert.alert("Name is empty");
    } else if (!this.state.username) {
      Alert.alert("Username is empty");
    } else {
      axios({
        method: "post",
        url: "/EditProfile",
        baseURL: baseURL,
        data: {
          userid: this.props.userDetails,
          name: this.state.name,
          username: this.state.username,
          website: this.state.website,
          bio: this.state.bio,
        },
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      })
        .then((res) => {
          Alert.alert("Data is saved");
          const message = res.data.message;

          if (message === "Profile updated succefully") {
            this.props.navigation.navigate("Profile");
            Alert.alert(message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  fetchUserDetails = async (user_id) => {
    axios({
      method: "post",
      url: "/getUserDetails",
      baseURL: baseURL,
      data: {
        userid: user_id,
      },
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ name: res.data.results[0].name });
        this.setState({ username: res.data.results[0].username });
        this.setState({ bio: res.data.results[0].bio });
        this.setState({ website: res.data.results[0].website });
        this.setState({ url: res.data.results[0].url });
      })
      .catch((err) => console.log(err));
  };
  /*async ComponentDidMount () {
     
  
    AsyncStorage.getItem('name').then((value)=> this.setState({'name':value}));
   
    AsyncStorage.getItem('username').then((value)=> this.setState({'username':value}));
    AsyncStorage.getItem('website').then((value)=> this.setState({'website':value}));
    AsyncStorage.getItem('bio').then((value)=> this.setState({'bio':value}));

}*/

  componentDidMount() {
    this.fetchUserDetails(this.props.userDetails);
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.fetchUserDetails(this.props.userDetails);
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  renderButton(text, onPress) {
    return (
      <View style={{ margin: SIZES.padding * 0.5, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            height: 60,
            width: 200,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 0.2,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 200,
            marginTop: 50,
          }}
          onPress={onPress}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  ChangePhoto = () => {};

  render() {
    return (
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.userRow}>
              <Image
                style={styles.userImage}
                source={{ uri: this.state.url }}
              />
              <View style={styles.changephoto}></View>

              <View style={styles.container}>
                <View style={styles.item1}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name</Text>
                </View>
                <View regular style={styles.item2}>
                  <TextInput
                    style={styles.TextInput}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.item1}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Username
                  </Text>
                </View>
                <View regular style={styles.item2}>
                  <TextInput
                    style={styles.TextInput}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.item1}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bio</Text>
                </View>
                <View regular style={styles.item2}>
                  <TextInput
                    style={styles.TextInput}
                    value={this.state.bio}
                    onChangeText={(text) => this.setState({ bio: text })}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {this.renderButton("Save", this.saveEditProfile)}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    userDetails: state.loginReducer.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    uploadprofilephoto: (Data) => dispatch(uploadprofilephoto(Data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(EditProfile);
