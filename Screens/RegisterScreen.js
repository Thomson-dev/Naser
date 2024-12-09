import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const colors = {
  white: "#FFFFFF",
  primary: "#45484A",
  secondary: "#AEB5BB",
  gray: "#D9D9D9",
};

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  console.log(email, password, name);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    setIsLoading(true); // Start loading
    const user = {
      username: name,
      email: email,
      password: password,
    };

    // send a POST request to the backend API to register the user
    axios
      .post("https://molla-backend.vercel.app/api/user/signup", user)
      .then((response) => {
        console.log(response);

        // Toast.show({
        //   type: "success",
        //   text1: "Registration successful",
        //   text2: "You have been registered successfully",
        //   position: "top",
        //   visibilityTime: 4000,
        //   autoHide: true,
        //   topOffset: 50,
        //   bottomOffset: 40,
        //   textStyle: { color: "white", fontSize: 18 },
        //   style: {
        //     backgroundColor: "#5cb85c", // Green color for success
        //     padding: 15,
        //     borderRadius: 8,
        //     shadowColor: "#000",
        //     shadowOffset: { width: 0, height: 2 },
        //     shadowOpacity: 0.3,
        //     shadowRadius: 4,
        //     elevation: 5,
        //   },
        // });

        setIsSuccess(true);
        setModalMessage("Registration successful");
        setModalVisible(true);
        setTimeout(() => {
          navigation.replace("Login");
        }, 1000);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("registration failed", error);

        let errorMessage = "An error occurred while registering";
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

        // Toast.show({

      
        //   type: "error",
        //   text1: "Registration Error",
        //   text2: errorMessage,
        //   position: "top",
        //   visibilityTime: 4000,
        //   autoHide: true,
        //   topOffset: 50,
        //   bottomOffset: 40,
        //   textStyle: { color: "white", fontSize: 18 },
        //   style: {
        //     backgroundColor: "#d9534f", // Red color for error
        //     padding: 15,
        //     borderRadius: 8,
        //     shadowColor: "#000",
        //     shadowOffset: { width: 0, height: 2 },
        //     shadowOpacity: 0.3,
        //     shadowRadius: 4,
        //     elevation: 5,
        //   },
        // });
        setIsSuccess(false);
        setModalMessage(errorMessage);
        setModalVisible(true);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content" // Set text color to light
        backgroundColor="black" // Set background color
       
      />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-6 flex-1">
            <TouchableOpacity
              onPress={handleGoBack}
              className="rounded-full flex justify-center items-center w-10 h-10 bg-[#D9D9D9]"
            >
              <Ionicons
                name={"arrow-back-outline"}
                color={colors.primary}
                size={25}
              />
            </TouchableOpacity>

            <View className="my-8">
              <Text className="font-semibold" style={styles.headingText}>
                Let's get
              </Text>
              <Text className="font-semibold" style={styles.headingText}>
                started
              </Text>
            </View>

            {/* Form */}
            <View className="mt-5 flex-1 p-2">
              <View className="flex flex-row rounded-xl gap-2 p-2 items-center border border-gray-300  ">
                <AntDesign name="user" size={30} color={colors.secondary} />

                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={colors.secondary}
                  keyboardType="default"
                />
              </View>

              <View className="flex flex-row rounded-xl gap-2 p-2 mt-6 items-center border border-gray-300 px-1">
                <Ionicons
                  name={"mail-outline"}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                />
              </View>

              <View className="flex flex-row rounded-xl gap-2 p-2 mt-6 items-center border border-gray-300  px-1"> 
                <SimpleLineIcons
                  name={"lock"}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  className="flex-1 text-base text-gray-700"
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
             

              <TouchableOpacity
                onPress={handleSignup}
                className="mt-14 py-2"
                style={styles.loginButtonWrapper}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color={colors.white} />
                ) : (
                  <Text style={styles.loginText}>Sign up</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footerContainer}>
                <Text style={styles.accountText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.signupText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    backgroundColor: 'colors.gray',
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
    backgroundColor: '#008397',
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16, 
    color: colors.primary,
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