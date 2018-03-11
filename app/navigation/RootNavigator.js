import { StackNavigator } from 'react-navigation';

import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      IntroStack: {
        screen: IntroStack,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      HomeTabs: {
        screen: HomeTabs,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "HomeTabs" : "IntroStack"
    }
  );
};
