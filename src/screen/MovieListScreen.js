import React, { Component, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Text, View, StyleSheet } from "react-native"

import MovieList from "../component/MovieList"
import Screen from "../component/Screen"
import { fetchFunctionListScreen } from "../helper/Types"
import BackIcon from "../component/Utils/BackIcon"
import { orange, white } from "../helper/Color"

const MovieListScreen = (props) => {
  const { navigation, route } = props
  const { data, type, title } = route.params
  const [page, setPage] = useState(1)
  const [listData, setListData] = useState(data)

  const onReachEnd = async () => {
    const fetchUrl = fetchFunctionListScreen(type, title)
    const response = await fetchUrl(page)

    console.log("response asdasda", response)
    if (response) {
      setPage(page + 1)
      setData([...data, ...response.results])
    }
  }

  const renderTitle = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>{`${title} ${type === "tv" ? "TV Show" : "Movies"}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={_styles.titleBar} />
      </View>
    )
  }

  return (
    <Screen>
      {renderTitle()}
      <MovieList results={listData} navigation={navigation} onReachEnd={onReachEnd} type={type} />
    </Screen>
  )
}

export default MovieListScreen

MovieListScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
}

const _styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
    color: white
  },

  titleBar: {
    width: 40,
    height: 5,
    backgroundColor: orange,
    marginTop: 4,
    alignSelf: "center",
  },

  subTitle: {
    margin: 16,
    marginTop: 5,
    fontWeight: "normal",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
  },
})
