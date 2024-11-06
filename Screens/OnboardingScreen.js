import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnboardingScreen = () => {
  return (
    <SafeAreaView className = 'flex-1 justify-center items-center text-3xl bg-white'>
      <View className='flex-1 justify-center items-center text-3xl bg-white'>
      <Text>Open up App.js to start working on your app!</Text>
      
    </View>
   </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({})