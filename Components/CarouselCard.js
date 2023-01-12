import React, { useState ,useRef} from 'react'
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
    TouchableOpacity,
    Dimensions,
    useWindowDimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Pressable,
  } from "react-native";
  import theme from "../theme/Config";

  import Carousel from 'react-native-anchor-carousel';
  const {width: windowWidth} = Dimensions.get('window');
  

export default function CarouselCard({ navigation ,data }) {
  
    const [trendingData, settrendingData] = useState(data);
    const carouselRef = useRef(null);
    function handleAnime(id) {
      navigation.navigate("Description", {
        id:id
    })}

  return (
    <View style={style.container}>
 <Carousel
                            ref={carouselRef}
                            data={trendingData}
                            renderItem={({item})=>(
                                <TouchableOpacity style={{flex:1,maxHeight:200, borderRadius:20}} key={item} onPress={()=>handleAnime(item.id)}>
                                    <ImageBackground source={{uri: item.cover}} style={{flex:1, borderRadius: 25,  elevation: 4}}>
                                        <Text style={style.carsoulTitle}>{item.title.userPreferred}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )}
                            style={{flex:1,maxHeight:200, borderRadius:20 }}
                            itemWidth={0.9 * windowWidth}
                            containerWidth={windowWidth}
                            separatorWidth={5}
                        />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight:200,
    backgroundColor:theme.bg.wallpaper,
    borderRadius:50
    // width:"100%"
    // height:"10%",
    // maxHeight:"20%"

  },
  imagebox :{
height:"5%"
,maxHeight:150
  },
  image:{

  },
  heading: {
    flex: 1,
    fontSize: 36,
    textAlign: "center",
    fontFamily: "pop-regular",
  },
  carousel: {
    flexGrow: 1,
    height: 220,
    marginTop: 5
},
carouselSlide:{
    width: "100%",
    maxHeight: 200,
    backgroundColor:"red",
    elevation: 4,
    borderRadius: 10,
},
carsoulPoster:{
    height: "100%",
    position: 'relative',
    width: "100%",
    borderRadius: 10,
    overflow: 'hidden'
},
carsoulTitle:{
    fontSize: 14,
    fontFamily: "pop-medium",
    color: '#fff',
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 10
}

});