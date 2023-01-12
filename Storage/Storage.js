import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (value,key) => {
    try {
const jsonData = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonData)
    } catch (e) {
      // saving error
    }
  }
  
  export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
       return null;
    }
}