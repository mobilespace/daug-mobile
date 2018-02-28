import { Platform } from 'react-native';

const iOS_Android_Localhost = Platform.OS === 'ios' ? 'localhost' : '10.0.0.116'
export const ENV_URL = __DEV__ ? `http://${iOS_Android_Localhost}:3000` : "https://daug-app.herokuapp.com"
