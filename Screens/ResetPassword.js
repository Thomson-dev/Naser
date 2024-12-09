import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const colors = {
  white: "#FFFFFF",
  primary: "#45484A",
  secondary: "#AEB5BB",
  gray: "#D9D9D9",
};

const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, otp } = route.params;
  const [secureEntry, setSecureEntry] = useState(true);
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email || !otp || !Password) {
      alert('All fields are required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://molla-backend.vercel.app/api/user/verify-otp', {
        email,
        otp,
        Password,
      });
      // Handle success response
      console.log('Password reset successful:', response.data);
      navigation.navigate('Login'); // Navigate to the Login screen after resetting the password
    } catch (error) {
      // Handle error response
      console.error('Error resetting password:', error.response.data);
      alert('Failed to reset password. Please try again.');
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
              className="w-full h-[320px]"
              source={require("../assets/reset.png")}
            />
          </View>

          <View>
            <View className="mx-4 ">
              <Text className="text-4xl tracking-widest text-black  font-bold">
                Reset
              </Text>
              <Text className="text-4xl text-black tracking-widest  font-bold">
                Password?
              </Text>
            </View>

            <View className="mt-8 mx-8">
              <View className="flex flex-row rounded-xl gap-2 mt-6  items-center border border-gray-300 p-2">
                <SimpleLineIcons
                  name={"lock"}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  className="flex-1  text-base text-gray-700"
                  placeholder="Enter your new password"
                  value={Password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={secureEntry}
                  placeholderTextColor={colors.secondary}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSecureEntry((prev) => !prev);
                  }}
                >
                  <Ionicons
                    name={secureEntry ? "eye-off" : "eye"}
                    size={20}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="p-6 mt-4">
            <TouchableOpacity
                onPress={handleResetPassword}
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

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.primary,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: "#008397",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
  },
  signupText: {
    color: colors.primary,
  },
});