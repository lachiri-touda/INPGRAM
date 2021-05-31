import { Component } from "react";

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  Alert,
  RefreshControl,
  StyleSheet,
  Header,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import { COLORS, SIZES, FONTS } from "../../constants";

import axios from "axios";

import { Container, Content, Icon, Thumbnail } from "native-base";

import inplogo from "../../assets/image/logo1.png";

import dm from "../../assets/image/dm.png";
import { displaylikes } from "../../actions/postsActions";

import PostComponent from "./PostComponent";

import { isLogedIn } from "../../actions/AuthActions";

import { baseURL } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 17,
  },
});
console.disableYellowBox = true;
class Home extends Component {
  list = [];

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      posts: [],
      Id: "",
      test: 0,
      refreshing: true,
    };
  }

  getIdValue = async () => {
    var value = await AsyncStorage.getItem("Id");
    this.Id = value;
    return value;
  };

  listUsers = async () => {
    axios({
      method: "post",
      url: "/listUsers",
      baseURL: baseURL,
      data: {
        Id: this.Id,
      },
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ data: res.data.lista });
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.listPosts().then(() => {
      this.setState({ refreshing: false });
    });
  };
  onRefresh() {
    //Clear old data of the list
    //Call the Service to get the latest data
    this.listPosts();
  }

  listPosts = async () => {
    axios({
      method: "post",
      url: "/listPosts",

      baseURL: baseURL,
      data: {
        Id: this.Id,
      },
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({
          refreshing: false,

          posts: res.data.totalPosts,
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  verifyConnexion = () => {
    if (!isLogedIn()) {
      this.props.navigation.navigate("LogIn");
    }
  };

  async componentDidMount() {
    this.verifyConnexion();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.verifyConnexion();
      }
    );
    await this.getIdValue();
    this.listUsers();
    this.listPosts();
    this.render();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    ),
  };

  renderUsers = (users) => {
    return users.map((user, index) => {
      let followRequest = async () => {
        axios({
          method: "post",
          url: "/follow",
          baseURL: baseURL,
          data: {
            Id: this.Id,

            followId: user.Id,
          },
          headers: {
            "auth-token": await AsyncStorage.getItem("token"),
          },
        })
          .then((res) => {
            this.setState({ test: 1 });
            this.listUsers();
            this.listPosts();
          })

          .catch((err) => {
            console.log(err.message);
          });
      };

      let unfollowRequest = async () => {
        axios({
          method: "post",
          url: "/unfollow",
          baseURL: baseURL,
          data: {
            Id: this.Id,
            followId: user.Id,
          },
          headers: {
            "auth-token": await AsyncStorage.getItem("token"),
          },
        })
          .then((res) => {
            this.setState({ test: 1 });
            this.listUsers();
            this.listPosts();
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

      let onpress = user.follow ? unfollowRequest : followRequest;
      let text = user.follow ? "unfollow" : "follow";
      return (
        <View style={{ alignItems: "center", marginLeft: 10 }}>
          <Thumbnail
            source={{
              uri: user.url,
            }}
          />
          <Text
            style={{
              marginHorizontal: 5,
              fontSize: 15,
            }}
          >
            {user.name}
          </Text>
          <TouchableOpacity
            style={{
              height: 30,
              width: 80,
              backgroundColor: "#048ba8",
              borderRadius: SIZES.radius / 0.2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onpress}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{text}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };
  parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }

  renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Image
          source={inplogo}
          resizeMode="contain"
          style={{
            width: "60%",
            width: "20%",
          }}
        />
      </View>
    );
  }

  renderPosts = (posts) => {
    const sortedposts = posts.sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );

    return sortedposts.map((post, index) => {
      var name = post.username;
      var url = post.posts;
      var userpicurl = post.picurl;
      var date = post.date;
      var caption = post.caption;
      return (
        <PostComponent
          imageSource={url}
          likes={post.likes.length}
          username={name}
          userpicurl={userpicurl}
          date={date}
          caption={caption}
          Id={post.Id}
          userid={this.Id}
          navigation={this.props.navigation}
          displaylikes={this.props.displaylikes}
        />
      );
    });
  };
  ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#c8c8c8",
          marginBottom: 0,
        }}
      />
    );
  };

  onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: 200,
          marginBottom: 0,
          backgroundColor: COLORS.primary,
        }}
      >
        <Image
          source={inplogo}
          style={{
            width: 170,
            height: 55,
            marginLeft: 10,
            //tintColor: "black",
            marginTop: 40,
            marginBottom: 0,
          }}
        ></Image>
        <Image
          source={dm}
          style={{
            width: 25,
            height: 25,
            marginRight: 20,
            alignSelf: "flex-end",
            tintColor: "black",
            marginTop: -40,
          }}
        ></Image>
        <Container style={styles.container}>
          {this.ItemSeparatorView()}

          <Content>
            <View
              style={{
                height: 110,
                backgroundColor: COLORS.primary,
              }}
            >
              <View style={{ flex: 3 }}>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                    />
                  }
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center",
                    paddingStart: 5,
                    paddingEnd: 5,
                  }}
                >
                  {this.renderUsers(this.state.data)}
                </ScrollView>
              </View>
            </View>

            <View>{this.renderPosts(this.state.posts)}</View>
          </Content>
        </Container>
      </View>
    );
  }
}

const mapStatetoProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    displaylikes: (data) => dispatch(displaylikes(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
