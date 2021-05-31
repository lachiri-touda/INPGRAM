import { Dimensions } from "react-native";
import { COLORS, SIZES, FONTS } from "../../../constants";

export default {
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,

    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  indicatorTab: {
    backgroundColor: "transparent",
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  item: {
    width: "30%", // is 50% of container width
  },
  item2: {
    right: 0, // is 50% of container width
  },
  socialRow: {
    flexDirection: "row",
  },
  tabBar: {
    backgroundColor: "#EEE",
  },
  masonryContainer: {
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    justifyContent: "space-between",
    marginLeft: 0,
    marginRight: 0,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: "gray",
    fontSize: 12.5,
    textAlign: "center",
  },
  tabLabelText: {
    color: "black",
    fontSize: 22.5,
    fontWeight: "600",
    textAlign: "center",
  },
  userBioRow: {
    marginLeft: 2,
    marginRight: 40,
  },
  userBioText: {
    color: "gray",
    fontSize: 12,
  },
  userImage: {
    borderRadius: 60,
    height: 100,
    marginBottom: 10,
    marginLeft: 20,
    width: 100,
  },
  userNameRow: {
    marginBottom: 2,
  },
  userNameText: {
    color: "#5B5A5A",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemUser: {
    width: "30%", // is 50% of container width
  },
  itemUser2: {},
  userRow: {
    //  flexDirection: "column",
    justifyContent: "Left",
    marginBottom: 50,
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  userImage: {
    borderRadius: 70,
    height: 100,
    marginBottom: 10,
    width: 100,
  },
  followUser: {
    backgroundColor: "#FFF",
    marginBottom: 15,
    marginTop: 25,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  followImage: {
    marginLeft: 15,
    borderRadius: 40,
    height: 80,
    marginBottom: 10,
    width: 80,
  },

  userNameRow: {
    marginBottom: 2,
  },
  userNameText: {
    color: "#5B5A5A",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  userRow: {
    //alignItems: "left",
    //flexDirection: "column",
    marginBottom: 12,
  },
  nameSize: {
    fontSize: 18,
    fontWeight: "bold",
  },
};
