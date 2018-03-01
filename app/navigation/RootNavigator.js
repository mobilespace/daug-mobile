import { StackNavigator } from 'react-navigation';

import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';

const RootNavigator = StackNavigator({
  IntroStack: {
    screen: IntroStack
  },
  HomeTabs: {
    screen: HomeTabs
  }
}, {
  headerMode: "none",
  mode: "modal",
  initialRouteName: "IntroStack"
});

export default RootNavigator;
