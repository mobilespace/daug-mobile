import { StackNavigator } from 'react-navigation';

import SocialFeedScreen from '../screens/SocialFeedScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';

const SocialStack = StackNavigator({
  Social: {
    screen: SocialFeedScreen
  },
  Post: {
    screen: PostScreen
  },
  Profile: {
    screen: ProfileScreen
  }
});

export default SocialStack;
