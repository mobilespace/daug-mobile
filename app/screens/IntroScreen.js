import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import { Font, LinearGradient } from 'expo';
import { Button } from 'react-native-elements';

import IntroSlider from '../components/IntroSlider';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ProfileScreen from './ProfileScreen';
import SocialFeedScreen from './SocialFeedScreen';

import LOGO_IMAGE from '../../assets/daug_logo.png';

export default class IntroScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      screen: 'social'
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  onButtonPressed(type) {
    this.setState({ screen: type })
  }

  renderContent() {
    const { screen } = this.state

    if (screen === 'login') {
      return <LoginScreen />
    } else if (screen === 'signup') {
      return <SignupScreen />
    } else if (screen === 'profile') {
      return <ProfileScreen />
    } else if (screen === 'social') {
      return <SocialFeedScreen />
    } else {
      return (
        <View style={styles.mainContent}>
          <IntroSlider />
          {this.state.fontLoaded &&
            <View style={styles.introButtonsContainer}>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="rgba(0, 0, 0, 0)"
                style={styles.buttonContainer}
                onPress={this.onButtonPressed.bind(this, 'login')}>
                <Text style={styles.buttonTitle}>Login</Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="rgba(0, 0, 0, 0)"
                style={styles.buttonContainer}
                onPress={this.onButtonPressed.bind(this, 'signup')}>
                <Text style={styles.buttonTitle}>Sign Up</Text>
              </TouchableHighlight>
            </View>
          }
        </View>
      )
    }
  }

  render() {
    return (
      this.renderContent()
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1
  },
  introButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fd746c',
    paddingBottom: 25
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Righteous'
  }
});
