import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen';
import SignupScreen from '../screens/SignupScreen';

const IntroStack = StackNavigator({
  Intro: {
    screen: IntroScreen
  },
  Login: {
    screen: LoginScreen
  },
  Signup: {
    screen: SignupScreen
  }
});

export default IntroStack;
