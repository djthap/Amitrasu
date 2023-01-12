import { StatusBar } from "expo-status-bar";
import { React, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";

import Search from "./screens/Search";
import Description from "./screens/Description";
import WatchVideo from "./screens/WatchVideo";
import Start from "./screens/Start";
import NewScreen from "./screens/NewScreen";


export default function App() {
  const slack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    'pop-bold': require("./assets/fonts/Poppins-Bold.ttf"),
    'pop-medium': require("./assets/fonts/Poppins-Medium.ttf"),
    'pop-regular': require("./assets/fonts/Poppins-Regular.ttf"),
    'lob-bold': require("./assets/fonts/LobsterTwo-Bold.ttf"),
    'lob-regular': require("./assets/fonts/LobsterTwo-Regular.ttf"),
    "hel-v1": require("./assets/fonts/HelveticaLTStd-Blk.otf"),
    "hel-v2": require("./assets/fonts/HelveticaLTStd-BlkCond.otf"),
    "hel-v3": require("./assets/fonts/HelveticaLTStd-BlkCondObl.otf")
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar  style='light' />
      <NavigationContainer>
        <slack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          
          <slack.Screen name="Start" component={Start} />
          <slack.Screen name="Search" component={Search} />
          <slack.Screen name="NewScreen" component={NewScreen}/>
          <slack.Screen name="Description" component={Description} />
          <slack.Screen name="WatchVideo" component={WatchVideo} />
        </slack.Navigator>
      </NavigationContainer>
      <View style={styles.bottomText}>
        <Text style={{ color: "white" }}>© Created by Djthap</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  bottomText: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
