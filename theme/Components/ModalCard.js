import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TextInput,
    Button,
    FlatList,
    Pressable,
    Modal,
    ImageBackground
  } from "react-native";
function ModalCard (props){
//   console.log(props)
    return(
        <Modal visible={props.visible}  transparent={true} animationType="slide">
<ImageBackground source={require('../assets/pics/bgc.png')} resizeMode="cover" style={styles.image}>

        <View style={styles.box}>

        <Text style={styles.heading2}>{props.item.text}</Text>
        <Pressable 
        onPress={props.OnClick.bind(this, props.id)}
        style={({pressed})=> pressed && styles.selected}
        >

        <Image
          style={{ width: 150, height: 200 }}
          source={{
              uri: props.item.url,
            }}
            />
        <Text style={{color:"white"}} >{props.item.Desc}</Text>
            </Pressable>
      </View>
</ImageBackground>
        
      </Modal>
    )
}
export default ModalCard;

const styles = StyleSheet.create({
 
    heading2: {
      fontSize: 20,
      width: "100%",
      textAlign: "center",
color:"white"
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
    text: {
      fontSize: 40,
      fontfamily: "cursive",
      alignContent: "center",
      justifyContent: "center",
      width: "100%",
      textAlign: "center",
    },
    box: {
    //   borderWidth: 1,
      flex:1,
    //   borderColor: "red",
      justifyContent:"center",
      alignItems:"center",
      margin: 5
    },
    selected:{
      opacity:0.5
    }
 
  
  });
  