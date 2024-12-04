import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const YourOrders = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.id);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `https://molla-backend.vercel.app/api/orders/${userId}`
        );
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="black" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <Image
          className="rounded-full w-10 h-10"
          source={require("../assets/user-img.jpg")}
        />
        <Text className="flex-1 text-lg font-bold text-center">My Orders</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {orders.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-lg font-bold">No orders found</Text>
          </View>
        ) : (
          orders.map((order) =>
            order.products.map((product) => (
              <View key={product._id} style={styles.orderContainer}>
                <View  style={styles.orderRow}>
                  <View className ='mb-10' style={styles.orderDetailsContainer}>
                    <Text style={styles.orderTitle}>{product.name}</Text>
                  </View>
                  <View style={styles.orderImageContainer}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.orderImage}
                    />
                  </View>
                </View>

                <View className="flex-row mt-8 justify-between ">
                  <Text className="text-base font-bold">
                    {order.paymentMethod}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-base font-bold">x{product.quantity}</Text>
                    <Text className="text-base font-bold ml-4">
                      ${product.price.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourOrders;

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetailsContainer: {
    flex: 1,
    paddingRight: 10,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  orderImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
});
