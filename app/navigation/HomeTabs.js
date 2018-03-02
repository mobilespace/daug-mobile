import React from 'react';
import { Platform } from 'react-native';

import { TabNavigator } from 'react-navigation';
import { SimpleLineIcons } from '@expo/vector-icons';

import SocialNavigator from './SocialNavigator';
import ProfileStack from './ProfileStack';

const HomeTabs = TabNavigator({
  SocialTab: {
    screen: SocialNavigator,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons
          name='layers'
          color={tintColor}
          size={25}
        />
      )
    }
  },
  ProfileTab: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons
          name='user'
          color={tintColor}
          size={25}
        />
      )
    }
  }
}, {
  initialRouteName: 'SocialTab',
  tabBarPosition: 'bottom',
  animationEnabled: Platform.OS === 'ios' ? false : true,
  swipeEnabled: Platform.OS === 'ios' ? false : true,
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: '#fd746c',
    inactiveTintColor: '#999999',
    style: {
      backgroundColor: '#ffffff',
      padding: 5
    },
    indicatorStyle: {
      backgroundColor: 'white'
    },
    labelStyle: {
      fontSize: 12
    }
  }
});

export default HomeTabs;
