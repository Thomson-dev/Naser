import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SliderBox } from "react-native-image-slider-box";
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

const ProductItem = ({ item }) => {
  return (
    <Pressable className=" mx-2 my-3" style={[{ width: itemWidth }]}>
      <Image
        className="w-full aspect-square object-contain
       "
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
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>${item?.price}</Text>
       
      </View>
    </Pressable>
  );
};

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://molla-backend.vercel.app/api/product"
        );

        setProducts(data.product);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView className="flex-1 p-3">
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View className="flex justify-between flex-row ">
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
        <View className="border mt-5 flex flex-row border-gray-300 p-2 rounded-lg items-center ">
          <AntDesign name="search1" size={18} color="black" />
          <TextInput
            className="flex-1 ml-4"
            placeholder="Search here..."
            placeholderTextColor="gray"
          />
        </View>

        {/* Search */}

        {/* category */}

        {/* category */}

        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={"#13274F"}
          inactiveDotColor="#90A4AE"
          ImageComponentStyle={{ width: "100%", marginTop: 10 }}
        />

        {/* product */}
        <View className="flex-row items-center mt-5  justify-center  flex-wrap ">
          {products?.map((item) => (
            <ProductItem item={item} key={item._id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
