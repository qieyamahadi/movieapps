import React, { Component, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Text, View, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Modal from "react-native-modal"
import FastImage from "react-native-fast-image"
import { BlurView } from "@react-native-community/blur"

import Screen from "../component/Screen"
import { request } from "../api/api"
import { getTvShowSeasonUrl, getImageUrl } from "../api/url"
import { Styles } from "../component/MovieDetail/Styles"
import { white, orange } from "../helper/Color"
import BackIcon from "../component/Utils/BackIcon"

import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const MovieSeasonScreen = (props) => {
  const { navigation, route } = props
  const { season, movieid, listSeason } = route.params
  const [dataSeason, setDataSeason] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [season_number, setSeasonNumber] = useState(season.season_number)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [scrollOffset, setScrollOffset] = useState()

  useEffect(() => {
    fetchSeasonData(season_number)
  })

  const fetchSeasonData = async (season_number) => {
    let tempData = dataSeason
    if (!tempData[season_number]) tempData[season_number] = await request(getTvShowSeasonUrl(movieid, season_number))

    if (tempData[season_number]) this.setState({ dataSeason: tempData, isLoaded: true, season_number: season_number })
  }

  const seasonEpisode = (data) => {
    const imageUrl = getImageUrl(data.still_path, "uri", "w500")
    return (
      <View style={{ margin: 8, backgroundColor: white, overflow: "hidden", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={[Styles.imagePlaceholder, { height: 90, width: 160 }]}>
            <FastImage source={imageUrl} style={{ height: 90, width: 160 }} />
          </View>
          <View style={{ flex: 1, padding: 12, justifyContent: "center" }}>
            <Text style={{ fontWeight: "normal", fontSize: 14 }}>{`Episode ${data.episode_number}`}</Text>
            <Text style={{ fontWeight: "600", fontSize: 18 }} numberOfLines={2}>
              {data.name}
            </Text>
            <View style={{ width: 30, height: 5, backgroundColor: orange, marginTop: 4 }} />
          </View>
        </View>
        <Text
          style={{ fontWeight: "normal", fontSize: 14, paddingVertical: 8, textAlign: "justify" }}
          numberOfLines={4}
        >
          {data.overview}
        </Text>
      </View>
    )
  }

  const onPressSeason = (index) => {
    fetchSeasonData(index)
    toggleModal()
  }

  const handleOnScroll = (event) => {
    // this.setState({
    //   scrollOffset: event.nativeEvent.contentOffset.y,
    // })
    setScrollOffset(event.nativeEvent.contentOffset.y)
  }

  const handleScrollTo = (p) => {
    if (this.season_list.current) {
      this.season_list.current.scrollTo(p)
    }
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const seasonTab = (item, index) => {
    return (
      <View style={{ margin: 8, flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            onPressSeason(index)
          }}
        >
          <Text
            style={{
              fontWeight: season_number === index ? "bold" : "normal",
              fontSize: season_number === index ? 24 : 16,
              color: season_number === index ? orange : white,
              textAlign: "center",
            }}
          >
            {item}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  const renderTitle = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>Season Detail</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={_styles.titleBar} />
      </View>
    )
  }

  const renderSeasonDropdown = () => {
    setSeasonNumber(0)
    return (
      <View style={{ padding: 16, paddingBottom: 8 }}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "center",
                color: white
              }}
            >
              {listSeason[season_number]}
            </Text>
            <Icon name={"chevron-down"} size={24} style={{ marginLeft: 8 }} color={white} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  const renderEpisodeList = () => {
    setSeasonNumber(0)
    return (
      <View style={{ backgroundColor: white, flex: 1 }}>
        {isLoaded && (
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={dataSeason[season_number].episodes}
            renderItem={({ item }) => seasonEpisode(item)}
            contentContainerStyle={{ margin: 8 }}
          />
        )}
      </View>
    )
  }

  const renderListSeasonModal = () => {
    return (
      <Modal
        isVisible={isModalVisible}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        style={{ height: "50%", margin: 0 }}
        onBackButtonPress={toggleModal}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        propagateSwipe={true}
      >
        <BlurView
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
          blurType={"dark"}
          reducedTransparencyFallbackColor="white"
        />
        <View style={{ maxHeight: "50%", alignSelf: "center" }}>
          <FlatList
            ref={(ref) => (this.season_list = ref)}
            onScroll={handleOnScroll}
            data={listSeason}
            renderItem={({ item, index }) => seasonTab(item, index)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item}
          />
        </View>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 0,
              marginBottom: 64,
              padding: 8,
              backgroundColor: orange,
              borderRadius: 8,
            }}
          >
            <Icon name={"close"} size={32} color={white} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  return (
    <Screen>
      {renderTitle()}
      {renderSeasonDropdown()}
      {renderEpisodeList()}
      {renderListSeasonModal()}
    </Screen>
  )
}

export default MovieSeasonScreen

MovieSeasonScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      season: PropTypes.object,
      movieid: PropTypes.number,
      listSeason: PropTypes.array,
    }),
  }),
  listSeason: PropTypes.any,
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
})
