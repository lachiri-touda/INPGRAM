import React, { useState, useRef, useEffect } from "react";
import { Thumbnail } from "native-base";

import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";

import { connect } from "react-redux";

import axios from "axios";
import { modifypost } from "../../actions/postsActions";
import { baseURL } from "../../constants";
import { LikesStyle } from "./style/LikesStyle";

const styles = StyleSheet.create({ ...LikesStyle });
function LikesPage(props) {
  const [Description, putDescription] = useState("");

  const didMountRef = useRef(false);

  useEffect(() => {}, []);

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.75,
          width: "100%",
          backgroundColor: "#c8c8c8",
          marginBottom: 0,
        }}
      />
    );
  };

  function ItemView({ item }) {
    return (
      <View style={{ margin: SIZES.padding * 0.5, alignItems: "center" }}>
        <Thumbnail
          source={{
            uri: item.url,
          }}
        />
        <TouchableOpacity
          style={{
            marginTop: 10,
            height: 30,
            width: 200,
            backgroundColor: "#2a9d8f",
            borderRadius: SIZES.radius / 0.2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={props.likesdata}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
}
const mapStatetoProps = (state) => {
  return {
    likesdata: state.postsReducer.likesdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(LikesPage);
