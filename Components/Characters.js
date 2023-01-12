import React, { useState,useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView,TouchableOpacity,Image,ActivityIndicator } from "react-native";
import { getinfo } from "../actions/http";
import theme from "../theme/Config";

function Characters({data}) {
 
  const [episodes, setepisodes] = useState([]);
  const [checkData, setcheckData] = useState(true);
  
  useEffect(() => {
    let isCancelled = false;
    const id = data.id;
    async function getData() {
      const data = await getinfo(id);
 
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
  const cleanHTML = (html) => {
      return html.replace(/<[^>]*>?/gm, "");
    };
    
    return (
        <ScrollView style={{ flex: 1 ,paddingHorizontal:10,paddingVertical:8  }}>

<Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Geners</Text>
                      <View style={{fontFamily: 'pop-regular', color:theme.text.theme, flexDirection: "row", flexWrap: 'wrap'}}>{(data.genres?.map((item)=>(
                        <View key={`${item}1`} style={style.genersContainer}>
                          <Text key={item} style={style.geners}>{item}</Text>
                        </View>
                      )))}</View>
      <Text style={{ fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10  }}>
       Characters
      </Text>
      <View style={{flex:1}}>

      
      {checkData!=false? (
        <View style={style.container}>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) :
      <FlatList
                  initialNumToRender={10}
                  style={{ height: 200}}
                  data={data.characters}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[style.episodeTitle, { marginRight: 10 }]}
                      key={item.id}
                     
                    >
                      <Text style={{fontFamily: 'pop-bold', fontSize: 10,color:theme.text.text ,textAlign:"center"}}>
                        {item.name.first}
                      </Text>
                      <Image
                        style={{ height: 130, width: 100 ,borderRadius:10 }}
                        source={{
                          uri: item.image,
                        }}
                      />
                       <Text style={{fontFamily: 'pop-bold', fontSize: 10, color:theme.text.text ,textAlign:"center"}}>
                        {item.role}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.number}
                  showsVerticalScrollIndicator={false}
                />
                      }
                      </View>
     
    </ScrollView>
  );
}
export default Characters;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  height:"100%"
  },
  episodeTitle: {
    marginBottom: 10,
    width: 100,
    paddingRight: 10,
    // backgroundColor: theme.bg.wallpaper,
  },
  genersContainer:{
    justifyContent: "center",
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "red",
    marginHorizontal: 5,
    marginBottom: 8,
  },
  geners:{
    color: '#000',
    fontFamily: 'pop-medium',
  },
});
