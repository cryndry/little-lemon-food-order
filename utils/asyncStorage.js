import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value == "true" ? true : false;
    } catch (e) {
        return false;
    }
};

export const setItem = async (key, value, endingCallback) => {
    try {
        await AsyncStorage.setItem(key, value, endingCallback);
    } catch (e) {
        return e;
    }
};

export const setMultipleItems = async (values, endingCallback) => {
    try {
        await AsyncStorage.multiSet(values, endingCallback);
    } catch (e) {
        return e;
    }
};
