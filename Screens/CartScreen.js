import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setCart } from "../features/CartReducer"; // Adjust the import path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../features/CartReducer";
import { AntDesign } from "@expo/vector-icons";

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item.price * item.quantity);




  return (
    <View className="flex-1 gap-4 items-center flex-row p-4">
      <Image
        source={{ uri: item.image }}
        className="w-24 rounded-md aspect-square"
      />
      <View className="flex-1 space-y-4">
        <Text className="text-base font-semibold">{item.name}</Text>
        <View className="flex-1 flex-row gap-3 justify-between items-center">
          <Text className="text-base text-slate-700 font-bold">
            {formattedPrice}
          </Text>
          <View className="flex-row justify-between items-center">
            {item?.quantity > 1 ? (
              <TouchableOpacity
                onPress={() => onDecrement(item._id)}
                className="w-9 border aspect-square justify-center items-center rounded-full"
              >
                <AntDesign name="minus" size={16} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onRemove(item._id)}
                className="w-9 border aspect-square justify-center items-center rounded-full"
              >
                <AntDesign name="delete" size={18} color="red" />
              </TouchableOpacity>
            )}
            <Text className="px-2 font-semibold">{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onIncrement(item._id)}
              className="w-9 aspect-square border justify-center items-center rounded-full"
            >
              <Ionicons name="add" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ _id: id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ _id: id }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ _id: id }));
    
  };
  const total = cart
  ?.map((item) => item.price * item.quantity)
  .reduce((curr, prev) => curr + prev, 0);


  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center p-4">
          <Image
            className="rounded-full w-10 h-10"
            source={require("../assets/user-img.jpg")}
          />
          <Text className="flex-1 text-lg font-bold text-center">Cart</Text>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>

        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal: </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{formattedTotal}</Text>
        </View>

        <Pressable
         disabled={cart.length === 0}
          onPress={() => navigation.navigate("Confirm")}
      
          style={{
            backgroundColor: cart.length === 0 ? "#ccc" : "#008E97", 
            padding: 15,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text className="text-white">
            Proceed to Buy ({cart.length}) items
          </Text>
        </Pressable>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <View className="flex-1  p-4">
            {/* <Text className="text-lg font-semibold ">Your cart is empty</Text> */}
          </View>
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {cart.map((item) => (
              <View className="flex-1" key={item._id}>
                <CartItem
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onRemove={handleRemoveItem}
                />
              </View>
            ))}
          </ScrollView>
        )}

        {/* Footer */}
        {/* {cart.length > 0 && (
          <View
            className="py-4 px-2 rounded-xl my-5 mx-5"
            style={styles.footer}
          >
            <View>
              <Text className="text-base font-semibold text-slate-500">
                Total price:
              </Text>
              <Text className="text-2xl font-bold">$2000</Text>
            </View>
            <TouchableOpacity className="bg-black w-32 p-4 rounded-xl">
              <Text className="text-white text-base text-center">Buy Now</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
