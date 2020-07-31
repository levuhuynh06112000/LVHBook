import { Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
export const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
export const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

export const BASE_URL = "http://192.168.43.132:3000";

export const getAuth = async () => {
    try {
        let auth = await AsyncStorage.getItem('@auth');
        return auth != null ? JSON.parse(auth) : null;
    } catch (error) {
        console.log("Something went wrong", error);
    }
    return null;
}

export const setAuth = async (auth) => {
    try {
        const jsonValue = JSON.stringify(auth)
        await AsyncStorage.setItem('@auth', jsonValue);
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}
