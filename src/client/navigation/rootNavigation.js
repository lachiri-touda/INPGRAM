
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LogIn from "../Screens/LogIn/LogIn";
import Register from "../Screens/LogIn/Register";
import Profile from "../Screens/Profile/Profile";
import Home from "../Screens/Home/Home";
import EditProfile from "../Screens/Profile/EditProfile";
import ProfilePub from "../Screens/Profile/profilePub";
import AddPost from "../Screens/Profile/addPost";
import EditPost from "../Screens/Profile/EditPost";
import LikesPage from "../Screens/Profile/LikesPage";
import EditPic from "../Screens/Profile/EditPic";
import Search from "../Screens/Home/Search";

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
    },
    Search: {
      screen: Search,
    },
    AddPost: {
      screen: AddPost,
    },
  },
  {
    initialRouteName: "Home",
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: "white",
          },
        }),
      },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    LogIn: {
      screen: LogIn,
    },
    Register: {
      screen: Register,
    },
  },
  {
    initialRouteName: "LogIn",
  }
);

const TestNavigator = createStackNavigator({
  Main: {
    screen: AppNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  ProfilePub: {
    screen: ProfilePub,
  },
  EditPost: {
    screen: EditPost,
  },
  EditPic: {
    screen: EditPic,
  },
  EditProfile: {
    screen: EditProfile,
  },
  LikesPage: {
    screen: LikesPage,
  },
});
const AppSwitch = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigator,
    Hide: TestNavigator,
  },
  {
    initialRouteName: "Auth",
  }
);

const AppContainer = createAppContainer(AppSwitch);

export default AppContainer;
