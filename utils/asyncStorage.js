import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOnboardingState = async () => {
    try {
        const value = await AsyncStorage.getItem("isOnboardingCompleted");
        return value == "true" ? true : false;
    } catch (e) {
        return false;
    }
};

export const getItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        throw e;
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

export const eraseAll = async (endingCallback) => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys, endingCallback);
    } catch (e) {
        return e;
    }
};




