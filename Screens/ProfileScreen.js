import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

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
  }, [userId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://molla-backend.vercel.app/api/user/profile/${userId}`
        );

        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://molla-backend.vercel.app/api/orders/${userId}`
        );
        const orders = response.data.orders;

        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error.message);
      }
    };

    fetchOrders();
  }, [userId]);
  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView style={{ padding: 10, flex: 1 }}>
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
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Welcome {user?.username}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <TouchableOpacity
           onPress={() => navigation.navigate("YourOrders")}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Your orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={() => navigation.navigate("Account")}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Your Account</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Buy Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Logout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Text className="p-4">Loading...</Text>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <Pressable
                style={{
                  marginTop: 20,
                  padding: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#d0d0d0",
                  marginHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={order._id}
              >
                {/* Render the order information here */}
                {order.products.slice(0, 1)?.map((product) => (
                  <View style={{ marginVertical: 10 }} key={product._id}>
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 100, height: 100, resizeMode: "cover" }}
                    />
                  </View>
                ))}
              </Pressable>
            ))
          ) : (
            <Text>No orders found</Text>
          )}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
