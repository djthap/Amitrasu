import { View, Text, ActivityIndicator,StyleSheet, ImageBackground,Pressable,Image,FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getinfo } from '../actions/http';
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from "../theme/Config";
export default function Description({route,navigation}) {

const [animeDescription, setAnimeDescription] = useState();
const [episodes, setepisodes] = useState([]);
const [checkData, setcheckData] = useState(true);

useEffect(() => {
  let isCancelled =false
  const id  = route.params.id;
  async  function getData(){
    const data = await getinfo(id)
setAnimeDescription(data)
setepisodes(data.episodes.reverse())
setcheckData(false)
  }

  if(!isCancelled){
    getData()
  }
  return () => {
    isCancelled = false
  };
}, []);

async function handleEpisode(id){


  navigation.navigate("WatchVideo", {
    id,
    animeDetails: animeDescription,
    episodeLists : episodes
  })
}


  return (
  
    <View style={{flex:1}}>
      {
checkData ?( <View style={styles.container}>
<ActivityIndicator size="large" color={"red"}/>
</View>):(
<View  style={styles.display}>
  <View style={styles.imageBanner}>

  <ImageBackground style={styles.image} source={{uri: animeDescription.image}}>
  <LinearGradient   colors={["#bfafb2","#000"]} style={styles.overlay}></LinearGradient>
  <Pressable onPress={navigation.goBack} style={{position: 'absolute', top: "18%", left: "5%"}}>
              <Ionicons name="arrow-back-outline" size={25} color={theme.text.theme} />
          </Pressable>
          <Text style={styles.AnimeTitle}>{animeDescription.title.userPreferred?animeDescription.title.userPreferred:animeDescription.title.english}</Text>
          <Image source={{uri: animeDescription.image}} style={styles.CoverImage} />
  </ImageBackground>
  </View>
<View style={{paddingHorizontal: 10, flex: 1,backgroundColor:theme.bg.wallpaper,paddingBottom:30}}>
<View style={{flex: 1, height: 200}}>
                <FlatList
                  initialNumToRender={10}
                  style={{flex: 1}}
                  data={episodes}
                  renderItem={({item})=>(
                    <TouchableOpacity style={styles.episodeTitle} onPress={()=> handleEpisode(item.id)}>
                        <Text style={{fontSize: 22, fontFamily: "lob-bold", color:theme.text.theme}}>{item.number}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item)=>item.number}
                  numColumns={4}
                   showsVerticalScrollIndicator={false}
                 ListHeaderComponent={

                  <>
                    <View style={{paddingTop: 20}}>
                      <Text style={{fontFamily: 'pop-bold',color:theme.text.heading,paddingBottom: 5}}>Description</Text>
                      <Text style={[styles.description,{color:theme.text.theme}]}>{animeDescription.description}</Text>
                      <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Geners</Text>
                      <View style={{fontFamily: 'pop-regular', color:theme.text.theme, flexDirection: "row", flexWrap: 'wrap'}}>{(animeDescription.genres?.map((item)=>(
                        <View key={`${item}1`} style={styles.genersContainer}>
                          <Text key={item} style={styles.geners}>{item}</Text>
                        </View>
                      )))}</View>
                      <View style={{flexDirection: 'row', flexWrap: "wrap", marginTop: 10}}>
                        <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Status:</Text>
                        <Text style={{fontFamily: 'pop-regular', color:theme.text.highlight, paddingHorizontal: 10}}>{animeDescription.status}</Text>
                        <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Release Date:</Text>
                        <Text style={{fontFamily: 'pop-regular', color:theme.text.highlight, paddingHorizontal: 10}}>{animeDescription.releaseDate}</Text>
                        <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Sub Or Dub:</Text>
                        <Text style={{fontFamily: 'pop-regular', color:theme.text.highlight, paddingHorizontal: 10}}>{animeDescription.subOrDub.toUpperCase()}</Text>
                        <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Anime type:</Text>
                        <Text style={{fontFamily: 'pop-regular', color:theme.text.highlight, paddingHorizontal: 10}}>{animeDescription.type}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", marginVertical: 10}}>
                        <Ionicons  name="list-outline" size={25} color={"red"} />
                        <Text style={{
                          fontFamily: "pop-bold",color:theme.text.heading, alignItems: "center",paddingHorizontal: 5, fontSize: 18
                        }}>Episode List</Text>
                    </View>
                  </>
                }
                />
                </View>
</View>
</View>

)
      }
      
   
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
flex:1,
justifyContent:"center",
alignContent:"center",
backgroundColor:theme.bg.wallpaper 



  },
  episodeTitle:{
    borderWidth: 2,
    borderColor: "#fff",
    padding: 3,
    margin: 5,
    width: "22.5%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  description:{
    fontFamily: "pop-regular",
    color:theme.text.theme,
    marginBottom: 10

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
 
  display:{
flex:1,
  },
  image:{
    width:"100%",
    height:"100%"

  },
  imageBanner:{
    height:"26%",
    position:"relative"
    
  },
  overlay:{
    height: "100%",
    width: "100%",
    opacity:.7,
    position:"absolute"
  },
  AnimeTitle: {
    color:theme.text.theme,
    fontSize: 20,
    position: "absolute",
    bottom: 20,
    marginHorizontal: 10,
    width: "60%",
    fontFamily: "pop-medium"
  },
  description:{
    fontFamily: "pop-regular",
    color: '#fff',
    marginBottom: 10

  },
  CoverImage:{
    height: 180,
    width: 130,
    elevation: 10,
    position: 'absolute',
    right: "5%",
    bottom: "-10%",
    zIndex: 9,
    borderRadius: 10
  }
});
