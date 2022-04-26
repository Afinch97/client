import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, TextInput, View, Button, AppRegistry } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register, Login, Profile, Home, Details } from './components';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme, 
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

function App() {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Login">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
