import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  FlatList,
  Switch,
  TouchableOpacity,
} from "react-native";
import { getinfo } from "../actions/http";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../theme/Config";
import Overview from "../Components/Overview";
import Episodes from "../Components/Episodes";
import Characters from "../Components/Characters";

function NewScreen({ route, navigation }) {
  const [animeDescription, setAnimeDescription] = useState();
  const [episodes, setepisodes] = useState([]);
  const [checkData, setcheckData] = useState(true);
  const [SubOrdub, setSubOrdub] = useState(false);
  const [loading, setloading] = useState(false);
  const [selected, setselected] = useState(1);
  const cleanHTML = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
  };
  const onClick = async (no) => {
    await setloading(true);
    await setselected(no);
    await setloading(false);
  };
  useEffect(() => {
    let isCancelled = false;
    const id = route.params.id;
    async function getData() {
      const data = await getinfo(id);
      setAnimeDescription(data);
      setepisodes(data.episodes.reverse());
      setcheckData(false);
    }

    if (!isCancelled) {
      getData();
    }
    return () => {
      isCancelled = false;
    };
  }, []);
  const handleDubOrSub = () => {
    setSubOrdub(!SubOrdub);
  };

  async function handleEpisode(id) {
    navigation.navigate("WatchVideo", {
      id,
      animeDetails: animeDescription,
      episodeLists: episodes,
      SubOrdub: SubOrdub,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      {checkData ? (
        <View style={style.container}>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
        <View style={style.display}>
          <View style={style.mainContainer}>
            <View style={style.header}>
              <Pressable onPress={navigation.goBack}>
                <Ionicons name="arrow-back" size={50} color="white" />
              </Pressable>
              <Text
                style={{
                  color: "red",
                  fontSize: 25,
                  flex: 1,

                  textAlign: "center",
                  paddingVertical: 12,
                  fontFamily: "lob-bold",
                }}
              >
                {animeDescription.title.english != null
                  ? animeDescription.title.english.substr(0, 10)
                  : animeDescription.title.userPreferred.substr(0, 10)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={style.box1}>
                <Image
                  source={{ uri: animeDescription.image }}
                  style={style.imageBox}
                />
              </View>
              <View style={style.box2}>
                <View style={{ flex: 1, marginTop: 130 }}>
                  <View style={{ height: 88, flexDirection: "row" }}>
                    <Image
                      source={{ uri: animeDescription.cover }}
                      style={{
                        height: 70,
                        width: 70,
                        marginLeft: 20,
                        marginTop: 10,
                        marginRight: 10,
                        borderRadius: 10,
                      }}
                    />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={{ width: "75%" }}>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 15,
                            marginHorizontal: 5,
                            fontWeight: "bold",

                            height: 50,
                            marginTop: 10,
                          }}
                        >
                          {animeDescription.title.english != null
                            ? animeDescription.title.english
                            : animeDescription.title.userPreferred}
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                          {animeDescription.episodes.length}{"    "}Episodes
                        </Text>
                      </View>
                      <View style={{ width: "25%", justifyContent: "center" }}>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={[
                              { marginBottom: 5 },
                              { color: SubOrdub ? "black" : "red" },
                            ]}
                          >
                            {SubOrdub ? "Dub" : "Sub"}
                          </Text>
                          <Switch
                            trackColor={{ false: "#808080", true: "#808080" }}
                            thumbColor={SubOrdub ? "black" : "red"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={handleDubOrSub}
                            value={SubOrdub}
                            style={{ backgroundColor: "black ", height: "25%" }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        height: 35,
                        flexDirection: "row",
                        paddingHorizontal: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          selected == 1 ? style.selectedBox : null,
                          {
                            width: "33%",
                            height: 35,
                            alignItems: "center",
                          },
                        ]}
                        onPress={() => onClick(1)}
                      >
                        <Text
                          style={[
                            selected == 1 ? style.selectedColor : null,
                            {
                              fontSize: 16,
                              fontWeight: "bold",
                            },
                          ]}
                        >
                          Overview
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          selected == 2 ? style.selectedBox : null,
                          {
                            width: "33%",
                            height: 35,
                            alignItems: "center",
                          },
                        ]}
                        onPress={() => onClick(2)}
                      >
                        <Text
                          style={[
                            selected == 2 ? style.selectedColor : null,
                            {
                              fontSize: 16,
                              fontWeight: "bold",
                            },
                          ]}
                        >
                          Episodes
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          selected == 3 ? style.selectedBox : null,
                          {
                            width: "33%",
                            height: 35,
                            alignItems: "center",
                          },
                        ]}
                        onPress={() => onClick(3)}
                      >
                        <Text
                          style={[
                            selected == 3 ? style.selectedColor : null,
                            {
                              fontSize: 16,
                              fontWeight: "bold",
                            },
                          ]}
                        >
                          Characters
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                      {loading != false ? (
                        <View style={style.container2}>
                          <ActivityIndicator size="large" color={"red"} />
                        </View>
                      ) : selected == 1 ? (
                        <Overview data={animeDescription} />
                      ) : selected == 2 ? (
                        <Episodes
                          navigation={navigation}
                          SubOrdub={SubOrdub}
                          episodes={episodes}
                          data={animeDescription}
                        />
                      ) : selected == 3 ? (
                        <Characters data={animeDescription} />
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default NewScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.bg.wallpaper,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 8,
    marginVertical: 5,
    backgroundColor: theme.bg.wallpaper,
  },
  mainContainer: {
    flex: 1,
    marginTop: 40,
  },
  display: {
    flex: 1,

    backgroundColor: theme.bg.wallpaper,
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
  },
  selectedColor: {
    color: "red",
    textDecorationLine: "underline",
  },
  selectedBox: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  box2: {
    marginTop: 125,
    height: 100,
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 35,
    borderRadius: 25,
    backgroundColor: "white",
    zIndex: 1,
  },
  box1: {
    height: 250,
    width: "100%",

    position: "absolute",
    zIndex: 2,
  },
  imageBox: {
    flex: 1,
    marginTop: 25,
    marginHorizontal: 55,
    borderRadius: 15,
    backgroundColor: "black",
  },
});
