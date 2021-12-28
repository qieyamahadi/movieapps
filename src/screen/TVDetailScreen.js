import React, { Component, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { View, StatusBar, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native"

import { requestTvDetailScreen } from "../api/api"

import MovieBackdrop from "../component/MovieDetail/MovieBackdrop"
import MovieOverview from "../component/MovieDetail/MovieOverview"
import MovieImages from "../component/MovieDetail/MovieImages"
import MovieCast from "../component/MovieDetail/MovieCast"
import MovieRecommendations from "../component/MovieDetail/MovieRecommendations"
import MovieGenres from "../component/MovieDetail/MovieGenres"
import MovieRating from "../component/MovieDetail/MovieRating"
import MoviePlayButton from "../component/MovieDetail/MoviePlayButton"
import MovieTitle from "../component/MovieDetail/MovieTitle"
import { black, darkGray, white } from "../helper/Color"
import BackIcon from "../component/Utils/BackIcon"
import MovieSeason from "../component/MovieDetail/MovieSeason"
import Icon from "react-native-vector-icons/Ionicons"
import { useDispatch } from "react-redux"

const TVDetailScreen = (props) => {
  const { navigation, route } = props
  const [movieData, setMovieData] = useState({})
  const [credit, setCredit] = useState({})
  const [images, setImages] = useState({})
  const [videos, setVideos] = useState({})
  const [recommendations, setRecommendations] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    requestInfoDetail()
  })

  const requestInfoDetail = async () => {
    const { id } = route.params
    await requestTvDetailScreen(id, callbackRequest)
  }

  const callbackRequest = (response) => {
    const [movieData, credit, images, videos, recommendations] = response
    setMovieData(movieData)
    setCredit(credit)
    setImages(images)
    setVideos(videos)
    setRecommendations(recommendations)
    setIsLoaded(true)
  }

  const movieInfoGeneral = () => {
    return (
      <MovieBackdrop backdrop={movieData.backdrop_path}>
        {isLoaded && (
          <View>
            <MovieTitle title={movieData.name} />
            <MovieRating rating={movieData.vote_average} />
          </View>
        )}
      </MovieBackdrop>
    )
  }

  const movieInfoDetail = () => {
    return (
      <View style={Styles.movieDetailWrapper}>
        <View style={Styles.movieDetail}>
          {isLoaded && (
            <View>
              <MovieGenres genre={movieData.genres} />
              <MovieOverview overview={movieData.overview} />
              <MovieCast credit={credit} />
              <MovieSeason seasonData={movieData.seasons} navigation={navigation} movieid={movieData.id} />
              <MovieImages images={images} />
              <MovieRecommendations recommendations={recommendations} navigation={navigation} />
            </View>
          )}
        </View>
        <MoviePlayButton videoData={videos} navigation={navigation} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <ScrollView style={Styles.scrollview} contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <StatusBar translucent backgroundColor={"transparent"} />
        {movieInfoGeneral()}
        {movieInfoDetail()}
      </ScrollView>
      <BackIcon navigation={navigation} style={{ marginLeft: 5, position: "absolute", top: 40 }} />
    </View>
  )
}

export default TVDetailScreen

TVDetailScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
}

const Styles = StyleSheet.create({
  scrollview: {
    backgroundColor: white,
    flexGrow: 1,
  },

  movieDetailWrapper: {
    flex: 1,
    backgroundColor: black,
  },

  movieDetail: {
    flex: 1,
    padding: 16,
    paddingTop: 5,
    backgroundColor: black,
  },
})
