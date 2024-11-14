import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SliderBox } from "react-native-image-slider-box";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const itemWidth = (width - 60) / 2;

const images = [
  "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/10001826/pexels-photo-10001826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/8410814/pexels-photo-8410814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const ProductItem = ({ item, navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", {
          item,
          index: item.index,
          id: item.id,
        });
      }}
      className="mx-2 my-4 "
      style={[{ width: itemWidth }]}
    >
      <Image
        className="w-full rounded-md aspect-square object-contain"
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.name}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <Text style={{ fontSize: 15,  }}>${item?.price}</Text> */}
      </View>
    </Pressable>
  );
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true); 

  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://molla-backend.vercel.app/api/product"
        );

        setProducts(data.product);

        const uniqueCategories = [
          "All",
          ...new Set(data.product.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("error message", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory && selectedCategory !== "All"
      ? products.filter((product) => product.category === selectedCategory)
      : products;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1"
        vertical
        showsVerticalScrollIndicator={false}
      >
        <View className="flex justify-between p-4 flex-row">
          <View>
            <Image
              className="rounded-full w-10 h-10"
              source={require("../assets/user-img.jpg")}
            />
          </View>
          <View>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </View>
        </View>

        {/* Search */}
        <View className="border mt-5 flex flex-row border-gray-300 p-2 mx-4 rounded-lg items-center">
          <AntDesign name="search1" size={18} color="black" />
          <TextInput
            className="flex-1 ml-4"
            placeholder="Search here..."
            placeholderTextColor="gray"
          />
        </View>

        {/* Slider */}
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={"#13274F"}
          inactiveDotColor="#90A4AE"
          paginationBoxStyle={{ display: "none" }}
          dotStyle={{ display: "none" }}
          ImageComponentStyle={{ width: "100%", marginTop: 10 }}
        />

        {/* Category */}
        <ScrollView
          className="mt-3"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category, index) => (
            <View className="p-3" key={index}>
              <Pressable
                key={index}
                onPress={() => setSelectedCategory(category)}
                className={`p-3 rounded-lg ${
                  selectedCategory === category
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-center ${
                    selectedCategory === category ? " text-white" : ""
                  }`}
                >
                  {category}
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        {/* Product */}
        <View className="flex-row items-center mt-3 justify-center flex-wrap">
          {loading ? (
            <ActivityIndicator size="large" color="#008E97" />
          ) : (
            filteredProducts?.map((item) => (
              <ProductItem item={item} key={item._id} navigation={navigation} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
