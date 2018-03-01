import { StackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen
  },
  EditProfile: {
    screen: EditProfileScreen
  }
});

export default ProfileStack;
