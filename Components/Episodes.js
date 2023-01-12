import React, { useState,useEffect } from "react";
import { View,Switch, Text, FlatList, StyleSheet, ScrollView,TouchableOpacity,Image,ActivityIndicator } from "react-native";
import { getinfo } from "../actions/http";
import theme from "../theme/Config";
function Episodes({data,navigation,SubOrdub}) {
  const [episodes, setepisodes] = useState([]);
  const [checkData, setcheckData] = useState(true);
  const [animeDetails, setAnimeDetails] = useState([]);
  
  useEffect(() => {
    let isCancelled = false;
    const id = data.id;
    async function getData() {
      const data = await getinfo(id,SubOrdub);
      setAnimeDetails(data)
      setepisodes(data.episodes.reverse());
      setcheckData(false);
    }
    

    if (!isCancelled) {
      getData();
    }
    return () => {
      isCancelled = false;
    };
  }, [SubOrdub]);

    async function handleEpisode(idEpisode){


        navigation.navigate("WatchVideo", {
          id:idEpisode,
          animeDetails: animeDetails,
          episodeLists : episodes
        })
      }
  const cleanHTML = (html) => {
      return html.replace(/<[^>]*>?/gm, "");
    };
    
    return (
        <View style={{ flex: 1 ,paddingHorizontal:2,paddingVertical:8  }}>

      
      <View style={{ flex: 1 }}>
      {checkData? (
        <View style={style.container}>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) :(
        <FlatList
        style={{ flex: 1 }}
        data={episodes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={style.episodeTitle2}
            key={item.number}
            onPress={() => handleEpisode(item.id)}
          >
              <View style={{width:"15%",alignItems:"center" ,alignContent:"center",justifyContent:"center"}}>
<Text style={{fontSize:15 ,fontWeight: "bold"}}>
{item.number}
</Text>
              </View>
            <View style={{ width: "30%" }}>
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
            <View style={{ width: "55%" }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ color: theme.text.heading, fontSize: 13 }}
                >
                  {item.title!=null?item.title.substr(0, 17):"Title"
                  }
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 10,
                    lineHeight: 10,
                    height: 30,
                  }}
                >
                  {item.description!=null?cleanHTML(item.description.substr(0, 90)):null}
                </Text>
              </View>
              
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.number}
        showsVerticalScrollIndicator={false}
      />
      )
        
        }
            
        
              </View>
      </View>
     
  
  );
}
export default Episodes;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  
  },
    episodeTitle2: {
        marginBottom: 10,
        width: "100%",
        height: 70,
        paddingHorizontal: 10,
        flexDirection: "row"
        
      },
});
