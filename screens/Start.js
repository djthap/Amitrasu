import { React, useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

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
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";

import { getTrending, narutoAnime, SearchAnime } from "../actions/http";
import Card from "../Components/Card";
import ModalCard from "../Components/ModalCard";
import CarouselCard from "../Components/CarouselCard";
import theme from "../theme/Config";

export default function Start({ navigation }) {
  const [loading, setloading] = useState(true);
  const [trendingData, settrendingData] = useState([]);
  const [narutoData, setnarutoData] = useState([]);


  useEffect(() => {
    let isCancelled = false;

    async function getData() {
      const data = await getTrending();
      const data2 = await narutoAnime(); 
      settrendingData(data.results);
      setnarutoData(data2.results);
      // console.log(data.results[0].image)
      setloading(false);
    }

    if (!isCancelled) {
      getData();
    }
    return () => {
      isCancelled = false;
    };
  }, []);

  function handleAnime(id) {
    navigation.navigate("NewScreen", {
      id: id,
    });
  }

  const cleanHTML = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
  };
  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: theme.bg.wallpaper,
          }}
        >
            <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg.wallpaper }}>
          <View style={style.header}>
            <View style={{ width: "80%", flexDirection: "row" }}>
              <View style={{ width: "20%", marginLeft: 10 }}>
                <Image
                  style={{ height: 50, width: 50, borderRadius: 10 }}
                  source={require("../assets/adaptive-icon2.png")}
                ></Image>
              </View>

              <View style={{ width: "80%" }}>
                <Text style={style.heading}>Amitrasu</Text>
              </View>
            </View>

            {/* <Carousel/> */}
            <View style={{ width: "20%" }}>
              <Pressable
                onPress={() => navigation.navigate("Search")}
                style={{
                  position: "absolute",
                  right: 20,
                }}
              >
                <Ionicons name="search" size={40} color={theme.text.theme} />
              </Pressable>
            </View>
          </View>

          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: theme.bg.wallpaper,
              }}
            >
              <ActivityIndicator color={"red"} size={45} />
            </View>
          ) : (
            <View style={[{ flex: 1, backgroundColor: theme.bg.wallpaper }]}>
              <View style={style.Card}>
                <CarouselCard data={trendingData} navigation={navigation} />
              </View>
              <View style={{ backgroundColor: theme.bg.wallpaper }}>
                <View style={{ flexDirection: "row", marginVertical: 10,alignItems:"center" }}>
                  <FontAwesome
                    name="history"
                    size={17}
                    color={theme.text.heading}
                  />
                  <Text
                    style={{
                      fontSize: 19,
                      marginLeft: 6,
                      backgroundColor: theme.bg.wallpaper,
                      color: theme.text.heading,
                    }}
                  >
                    Naruto
                  </Text>
                </View>
                <FlatList
                  initialNumToRender={10}
                  style={{ height: 120, backgroundColor: theme.bg.wallpaper }}
                  data={narutoData}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[style.episodeTitle, {marginRight: 10 }]}
                      key={item.id}
                      onPress={() => handleAnime(item.id)}
                    >
                      <Image
                        style={{ height: 90, width: 90 ,borderRadius:10 }}
                        source={{
                          uri: item.image,
                        }}
                      />
                      <Text style={{fontFamily: 'pop-bold', fontSize: 10,color:"red" ,textAlign:"center"}}>
                      {item.title.english != null
                              ? item.title.english.substr(0, 10)
                              : item.title.userPreferred.substr(0, 10)}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.number}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              <View style={{ flexDirection: "row", marginVertical: 10,alignItems:"center"  }}>
                <FontAwesome name="list" size={17} color={theme.text.heading} />
                <Text
                  style={{
                    fontSize: 19,
                    marginLeft: 6,
                    backgroundColor: theme.bg.wallpaper,
                    color: theme.text.heading,
                  }}
                >
                  Trending
                </Text>
              </View>
              <View style={{ flex: 1, paddingBottom: 30 }}>
                <FlatList
                  style={{ flex: 1 }}
                  data={trendingData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={style.episodeTitle2}
                      key={item.number}
                      onPress={() => handleAnime(item.id)}
                    >
                      <View style={{ width: "35%" }}>
                        <Image
                          style={{
                            height: 70,
                            width: "100%",
                            borderRadius: 10,
                          }}
                          source={{
                            uri: item.image,
                          }}
                        />
                      </View>
                      <View style={{ width: "65%" }}>
                        <View style={{ alignItems: "center" }}>
                          <Text
                            style={{ color: theme.text.heading, fontSize: 15,fontFamily: "lob-bold" }}
                          >
                            {item.title.english != null
                              ? item.title.english.substr(0, 17)
                              : item.title.userPreferred.substr(0, 17)}
                          </Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                          <Text
                            style={{
                              color: theme.text.theme,
                              fontSize: 10,
                              lineHeight: 10,
                              height: 30,
                            }}
                          >
                            {cleanHTML(item.description.substr(0, 90))}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              width: "50%",
                              fontSize: 10,
                              color: "gold",
                              paddingLeft: 10,
                              paddingTop: 8,
                            }}
                          >
                            Rating:{item.rating}
                          </Text>
                          <Text
                            style={{
                              width: "50%",
                              fontSize: 10,
                              color: "gold",
                              textAlign: "right",
                              paddingRight: 10,
                              paddingTop: 8,
                            }}
                          >
                            release:{item.releaseDate}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.number}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
}

const style = StyleSheet.create({
  header: {
    marginTop: 40,

    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    flexDirection: "row",
    backgroundColor: theme.bg.wallpaper,
  },
  container: {
    flex: 1,

    marginTop: "8%",
    height: "9%",
    maxHeight: "9%",
    flexDirection: "row",

    backgroundColor: theme.bg.wallpaper,
  },
  episodeTitle: {
    marginBottom: 10,
    width: 100,
    paddingRight: 10,
    paddingLeft: 5,
    backgroundColor: theme.bg.wallpaper,
  },
  episodeTitle2: {
    marginBottom: 10,
    width: "100%",
    height: 70,
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: theme.bg.wallpaper,
  },
  Card: {
    flex: 1,
    marginTop: 20,
    maxHeight: 200,

    backgroundColor: theme.bg.wallpaper,
  },

  image: {},
  heading: {
    flex: 1,
    fontSize: 36,
    textAlign: "center",
    fontFamily: "lob-bold",
    backgroundColor: theme.bg.wallpaper,
    color: theme.text.heading,
  },
});
