import React, { Component, useState } from "react"
import PropTypes from "prop-types"
import FastImage from "react-native-fast-image"
import { View, Text, FlatList, Modal, TouchableWithoutFeedback } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"

import { getImageUrl } from "../../api/url"
import { Styles } from "./Styles"

const MovieImages = (props) => {
  const { navigation, images } = props
  const { backdrops } = images
  const [isShowModal, setIsShowModal] = useState(false)
  const [imageModalIndex, setImageModalIndex] = useState(0)

  const onPressImage = (index = 0) => {
    setIsShowModal(!isShowModal)
    setImageModalIndex(index)
  }

  const modalImage = () => {
    const imagefull = modalImagesUrl()
    return (
      <Modal visible={isShowModal} transparent={true}>
        <ImageViewer imageUrls={imagefull} onCancel={onPressImage} enableSwipeDown index={imageModalIndex} />
      </Modal>
    )
  }

  const modalImagesUrl = () => {
    const imagefull = backdrops.map((item) => {
      const imageurl = getImageUrl(item.file_path, "url", "original")
      return { ...imageurl, ...{ width: item.width, height: item.height } }
    })
    return imagefull
  }

  if (backdrops.length === 0) return null
  return (
    <View>
      <Text style={Styles.titleText}>Images</Text>
      <FlatList
        keyExtractor={(item) => item.file_path}
        data={backdrops}
        renderItem={({ item, index }) => imageComponent(item, index, onPressImage)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {modalImage()}
    </View>
  )

}

const imageComponent = (data, index, onPress) => {
  const imageUrl = getImageUrl(data.file_path, "uri", "w300")
  const style = { ...Styles.movieImages, ...{ width: 100 * data.aspect_ratio } }

  return (
    <TouchableWithoutFeedback onPress={() => onPress(index)} style={[style, Styles.imagePlaceholder]}>
      <FastImage source={imageUrl} style={style} />
    </TouchableWithoutFeedback>
  )
}

export default React.memo(MovieImages)

MovieImages.propTypes = {
  images: PropTypes.object,
}
