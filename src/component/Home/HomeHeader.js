import React, { Component } from "react"
import PropTypes from "prop-types"
import { View, TouchableWithoutFeedback } from "react-native"
import FastImage from "react-native-fast-image"
import Icon from "react-native-vector-icons/Feather"

import MenuIcon from "../../assets/open-menu.png"
import { white } from "../../helper/Color"

const HomeHeader = ({ navigation, type }) => {

  const menuIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
        <FastImage source={MenuIcon} style={{ width: 20, height: 20 }} />
      </TouchableWithoutFeedback>
    )
  }

  const searchIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Search", { type: type })}>
        <Icon name={"search"} size={20} color={white} />
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between" }}>
      {menuIcon()}
      {searchIcon()}
    </View>
  )
}

export default HomeHeader

HomeHeader.propTypes = {
  navigation: PropTypes.object,
  type: PropTypes.oneOf(["tv", "movie"]),
}
