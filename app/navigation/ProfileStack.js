import { StackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';

const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen
  },
  Post: {
    screen: PostScreen
  }
});

export default ProfileStack;
