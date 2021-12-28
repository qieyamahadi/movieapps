import React, { useState } from "react"
import PropTypes, { string, object } from "prop-types"
import { ScrollView, Text, View, StyleSheet, RefreshControl } from "react-native"

import Screen from "../Screen.js"
import MoviesRow from "./MoviesRow"
import HomeHeader from "./HomeHeader"
import { normalize } from "../../helper/FontSize"
import { orange, white } from "../../helper/Color"

const HomeComponent = (props) => {
  const { navigation, data, type, subTitle } = props
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await props.onRefresh()
    setIsRefreshing(false)
  }

  const renderHeader = () => {
    return <HomeHeader navigation={navigation} type={type} />
  }

  const renderTitle = () => {
    const title = type === "tv" ? "TV Shows" : "Movies"
    return (
      <View>
        <Text style={Styles.screenTitle}>{title}</Text>
        <View style={Styles.titleBar} />
      </View>
    )
  }

  const renderMovieRow = () => {
    return subTitle.map((title, index) => (
      <MoviesRow key={index} data={{ ...data[index] }.results} title={title} navigation={navigation} type={type} />
    ))
  }

  const renderMoviesComponent = () => {
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {renderTitle()}
        {renderMovieRow()}
      </ScrollView>
    )
  }

  return (
    <Screen>
      {renderHeader()}
      {renderMoviesComponent()}
    </Screen>
  )
}

export default HomeComponent

HomeComponent.propTypes = {
  navigation: PropTypes.object,
  type: PropTypes.oneOf(["tv", "movie"]),
  data: PropTypes.arrayOf(object),
  onRefresh: PropTypes.func,
  subTitle: PropTypes.arrayOf(string),
}

const Styles = StyleSheet.create({
  screenTitle: {
    fontWeight: "bold",
    fontSize: normalize(30),
    margin: 16,
    marginBottom: 0,
    color: white
  },

  titleBar: {
    width: 30,
    height: 5,
    backgroundColor: orange,
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 16,
  },
})
