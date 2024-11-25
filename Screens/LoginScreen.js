import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const colors = {
  white: "#FFFFFF",
  primary: "#45484A",
  secondary: "#AEB5BB",
  gray: "#D9D9D9",
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

 
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
  
          navigation.replace("Tab");
        } else {
          console.log("No token found");
        }
      } catch (err) {
        console.log("Error fetching token:", err);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://molla-backend.vercel.app/api/user/signin", user)
      .then((response) => {
       
        const token = response.data.token

        AsyncStorage.setItem("authToken", token);
        navigation.replace("Tab");
      })
      .catch((error) => {
        let errorMessage = "An error occurred while Login";
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "No response received from the server";
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }

        Toast.show({
          type: "error",
          text1: "Login Error",
          text2: errorMessage,
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
          textStyle: { color: "white", fontSize: 18 },
          style: {
            backgroundColor: "#d9534f",
            padding: 15,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          },
        });

        console.log("login failed", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content" // Set text color to light
        backgroundColor="black" // Set background color
       
      />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-6 flex-1">
            {/* <TouchableOpacity
              onPress={handleGoBack}
              className="rounded-full flex justify-center items-center w-10 h-10 bg-[#D9D9D9]"
            >
              <Ionicons
                name={"arrow-back-outline"}
                color={colors.primary}
                size={25}
              />
            </TouchableOpacity> */}

            <View className="my-8">
              <Text className="font-semibold" style={styles.headingText}>
                Hey,
              </Text>
              <Text className="font-semibold" style={styles.headingText}>
                Welcome
              </Text>
              <Text className="font-semibold" style={styles.headingText}>
                Back
              </Text>
            </View>

            {/* form */}
            <View className="mt-5 flex-1 p-2">
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

              <View className="flex flex-row rounded-xl gap-4 mt-6  items-center border border-gray-300 p-2">
                <SimpleLineIcons
                  name={"lock"}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  className="flex-1  text-base text-gray-700"
                  placeholder="Enter your password"
                  value={password}
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

              <TouchableOpacity>
                <Text className="text-right mt-4 font-semibold text-base ">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                className="mt-14 py-2"
                style={styles.loginButtonWrapper}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color={colors.white} />
                ) : (
                  <Text style={styles.loginText}>Login</Text>
                )}
              </TouchableOpacity>
              <View style={styles.footerContainer}>
                <Text style={styles.accountText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={handleSignup}>
                  <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    backgroundColor: '#008397',
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
    borderWidth: 2,
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
