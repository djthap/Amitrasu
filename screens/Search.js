import { StatusBar } from "expo-status-bar";
import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  FlatList,
  Modal,
  Alert,
  SafeAreaView,
  Dimensions,
  useWindowDimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable
} from "react-native";
import theme from "../theme/Config";

import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchAnime } from "../actions/http";
import Card from "../Components/Card";
import ModalCard from "../Components/ModalCard";

export default function Search({navigation}) {
  const [Data, setData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [list, setlist] = useState([]);
  const { width, height } = useWindowDimensions();

  // const adjusthight = height < 380 ? 5 : 10;

 async function handletext(enteredtext) {
  setloading(true)
    setData(enteredtext);
    const data = await SearchAnime(enteredtext);
    setlist(data.results);
    setloading(false)

  }
 
  function OnClick(id) {
    navigation.navigate("NewScreen", {
      id:id
  });
  }
  function handleAnime(id){
    navigation.navigate("Animedetails", {
        id:id,
        watchHistory: route.params.watchHistory
    });
}

  return (
    // <ScrollView style={styles.screen}>

    // <KeyboardAvoidingView style={styles.screen} behavior="position">

    // <ImageBackground
    //   style={[styles.view]}
    //   source={require("../assets/pics/bga.jpg")}
    // >

      <SafeAreaView style={{flex:1,paddingTop:35,  backgroundColor:theme.bg.wallpaper}}  >
          {/* <View >
            <Text style={styles.text}>Amaterasu</Text>
          </View> */}
          <View style={{flex:1}}>
          <View style={styles.inputContainer}>
          <Pressable onPress={navigation.goBack} style={{  left: "3%" ,width:"12%"}}>
              <Ionicons name="arrow-back-outline" size={45} color={theme.text.theme} />
          </Pressable>
            <TextInput 
              style={styles.textinput}
              onChangeText={handletext}
              autoFocus
              placeholder="This is a Search"
            />
           
          </View>
        {
          loading? <View style={[{flex:1,justifyContent:"center",backgroundColor:theme.bg.wallpaper }]}>
<ActivityIndicator color={"red"} size={"large"}/>
          </View>: <View style={styles.container}>
        
          <View style={[styles.listContainer,{flex:1}]}>
          
              <FlatList
                data={list}
                numColumns={3}
                renderItem={({ item }) => {
                  return <Card OnClick={OnClick} key={item}  id={item.id}  item={item} />;
                }}
                keyExtractor={(item) => item.id}
              />
            
            <View style={{ flex: 5 }}></View>
          </View>
          <StatusBar style="auto" />
        </View>
        }
       </View>
      </SafeAreaView>
    // </ImageBackground>

    // </KeyboardAvoidingView>
    // </ScrollView>
  );
}

const Dimensionswidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    alignItems: "center",
    flex: 1,
    opacity: 0.9,
  },
  container: {
    paddingVertical: Dimensionswidth < 380 ? 10 : 30,
flex:1,

    // paddingHorizontal: Platform.OS==="android"?16:16,
    padding: Platform.select({ android: 0, ios: 0 }),
  },
  heading2: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  text: {
    fontSize: 40,
    fontfamily: "hel-v1",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  box: {
    borderWidth: 1,
    flex: 1,
    borderColor: "red",
    justifyContent: "space-between",
    margin: 5,
  },
  inputContainer: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  textinput: {
    flex:1,
    paddingVertical: 10,
    paddingLeft:5,
    marginHorizontal:10,
    color:theme.text.theme,
    borderWidth: 1,
    borderColor:theme.text.theme


  },
  listContainer: {
    flex: 3,
    justifyContent: "center",
  },
  opacity: {
    backgroundColor: "transparent",
    opacity: 0.5,
  },
});
