import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

const MyAccount = () => {
  const navigation = useNavigation();
  const colors = {
    white: "#FFFFFF",
    primary: "#45484A",
    secondary: "#AEB5BB",
    gray: "#D9D9D9",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `https://molla-backend.vercel.app/api/user/profile/${userId}`
        );
        const user = response.data.user;

        setUsername(user.username);
        setEmail(user.email);
        // You may want to handle the password differently
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://molla-backend.vercel.app/api/user/update-profile/${userId}`,
        {
          username,
          email,
          password,
        }
      );
      // Handle success response
     
      alert("Profile updated successfully");
    } catch (error) {
      // Handle error response
    
      alert(`Failed to update profile: ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        barStyle="light-content" // Set text color to light
        backgroundColor="black" // Set background color
      />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name={"arrow-back-outline"} size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 3 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4" style={styles.formContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            <Pressable
              onPress={handleUpdateProfile}
              style={styles.addButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.addButtonText}>Update</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#3f3f3f",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f6f6f6",
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: "#3f3f3f",
  },
  addButton: {
    backgroundColor: "#008E97",
    borderRadius: 8,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});