import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/Ionicons";
import { black, white } from "../../helper/Color";

const BackIcon = ({ style, navigation, color }) => {
  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Icon name={"md-chevron-back"} size={32} color={white} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default BackIcon;

BackIcon.propTypes = {
  style: PropTypes.object,
  navigation: PropTypes.object,
  color: PropTypes.string,
};
