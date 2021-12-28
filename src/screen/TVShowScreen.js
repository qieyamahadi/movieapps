import React, { Component, useEffect, useState } from "react"
import PropTypes from "prop-types"

import HomeComponent from "../component/Home/HomeComponent"
import { requestTVShowScreen as requestTVShowAPI } from "../api/api"
import { TVShowTypes } from "../helper/Types"

const TVShowScreen = ({ navigation }) => {
  const [moviesData, setMoviesData] = useState([])

  useEffect(() => {
    requestMovieScreen()
  })

  const requestMovieScreen = async () => {
    await requestTVShowAPI((data) => setMoviesData(data))
  }

  return (
    <HomeComponent
      type={"tv"}
      subTitle={TVShowTypes}
      navigation={navigation}
      data={moviesData}
      onRefresh={requestMovieScreen}
    />
  )
}

export default TVShowScreen

TVShowScreen.propTypes = {
  navigation: PropTypes.object,
}
