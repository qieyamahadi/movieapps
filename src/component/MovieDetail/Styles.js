import { StyleSheet } from "react-native";
import { gray, white } from "../../helper/Color";

export const Styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    marginTop: 24,
    color: white
  },

  textOverview: {
    fontWeight: "normal",
    color: white
  },

  bottomText: {
    width: 75,
    fontWeight: "300",
    fontSize: 14,
    marginTop: 4,
    color: white
  },

  castImageContainer: {
    overflow: "hidden",
    height: 85,
    width: 75,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: gray,
  },

  imagePlaceholder: {
    backgroundColor: gray,
  },

  castImage: {
    width: 75,
    height: 110,
  },

  movieImages: {
    height: 100,
    marginRight: 8,
    borderRadius: 10,
  },

  movieRecommImages: {
    height: 150,
    width: 100,
    marginRight: 8,
    borderRadius: 10,
  },
});
