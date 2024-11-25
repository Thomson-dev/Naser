import { useEffect, useLayoutEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'


const DeliveryScreen = () => {
  const navigation = useNavigation()



  return (
    <View className = 'bg-[#00CCBB] flex-1'>
      <SafeAreaView className="  z-50">
      <StatusBar
        barStyle="light-content" // Set text color to light
        backgroundColor="black" // Set background color
       
      />
        <View className="flex-row justify-between items-center p-8">
          <TouchableOpacity onPress={() => navigation.navigate('Tab')}>
          <FontAwesome name="times" size={30} color="white" />
            
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45 -55 Minutes</Text>
            </View>
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

          <Text className="mt-3 text-gray-500">
            Your order at is being prepared
          </Text>
        </View>
      </SafeAreaView>

      {/* <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView> */}

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru'
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Michael</Text>
          <Text className="text-gray-400">Your rider</Text>
        </View>

        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen