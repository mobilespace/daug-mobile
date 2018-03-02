import { StackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen
  },
  EditProfile: {
    screen: EditProfileScreen
  },
}, {
  mode: "modal",
  initialRouteName: "Profile"
});

export default ProfileStack;
