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
  initialRouteName: "IntroStack",
  mode: "modal",
  headerMode: "none"
});

export default RootNavigator;
