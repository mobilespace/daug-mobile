import { Platform } from 'react-native';

const iOS_Android_Localhost = Platform.OS === 'ios' ? 'localhost' : '10.0.0.116'
export const ENV_URL = __DEV__ ? `http://${iOS_Android_Localhost}:3000` : "https://daug-app.herokuapp.com"

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
