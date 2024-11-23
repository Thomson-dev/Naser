import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Pressable } from "react-native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

const AddAddressScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const colors = {
    white: "#FFFFFF",
    primary: "#45484A",
    secondary: "#AEB5BB",
    gray: "#D9D9D9",
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

  const handleAddAddress = () => {
    setIsLoading(true);

    const address = {
      userId,
      name,
      mobileNo,
      houseNo,
      country,
      street,
      city,
      landmark,
      postalCode,
    };
    console.log(address);

    axios
      .post("https://molla-backend.vercel.app/api/address", {
        userId,
        name,
        mobileNo,
        houseNo,
        country,
        street,
        city,
        landmark,
        postalCode,
      })
      .then((response) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Address added successfully",
        });
        setName("");
        setCountry("");
        setMobileNo("");
        setHouseNo("");
        setCity("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message || "Failed to add address",
        });
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row justify-between items-center p-4">
            <TouchableOpacity
              className="rounded-full flex justify-center items-center w-10 h-10 bg-[#D9D9D9]"
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text className="flex-1 text-xl font-bold text-center">
              Address Details
            </Text>
          </View>

          <View className="" style={{ padding: 15 }}>
            <Text
              className="text-[#3f3f3f]"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Add your country
            </Text>

            <TextInput
              className="text-slate-500 rounded-lg bg-[#f6f6f6]"
              placeholder="Enter your name"
              value={country}
              onChangeText={(text) => setCountry(text)}
              style={{
                padding: 13,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            />

            <View style={{ marginVertical: 15 }}>
              <Text
                className="text-[#3f3f3f]"
                style={{ fontSize: 15, fontWeight: "bold" }}
              >
                City
              </Text>

              <TextInput
                className="text-slate-500 rounded-lg bg-[#f6f6f6]"
                placeholder="Enter your city"
                value={city}
                onChangeText={(text) => setCity(text)}
                style={{
                  padding: 13,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                }}
              />
            </View>

            <View style={{ marginVertical: 15 }}>
              <Text
                className="text-[#3f3f3f]"
                style={{ fontSize: 15, fontWeight: "bold" }}
              >
                Full name (First and last name)
              </Text>

              <TextInput
                className="text-slate-500 rounded-lg bg-[#f6f6f6]"
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  padding: 13,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                }}
              />
            </View>

            <View>
              <Text
                className="text-[#3f3f3f]"
                style={{ fontSize: 15, fontWeight: "bold" }}
              >
                Mobile number
              </Text>

              <TextInput
                className="text-slate-500 rounded-lg bg-[#f6f6f6]"
                placeholder="Enter your mobile number"
                value={mobileNo}
                onChangeText={(text) => setMobileNo(text)}
                style={{
                  padding: 13,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                }}
              />
            </View>

            <View style={{ marginVertical: 15 }}>
              <Text
                className="text-[#3f3f3f]"
                style={{ fontSize: 15, fontWeight: "bold" }}
              >
                Flat, House No, Building, Company
              </Text>

              <TextInput
                className="text-slate-500 rounded-lg bg-[#f6f6f6]"
                placeholder="Enter your street address"
                value={houseNo}
                onChangeText={(text) => setHouseNo(text)}
                style={{
                  padding: 13,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                }}
              />
            </View>

            <View>
              <Text
                className="text-[#3f3f3f]"
                style={{ fontSize: 15, fontWeight: "bold" }}
              >
                Area, Street, Sector, Village
              </Text>
              <TextInput
                className="text-slate-500 rounded-lg bg-[#f6f6f6]"
                placeholder="Enter your address"
                value={street}
                onChangeText={(text) => setStreet(text)}
                style={{
                  padding: 13,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                }}
              />
            </View>

            <View style={{ marginVertical: 15 }}>
              <Text
                className="text-[#3f3f3f]"
                style={{ fontSize: 15, fontWeight: "bold" }}
              >
                Landmark
              </Text>
              <TextInput
                className="text-slate-500 rounded-lg bg-[#f6f6f6]"
                placeholder="Enter your landmark"
                onChangeText={(text) => setLandmark(text)}
                placeholderTextColor={"black"}
                style={{
                  padding: 13,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                }}
              />
            </View>

            <View>
              <Text
                className="text-[#3f3f3f]"
                style={{ fontSize: 15, fontWeight: "bold" }}
              >
                Post code
              </Text>

              <TextInput
                className="text-slate-500 rounded-lg bg-[#f6f6f6]"
                placeholder="Enter your address"
                value={postalCode}
                onChangeText={(text) => setPostalCode(text)}
                style={{
                  padding: 13,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                }}
              />
            </View>

            <Pressable
              onPress={handleAddAddress}
              className="bg-[#008E97] rounded-lg"
              style={{
                padding: 19,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white" style={{ fontWeight: "bold" }}>
                  Add Address
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;
