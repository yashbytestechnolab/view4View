import AsyncStorage from '@react-native-async-storage/async-storage';
interface storeType{

}
const store: storeType = {};

/**
 * Storing Object Value
 * @param value
 */
const setValue = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) { }
};

/**npm insta
 * Get Value From Local Storage
 * @param key
 */
const getValue = async (key: string) => {
    try {let jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null) {
            jsonValue = JSON.parse(jsonValue);
            return jsonValue;
        }
        return null;
    } catch (e) { }
};

const getAllValue = async () => {
    try {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            return result.map((req: any) => JSON.parse(req)).forEach(console.log);
        } catch (error) {
            console.error("ERROR====>", error)
        }
    } catch (e) { }
};

export { getValue, setValue, store, getAllValue };
