import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import FavoritesScreen from "../Screens/FavoritesScreen";
import OrderHistoryScreen from "../Screens/OrderHistoryScreen";

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
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="home" size={25}               color={
              focused ?' orange ' : 'white'
            }
/>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <AntDesign name="shoppingcart" size={25} color="white" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <AntDesign name="hearto" size={25} color="white" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <AntDesign name="save" size={25} color="white" />
          ),
        }}
      ></Tab.Screen>
       <Tab.Screen
        name="Profile"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <AntDesign name="user" size={25} color="white" />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: "absolute",
    backgroundColor: '#3F3F3F',
    borderTopWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 0,
    borderTopColor: "transparent",
  },
  BlurViewStyles: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigation;