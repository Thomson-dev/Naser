import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const colors = {
  white: "#FFFFFF",
  primary: "#45484A",
  secondary: "#AEB5BB",
  gray: "#D9D9D9",
};

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [secureEntery, setSecureEntery] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignup = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="p-6 flex-1  ">
        <TouchableOpacity className="rounded-full flex justify-center items-center w-10 h-10 bg-[#D9D9D9] ">
          <Ionicons
            name={"arrow-back-outline"}
            color={colors.primary}
            size={25}
          />
        </TouchableOpacity>

        <View className="my-8">
          <Text className="font-semibold " style={styles.headingText}>
            Let's get
          </Text>
          <Text className="font-semibold " style={styles.headingText}>
            started
          </Text>
        </View>

        {/* form */}
        <View className="mt-5   flex-1   p-2 ">
          <View className="flex flex-row rounded-xl gap-4 items-center border border-gray-300 p-2 ">
            <Ionicons
              name={"mail-outline"}
              size={30}
              color={colors.secondary}
            />
            <TextInput
              className="flex-1 text-base text-gray-700"
              placeholder="Enter your name"
              placeholderTextColor={colors.secondary}
              keyboardType="default"
            />
          </View>

          <View className="flex flex-row rounded-xl gap-4 mt-6 items-center border border-gray-300 p-2 ">
            <Ionicons
              name={"mail-outline"}
              size={30}
              color={colors.secondary}
            />
            <TextInput
              className="flex-1 text-base text-gray-700"
              placeholder="Enter your email"
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"
            />
          </View>

          <View className="flex flex-row rounded-xl gap-4 mt-6 items-center border border-gray-300 p-2 ">
            <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
            <TextInput
              className="flex-1 text-base text-gray-700"
              placeholder="Enter your password"
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"
            />
            <TouchableOpacity
              onPress={() => {
                setSecureEntery((prev) => !prev);
              }}
            >
              <SimpleLineIcons
                name={"eye"}
                size={20}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text className="text-right mt-4 font-semibold text-base text-slate-400 ">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-14" style={styles.loginButtonWrapper}>
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.signupText}>Sign Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    // fontFamily: fonts.SemiBold,
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
    // fontFamily: fonts.Light,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.primary,
    // fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  loginText: {
    color: colors.white,
    fontSize: 18,
    // fontFamily: fonts.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    // fontFamily: fonts.Regular,
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
    // fontFamily: fonts.SemiBold,
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
    // fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    // fontFamily: fonts.Bold,
  },
});
