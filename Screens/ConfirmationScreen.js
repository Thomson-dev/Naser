import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import { jwtDecode } from "jwt-decode";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const ConfirmationScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const steps = [
    { title: "Address", content: "Address Form" },

    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

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

  const handlePlaceOrder = async () => {};

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

  return (
    <SafeAreaView>
      <ScrollView style={{ marginTop: 10 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "space-between",
            }}
          >
            {steps?.map((step, index) => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: "#008E97" },
                      index <= currentStep && { backgroundColor: "#008E97" },
                    ]}
                  />
                )}
                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    index < currentStep && { backgroundColor: "#008E97" },
                  ]}
                >
                  {index < currentStep ? (
                    <Text
                      style={{
                        fontSize: 16,

                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      &#10003;
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text style={{ textAlign: "center", marginTop: 8 }}>
                  {step.title}
                </Text>
              </View>
            ))}
          </View>

          {currentStep == 0 && (
            <View className="mt-3">
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Select Delivery Address
              </Text>

              <Pressable onPress={() => setSelectedAdress(item)}>
                {addresses?.map((item, index) => (
                  <Pressable
                    style={{
                      borderWidth: 1,
                      borderColor: "#D0D0D0",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      paddingBottom: 17,
                      marginVertical: 7,
                      borderRadius: 6,
                    }}
                    onPress={() => setSelectedAdress(item)}
                  >
                    {selectedAddress && selectedAddress._id === item?._id ? (
                      <FontAwesome5
                        name="dot-circle"
                        size={20}
                        color="#008397"
                      />
                    ) : (
                      <Entypo
                        onPress={() => setSelectedAdress(item)}
                        name="circle"
                        size={20}
                        color="gray"
                      />
                    )}

                    <View style={{ marginLeft: 6 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                          {item?.name}
                        </Text>

                        <Text
                          className="bg-[#eeeded] p-2 w-fit rounded-md"
                          style={{ color: "#181818" }}
                        >
                          {item?.street}
                        </Text>
                        {/* <Entypo name="location-pin" size={24} color="red" /> */}
                      </View>

                      <Text
                        className="text-xs"
                        style={{ fontSize: 13, color: "#181818" }}
                      >
                        {item?.houseNo}, {item?.landmark}
                      </Text>

                      <Text
                        className="text-sm"
                        style={{ fontSize: 13, color: "#181818" }}
                      >
                        ({item?.mobileNo})
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                          marginTop: 7,
                        }}
                      >
                        <Pressable
                          style={{
                            backgroundColor: "#F5F5F5",
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: 5,
                            borderWidth: 0.9,
                            borderColor: "#D0D0D0",
                          }}
                        >
                          <Text>Edit</Text>
                        </Pressable>

                        <Pressable
                          style={{
                            backgroundColor: "#F5F5F5",
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: 5,
                            borderWidth: 0.9,
                            borderColor: "#D0D0D0",
                          }}
                        >
                          <Text>Remove</Text>
                        </Pressable>

                        <Pressable
                          style={{
                            backgroundColor: "#F5F5F5",
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: 5,
                            borderWidth: 0.9,
                            borderColor: "#D0D0D0",
                          }}
                        >
                          <Text>Set as Default</Text>
                        </Pressable>
                      </View>

                      <View>
                        {selectedAddress &&
                          selectedAddress._id === item?._id && (
                            <Pressable
                              onPress={() => setCurrentStep(1)}
                              style={{
                                backgroundColor: "#008397",
                                padding: 10,
                                borderRadius: 5,
                                justifyContent: "center",

                                alignItems: "center",
                                marginTop: 10,
                              }}
                            >
                              <Text
                                style={{ textAlign: "center", color: "white" }}
                              >
                                Deliver to this Address
                              </Text>
                            </Pressable>
                          )}
                      </View>
                    </View>
                  </Pressable>
                ))}
              </Pressable>
            </View>
          )}
        </View>
        {currentStep == 1 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Select your payment Method
            </Text>

            <Pressable
              onPress={() => setSelectedOption("cash")}
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
              }}
            >
              {selectedOption === "cash" ? (
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              ) : (
                <Entypo
                  onPress={() => setSelectedOption("cash")}
                  name="circle"
                  size={20}
                  color="gray"
                />
              )}

              <Text>Cash on Delivery</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setSelectedOption("card");
                Alert.alert("Debit card", "Pay Online", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel is pressed"),
                  },
                  {
                    text: "OK",
                    onPress: () => pay(),
                  },
                ]);
              }}
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
              }}
            >
              {selectedOption === "card" ? (
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              ) : (
                <Entypo
                  onPress={() => {
                    setSelectedOption("card");
                    Alert.alert("Debit card", "Pay Online", [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel is pressed"),
                      },
                      {
                        text: "OK",
                        onPress: () => pay(),
                      },
                    ]);
                  }}
                  name="circle"
                  size={20}
                  color="gray"
                />
              )}

              <Text> Credit or debit card</Text>
            </Pressable>
            <Pressable
              onPress={() => setCurrentStep(3)}
              disabled={!selectedOption}
              style={{
                backgroundColor:  !selectedOption ? "#ccc" : "#008E97",
                padding: 14,
                borderRadius: 10,
                
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text className="text-white font-bold">Continue</Text>
            </Pressable>
          </View>
        )}

        {currentStep === 3 && selectedOption === "cash" && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  Save 5% and never run out
                </Text>
                <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                  Turn on auto deliveries
                </Text>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text className="font-semibold">
                Shipping to {selectedAddress?.name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Items</Text>

                <Text style={{ fontSize: 16 }}>${total}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Delivery
                </Text>

                <Text style={{ fontSize: 16 }}>$0</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Order Total
                </Text>

                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  ${total}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Pay With</Text>

              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
                Pay on delivery (Cash)
              </Text>
            </View>

            <Pressable
              onPress={handlePlaceOrder}
              style={{
                backgroundColor: "#008397",
                padding: 15,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text className=" text-white font-bold ">Place your order</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;
