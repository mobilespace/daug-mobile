import { AsyncStorage, Platform } from 'react-native';

// API url helper
const iOS_Android_Localhost = Platform.OS === 'ios' ? 'localhost' : '10.0.0.116'
export const ENV_URL = __DEV__ ? `http://${iOS_Android_Localhost}:3000` : "https://daug-app.herokuapp.com"

// createdAt display helper
export function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - new Date(timeStamp).getTime()) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast) + 's ago';
  }

  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + 'm ago';
  }

  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + 'h ago';
  }

  if (secondsPast > 86400) {
    day = timeStamp.getDate();
    month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}

// Auth navigation helpers
export const USER_KEY = "secret-user-key-123-xyz";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
