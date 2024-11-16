import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CartScreen from "../Screens/CartScreen";
import FavoritesScreen from "../Screens/FavoritesScreen";
import OrderHistoryScreen from "../Screens/ProfileScreen";
import HomeScreen from "../Screens/HomeScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#008E97" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="shoppingcart" size={24} color="#008E97" />
            ) : (
              <AntDesign name="shoppingcart" size={24} color="black" />
            ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#008E97" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    backgroundColor: "#ffff",
    borderTopWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 0,
    borderTopColor: "transparent",
  },

});

export default TabNavigation;
