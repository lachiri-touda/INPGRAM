import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
//const mongoose = require('mongoose')

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { setCurrentUser, logout } from "./actions/loginActions";

import RootNavigation from "./navigation/rootNavigation";



const initialLoginStatut = {
  isLoading: true,
  userName: null,
  userToken: null,
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    LogIn: () => {
      setUserToken("ababa");
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken("ababa");
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  /** if(localStorage.jwtToken){
    if(localStorage.jwtToken){
      axios.defaults.headers.common['Authorization']=`Bearer ${localStorage.jwtToken}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
 }   
   jwt.verify(localStorage.jwtToken,'secret',function(err,decode){
    if(err){
        store.dispatch(logout());
    }else{
     //console.log(decode);
      store.dispatch(setCurrentUser(decode));
    }
   });*/

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
