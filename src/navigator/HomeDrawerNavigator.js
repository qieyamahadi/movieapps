import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

import { black, white, orange, deepGray } from "../helper/Color";
import TVShowScreen from "../screen/TVShowScreen";
import MovieScreen from "../screen/MovieScreen";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Movies"
      drawerType={"slide"}
      drawerStyle={{ width: "50%", backgroundColor: deepGray }}
      drawerContentOptions={{
        activeBackgroundColor: "transparent",
        activeTintColor: orange,
        inactiveTintColor: white,
      }}
    >
      <Drawer.Screen
        name="Movies"
        component={MovieScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "Movies"),
        }}
      />
      <Drawer.Screen
        name="TV Show"
        component={TVShowScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "TV Shows"),
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerStyle = (color, focused, title) => {
  return (
    <Text
      style={{
        fontSize: focused ? 20 : 16,
        fontWeight: null,
        color: color,
        fontWeight: focused ? "600" : "300",
      }}
    >
      {title}
    </Text>
  );
};

export default HomeDrawerNavigator;
