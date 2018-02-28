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

import { ENV_URL } from '../utils/helpers';

import LOGO_IMAGE from '../../assets/daug_logo.png';

export default class IntroScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#fd746c',
      borderBottomColor: '#fd746c',
      borderBottomWidth: 0,
      elevation: null
    }
  });

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    // Simple API call - GET
    try {
      let response = await fetch(`${ENV_URL}/auth`, {
        method: 'GET'
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON);
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log("failed" + error);
      }
    } catch (error) {
      console.log("failed" + error);
    }

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.mainContent}>
        <IntroSlider />
        {this.state.fontLoaded &&
          <View style={styles.introButtonsContainer}>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="rgba(0, 0, 0, 0)"
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.buttonTitle}>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="rgba(0, 0, 0, 0)"
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.buttonTitle}>Sign Up</Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    )
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
