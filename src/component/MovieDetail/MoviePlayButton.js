import React, { Component, useState } from "react"
import PropTypes from "prop-types"
import Modal from "react-native-modal"
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native"

import Icon from "react-native-vector-icons/FontAwesome5"

import { black, darkGray, orange, white } from "../../helper/Color"

const MoviePlayButton = ({ navigation, videoData }) => {
  const [isModalShown, setIsModalShown] = useState(false)

  const toggleModal = () => {
    setIsModalShown(!isModalShown)
  }

  const renderPlayButton = () => {
    return (
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={_styles.wrapper}>
          <Icon name={"play"} size={20} color={white} style={_styles.icon} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const onPressPlay = (key) => {
    toggleModal()
    navigation.navigate("Webview", { id: key })
  }

  const videoItem = () => {
    const results = videoData.results.slice(0, 7)
    return results.map((item) => (
      <View key={item.key} style={{ marginBottom: 8, flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: "80%" }}>
          <Text style={{ fontWeight: "normal", fontSize: 14, color: white }}>{item.name}</Text>
          <Text style={{ fontWeight: "300", fontSize: 12, color: white }}>{item.type}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => onPressPlay(item.key)}>
          <View style={_styles.buttonPlay}>
            <Text style={_styles.playText}>Play</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    ))
  }

  const renderModal = () => {
    const { results = [] } = videoData

    if (isModalShown && results.length !== 0) {
      return (
        <Modal
          isVisible={isModalShown}
          style={{ justifyContent: "flex-end", margin: 0 }}
          swipeDirection={"down"}
          onBackButtonPress={toggleModal}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
        >
          <View style={_styles.modalStyle}>
            <View style={_styles.bar} />
            <Text style={_styles.videoText}>Videos</Text>
            {videoItem()}
          </View>
        </Modal>
      )
    }
  }

  return (
    <>
      {renderPlayButton()}
      {renderModal()}
    </>
  )
}

export default MoviePlayButton

MoviePlayButton.propTypes = {
  videoData: PropTypes.object,
  navigation: PropTypes.object,
}

const _styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 0,
    top: -40,
    marginRight: 32,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: black,
    borderColor: white,
    borderWidth: 1,
    justifyContent: "center",
  },

  icon: {
    alignSelf: "center",
  },

  modalStyle: {
    backgroundColor: darkGray,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 48,
    minHeight: "40%",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },

  bar: {
    width: 40,
    height: 5,
    backgroundColor: orange,
    marginBottom: 24,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
  },

  buttonPlay: {
    alignSelf: "flex-start",
    borderRadius: 6,
    overflow: "hidden",
    borderColor: white,
    borderWidth: 0.3
  },

  playText: {
    fontWeight: "600",
    textAlign: "right",
    backgroundColor: darkGray,
    color: white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  videoText: {
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 12,
    color: white
  },
})
