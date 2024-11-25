import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // Adjust the import path as needed
import DetailsScreens from "./Screens/DetailsScreens";
import PaymentScreen from "./Screens/PaymentScreen";
import TabNavigation from "./Component/TabNavigation";
import OnboardingScreen from "./Screens/OnboardingScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ConfirmationScreen from "./Screens/ConfirmationScreen";
import Toast from "react-native-toast-message";
import { ModalPortal } from "react-native-modals";
import AddAddressScreen from "./Screens/AddAddressScreen";
import OrderScreen from "./Screens/OrderScreen";
import DeliveryScreen from "./Screens/DeliveryScreen";
import { enableScreens } from 'react-native-screens';
import { StripeProvider } from "@stripe/stripe-react-native";

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  const STRIPE_KEY =
    "pk_test_51JR35pDcBGT3lmREe8J7TVNno7NubCSqQTKMoUDoHxTsHK4KEObkX54BG0efmtLeMxrdk6Sn4nuqUmeoT1ZaW1Vc00j64CUV9H";
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="Tab"
              component={TabNavigation}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreens}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="AddAddress"
              component={AddAddressScreen}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="Confirm"
              component={ConfirmationScreen}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="Order"
              component={OrderScreen}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{ animation: "slide_from_bottom" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <ModalPortal />
        <Toast />
      </StripeProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
