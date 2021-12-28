import React, { Component, useEffect, useState } from "react"
import PropTypes from "prop-types"

import HomeComponent from "../component/Home/HomeComponent"
import { requestMovieScreen as RequestMovieApi } from "../api/api"
import { MovieTypes } from "../helper/Types"

const MovieScreen = ({ navigation }) => {
  const [moviesData, setMoviesData] = useState([])

  useEffect(() => {
    requestMovieScreen()
  })

  const requestMovieScreen = async () => {
    await RequestMovieApi((data) => {
      setMoviesData(data)
    })
  }

  return (
    <HomeComponent
      type={"movie"}
      subTitle={MovieTypes}
      navigation={navigation}
      data={moviesData}
      onRefresh={requestMovieScreen}
    />
  )
}


export default MovieScreen

MovieScreen.propTypes = {
  navigation: PropTypes.object,
}
