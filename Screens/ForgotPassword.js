import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
const colors = {
  white: "#FFFFFF",
  primary: "#45484A",
  secondary: "#AEB5BB",
  gray: "#D9D9D9",
};
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
 
  const [isLoading, setIsLoading] = useState(false);

  const handleForgetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://molla-backend.vercel.app/api/user/send-otp', { email });
      // Handle success response
      console.log('OTP request successful:', response.data);
      navigation.navigate('EnterOtp', { email });
    } catch (error) {
      // Handle error response
      console.error('Error requesting OTP:', error);
      alert('Failed to request OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content" // Set text color to light
          backgroundColor="black" // Set background color
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className=" ">
            <Image
              className="w-full  h-[320px]"
              source={require("../assets/forgot.png")}
            />
          </View>

          <View>
            <View className="mx-4 ">
              <Text className="text-4xl tracking-widest text-black  font-bold">
                Forgot
              </Text>
              <Text className="text-4xl text-black tracking-widest  font-bold">
                Password?
              </Text>
            </View>
            <View className="px-3" style={styles.forgotDes}>
              <Text className="text-sm mt-2" style={styles.forgotDesLbl}>
                Don't worry! It happens, please enter the address associated
                with your account
              </Text>
            </View>
            <View className="mt-8 mx-9">
        <View className="flex flex-row rounded-xl gap-4 items-center border border-gray-300 p-2">
          <Ionicons
            name={"mail-outline"}
            size={30}
            color={colors.secondary}
          />
          <TextInput
            className="flex-1 text-base text-gray-700"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
          />
        </View>
      </View>
            <View className = 'p-6'>
              <TouchableOpacity
                onPress={handleForgetPassword}
                className=" py-4"
                style={styles.loginButtonWrapper}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text className = 'text-white text-center text-base' style={styles.loginText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: "relative",
    bottom: 40,
  },

  loginButtonWrapper: {
    backgroundColor: "#008397",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
