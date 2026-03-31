import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import Parse from 'parse/react-native';

const { b4aAppId, b4aJsKey } =
  Constants.expoConfig?.extra ?? {};

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(b4aAppId, b4aJsKey);
Parse.serverURL =
  'https://parseapi.back4app.com';

export default Parse;