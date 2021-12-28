import React, { Component, useState } from "react"
import PropTypes from "prop-types"
import { Text, TextInput, View, StyleSheet } from "react-native"

import Screen from "../component/Screen"
import { requestSearchMovie, requestSearchTv } from "../api/api"
import { orange, lightGray, white } from "../helper/Color"
import MovieList from "../component/MovieList"

import Icon from "react-native-vector-icons/Ionicons"
import BackIcon from "../component/Utils/BackIcon"

const SearchScreen = (props) => {
  const { navigation, data, route } = props
  const { type } = route.params
  const [search, setSearch] = useState({})

  const renderHeaderTitle = () => {
    const title = type === "tv" ? "TV Shows" : "Movies"

    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>{`Search ${title}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={_styles.titleBar} />
        <Text style={_styles.subTitle}>
          {`We'll help you find your favorite ${title.toLowerCase()}. Discover wonderful ${title.toLowerCase()}.`}
        </Text>
      </View>
    )
  }

  const requestMovie = async (text) => {
    const requestSearch = type === "tv" ? requestSearchTv : requestSearchMovie
    if (text !== "") {
      const search = await requestSearch(text)
      if (search) setSearch(search)
    }
  }

  const renderSearchText = () => {
    return (
      <View style={_styles.searchContainer}>
        <Icon name={"search"} size={20} style={{ margin: 12 }} />
        <View style={{ alignSelf: "center", flex: 1 }}>
          <TextInput
            style={_styles.searchInput}
            placeholder={"Avengers: End Game"}
            onChangeText={(text) => requestMovie(text)}
            returnKeyType={"search"}
            autoCorrect={false}
          />
        </View>
      </View>
    )
  }

  const renderListMovies = () => {
    const { results = [] } = search
    return <MovieList results={results} navigation={navigation} type={type} />
  }

  return (
    <Screen>
      {renderHeaderTitle()}
      {renderSearchText()}
      {renderListMovies()}
    </Screen>
  )
}

export default SearchScreen

SearchScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
}

const _styles = StyleSheet.create({
  headerTitle: {
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
    marginBottom: 12,
    alignSelf: "center",
  },

  subTitle: {
    margin: 16,
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
    color: white
  },

  searchContainer: {
    marginHorizontal: 16,
    backgroundColor: lightGray,
    borderRadius: 24,
    flexDirection: "row",
  },

  searchInput: {
    fontSize: 14,
    flex: 1,
    marginRight: 12,
  },
})
