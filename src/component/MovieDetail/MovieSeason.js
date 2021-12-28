import React from "react"
import PropTypes from "prop-types"
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native"
import FastImage from "react-native-fast-image"

import { getImageUrl } from "../../api/url"
import { Styles } from "./Styles"
import { white } from "../../helper/Color"

const MovieSeason = ({ seasonData, navigation, movieid }) => {
  const seasons = seasonData[0].season_number < 1 ? [...seasonData.slice(1), seasonData[0]] : seasonData
  const seasonName = seasonData.map((item) => item.name)

  return (
    <View>
      <Text style={Styles.titleText}>Seasons</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={seasons}
        renderItem={({ item }) => SeasonItem(item, navigation, seasonName, movieid)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const SeasonItem = (data, navigation, seasonName, movieid) => {
  const imageUrl = getImageUrl(data.poster_path, "uri", "w185")
  return (
    <TouchableWithoutFeedback>
      <View>
        <View style={[Styles.imagePlaceholder, { height: 180, width: 120, marginRight: 8, borderRadius: 10 }]}>
          <FastImage source={imageUrl} style={{ height: 180, width: 120, marginRight: 8, borderRadius: 10 }} />
        </View>
        <Text style={{ fontWeight: "600", fontSize: 15, marginTop: 4, width: 100, color: white }}>{data.name}</Text>
        <Text style={{ fontWeight: "300", width: 100, fontSize: 14, color: white }}>{`${data.episode_count} episodes`}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default MovieSeason

MovieSeason.propTypes = {
  seasonData: PropTypes.array,
  navigation: PropTypes.object,
  movieid: PropTypes.number,
}
