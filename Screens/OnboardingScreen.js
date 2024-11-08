import React, { useState } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";

const slides = [
  {
    id: 1,
    title: "Welcome to Our App",
    description:
      "Discover the latest fashion & trends in menswear & womenswear at ASOS. ",
    image: require("../assets/slider-img-1.png"),
  },
  {
    id: 2,
    title: "Choose A Tasty Dish",
    description:
      "Discover the latest fashion & trends in menswear & womenswear at ASOS. ",
    image: require("../assets/slider-img-2.png"),
  },
  {

    
    id: 3,
    title: "Pick Up The Delivery",
    description:
      "Discover the latest fashion & trends in menswear & womenswear at ASOS. ",
    image: require("../assets/slider-img-3.png"),
  },
];

const OnboardingScreen = () => {
  const [showHomePage, setShowHomePage] = useState(false);

  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: "blue",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  if (showHomePage) {
    return (
  <LoginScreen/>

    );
  } else {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 15,
                paddingTop: 100,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: "80%",
                  height: 400,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 24,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 5,
                  color: "black",
                }}
              >
                {item.description}
              </Text>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: "blue",
          width: 30,
        }}
 
        renderDoneButton={() => buttonLabel("Done")}
        onDone={() => {
          setShowHomePage(true);
        }}
      />
    );
  }
};

export default OnboardingScreen;
