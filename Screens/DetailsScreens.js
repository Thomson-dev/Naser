import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/CartReducer";

const DetailsScreens = ({ route, navigation }) => {
  const colors = {
    white: "#FFFFFF",
    primary: "#45484A",
    secondary: "#AEB5BB",
    gray: "#D9D9D9",
  };
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { item } = route.params;

  const PizzaSize = ["S", "M", "L", "XL"];


  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <StatusBar
        barStyle="light-content" // Set text color to light
        backgroundColor="black" // Set background color
       
      />
        <ImageBackground
          className="w-full object-contain aspect-square"
          source={{ uri: item.image }}
        >
          <View className="items-start p-5 flex">
            <TouchableOpacity
              className="rounded-full flex justify-center items-center w-10 h-10 bg-[#D9D9D9]"
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name={"arrow-back-outline"}
                color={colors.primary}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View className="flex-1 justify-between p-4">
          <View className="flex-1">
           
            <Text className="text-xl font-semibold">{item.name}</Text>
            <Text className="mt-4 text-sm flex items-center leading-6 text-slate-600">
              {showFullDescription
                ? item.description
                : `${item.description.slice(0, 100)}...`}
              <TouchableOpacity
                onPress={() => setShowFullDescription(!showFullDescription)}
              >
                <Text className="text-blue-500">
                  {showFullDescription ? "Read Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>



          <View style={styles.sizes}>
            {PizzaSize.map((size) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedSize(size);
                }}
                style={[
                  styles.size,
                  {
                    backgroundColor:
                      selectedSize === size ? "gainsboro" : "white",
                  },
                ]}
                key={size}
              >
                <Text
                  style={[
                    styles.sizeText,
                    {
                      color: selectedSize === size ? "black" : "gray",
                    },
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>



          <View className="mt-5 flex-1 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold text-slate-500">
              Item price:
              </Text>
              <Text className="text-2xl font-bold">${item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => addItemToCart(item)}
              className="bg-black flex justify-end w-40 p-3 rounded-xl"
            >
              {addedToCart ? (
                <View>
                  <Text className="text-white text-base text-center">
                    Added to Cart
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-base text-center">
                  Add to cart
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreens;

const styles = StyleSheet.create({
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
