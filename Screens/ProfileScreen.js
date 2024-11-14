import {  Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      console.log("Token removed");
    } catch (err) {
      console.log("Error removing token", err);
    }
  };


  const handleLogout = async () => {
    await clearToken();
    navigation.replace("Login"); // Navigate to the login screen after clearing the token
  };

  
  return (
   <SafeAreaView>
      <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
   </SafeAreaView>

  )
}

export default ProfileScreen

const styles = StyleSheet.create({})