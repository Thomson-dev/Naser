import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from "./LoginScreen";

const slides = [
  {
    id: 1,
    title: "Welcome to FASTGAK",
    description:
      "Discover the latest fashion & trends in menswear & womenswear at ASOS.",
    image: require("../assets/slider-img-1.png"),
  },
  {
    id: 2,
    title: "Smartphones for Every Need",
    description:
      "Explore the latest smartphones with cutting-edge technology and sleek designs. Find your perfect match today.",
    image: require("../assets/slider-img-2.png"),
  },
  {
    id: 3,
    title: "Fresh Accessories & Footwear",
    description:
      "Complement your look with our exclusive accessories and footwear. Step out in style today.",
    image: require("../assets/slider-img-3.png"),
  },
];

const OnboardingScreen = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Artificially delay for three seconds to simulate a slow loading experience.
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setShowOnboarding(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: "#008397",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  if (showLogin) {
    return <LoginScreen />;
  } else if (showOnboarding) {
    return (
      <>
        <StatusBar
          barStyle="light-content" // Set text color to light
          backgroundColor="black" // Set background color
        />
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
            backgroundColor: "#008397",
            width: 30,
          }}
          renderDoneButton={() => buttonLabel("Done")}
          showSkipButton
          renderNextButton={() => buttonLabel("Next")}
          renderSkipButton={() => buttonLabel("Skip")}
          onDone={() => {
            setShowOnboarding(false);
            setShowLogin(true);
          }}
        />
      </>
    );
  } else {
    return null;
  }
};

export default OnboardingScreen;