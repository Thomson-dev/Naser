import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SliderBox } from "react-native-image-slider-box";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
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
  StatusBar,
} from "react-native";
import axios from "axios";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const itemWidth = (width - 60) / 2;

const images = [
  "https://plus.unsplash.com/premium_photo-1664475347754-f633cb166d13?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1643906226799-59eab234e41d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      className=""
      style={[
        { marginHorizontal: 10, marginVertical: 10 },
        { width: itemWidth },
      ]}
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
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const tabBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `https://molla-backend.vercel.app/api/address/${userId}`
      );

      setAddresses(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.id;

          setUserId(userId);
        }
      } catch (error) {
        console.log("Error fetching user", error);
      }
    };

    fetchUser();
  }, []);

  const fetchData = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchData();

    // const interval = setInterval(() => {
    //   fetchData();
    // }, 60000); // 1 minute in milliseconds

    // return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory && selectedCategory !== "All"
        ? product.category === selectedCategory
        : true;
    const matchesSearchText = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearchText;
  });

  return (
    <>
      <SafeAreaView className="flex-1">
        <StatusBar
          barStyle="light-content" // Set text color to light
          backgroundColor="black" // Set background color
        />
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

          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <Pressable>
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add a Address
                </Text>
              )}
            </Pressable>

            <Pressable>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </Pressable>
          </TouchableOpacity>

          <View className="p-3 mt-2">
            <Text className="text-2xl">Find The Most</Text>
            <Text className="text-2xl text-[#8ec0c0]">Luxurious products</Text>
          </View>

          {/* Search */}
          <View className="border mt-3 flex flex-row border-gray-300 p-2 mx-2 rounded-xl items-center">
            <AntDesign name="search1" size={18} color="black" />
            <TextInput
              className="flex-1  ml-4"
              placeholder="Search here..."
              placeholderTextColor="gray"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />

            <View>
              <Ionicons name="mic-outline" size={24} color="black" />
            </View>
          </View>



          {/* Slider */}
          <View className="">
            <SliderBox
              images={images}
              autoPlay
              circleLoop
              dotColor={"#13274F"}
              inactiveDotColor="#90A4AE"
              paginationBoxStyle={{ display: "none" }}
              dotStyle={{ display: "none" }}
              ImageComponentStyle={{
                width: "92%",
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          </View>

          {/* Category */}
          <ScrollView
            className="mt-3"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <View className="p-3" key={category}>
                <Pressable
                  key={index}
                  onPress={() => setSelectedCategory(category)}
                  className={`p-3 rounded-lg ${
                    selectedCategory === category
                      ? "bg-[#008E97] text-white"
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
          <View className="flex-row   mt-3 flex-wrap">
            {loading ? (
              <View className="flex items-center flex-1 justify-center">
                <ActivityIndicator size="large" color="#008E97" />
              </View>
            ) : (
              filteredProducts?.map((item) => (
                <View
                  key={item._id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <ProductItem
                    item={item}
                    key={item}
                    className=" "
                    navigation={navigation}
                  />
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 500 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 14, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {/* {addresses?.map((item, index) => (
              <Pressable
              onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Bangalore
                </Text>
              </Pressable>
            ))} */}

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("AddAddress");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("AddAddress");
                }}
              >
                Add an Address or pick-up point
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                key={item._id || index}
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 1,
                  backgroundColor:
                    selectedAddress === item ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item.country}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View> */}
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
