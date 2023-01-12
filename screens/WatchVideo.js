import { View, Text, ActivityIndicator,StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { getAnimeVideoLink } from '../actions/http';
import {Dimensions} from 'react-native';
import theme from "../theme/Config";

import Ionicons,{FontAwesome} from '@expo/vector-icons/Ionicons';


const WatchVideo = ({route}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [Referer, setReferer] = useState('');
  const [backupUrl, setbackupUrl] = useState([]);
  const [animeDetails, setAnimeDetails] = useState([]);
  const [episodeLists, setepisodeList] = useState([]);
  const [videoId, setVideoId] = useState(route.params.id);
  const [videoStatus, setvideoStatus] = useState(true);
  const videoRef = useRef(null);

  function setOrientation() {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  useEffect(()=>{
    let isCancelled = false;
    async function getVideoUrl(){
      const VideoData = await getAnimeVideoLink(videoId);
      setVideoUrl(VideoData.sources[0].url);
      setbackupUrl(VideoData.sources[VideoData.sources.length - 1].url);
       setReferer(VideoData.headers.Referer);
      setAnimeDetails(route.params.animeDetails)
      setepisodeList(route.params.episodeLists)
      setvideoStatus(false)
    }
    if(!isCancelled){
      getVideoUrl();
    }
    return ()=>{
      isCancelled = true
    }
  }, [videoId, videoStatus])
  const handleEpisodeurl = () => {
    setVideoUrl(backupUrl)
  }


  async function handleEpisode(id)
  {
    setVideoId(id)
    setvideoStatus(true)
  }

  return (
    <View style={{flex: 1}}>
     { videoStatus ?  (
            <View style={styles.contianer}>
                <ActivityIndicator size="large" color={"red"} />
            </View>
            ) : 
            (
            <>
            <Video
              source={{ uri: videoUrl, headers: {"Referer": Referer,"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0"} }}
              ref={videoRef}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              onFullscreenUpdate={setOrientation}
              style={{ width: "100%", height: 238 }}
              posterSource={{uri: "https://media.tenor.com/Qp72t2HFhA0AAAAC/tako-tentacult.gif"}}
              usePoster={true}
              posterStyle={{
                resizeMode: "cover"
              }}
              useNativeControls
              onError={(e)=>{
                console.log(e)
                handleEpisodeurl();
              }}
              />
              <View style={{paddingHorizontal: 10, flex: 1, backgroundColor: theme.bg.wallpaper}}>
          
              <View style={{flex: 1, height: 200}}>
                  <FlatList
                    initialNumToRender={10}
                    style={{flex: 1}}
                    data={episodeLists}
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
                        <Text style={{fontFamily: 'pop-bold',color:theme.text.highlight,paddingBottom: 5, fontSize: 22}}>{animeDetails.title.english}</Text>
                        <Text style={{fontFamily: 'pop-bold', color:theme.text.heading,paddingBottom: 5}}>Description</Text>
                        <Text style={[styles.description,{color:theme.text.theme}]}>{animeDetails.description}</Text>
                        <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Geners</Text>
                        <View style={{fontFamily: 'pop-regular', color:theme.text.theme, flexDirection: "row", flexWrap: 'wrap'}}>{(animeDetails.genres?.map((item)=>(
                          <View key={`${item}1`} style={styles.genersContainer}>
                            <Text key={item} style={styles.geners}>{item}</Text>
                          </View>
                        )))}</View>
                        <View style={{flexDirection: 'row', flexWrap: "wrap", marginTop: 10}}>
                          <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Status:</Text>
                          <Text style={{fontFamily: 'pop-regular', color:theme.text.highlight, paddingHorizontal: 10}}>{animeDetails.status}</Text>
                          <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Release Date:</Text>
                          <Text style={{fontFamily: 'pop-regular', color:theme.text.highlight, paddingHorizontal: 10}}>{animeDetails.releaseDate}</Text>
                          <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Sub Or Dub:</Text>
                          <Text style={{fontFamily: 'pop-regular', color:theme.text.highlight, paddingHorizontal: 10}}>{animeDetails.subOrDub.toUpperCase()}</Text>
                          <Text style={{fontFamily: 'pop-bold', color:theme.text.heading, paddingBottom: 10}}>Anime type:</Text>
                          <Text style={{fontFamily: 'pop-regular', color:theme.text.highlight, paddingHorizontal: 10}}>{animeDetails.type}</Text>
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
          </>
            )
          }
    </View>
  )
}


const styles = StyleSheet.create({
  contianer:{
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bg.wallpaper
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
  AnimeTitle: {
    color:theme.text.theme,
    fontSize: 20,
    position: "absolute",
    bottom: 20,
    marginHorizontal: 10,
    width: "60%",
    fontFamily: "pop-medium"
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
})

export default WatchVideo