import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Platform
} from 'react-native';
import { Font } from 'expo';

import IntroSlider from '../components/IntroSlider';

import { ENV_URL } from '../utils/helpers';

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

    this.setState({ fontLoaded: true });

    this.pingServer()
  }

  async pingServer() {
    // Check server status
    // Simple GET request to /api
    try {
      const response = await fetch(`${ENV_URL}/api`, {
        method: 'GET'
      });
      const responseJSON = await response.json();

      if (response.status === 200) {
        console.log(responseJSON.message);
        console.log('Server up and running!');
      } else {
        const error = responseJSON.message

        console.log("Server request failed " + error);
      }
    } catch (error) {
      console.log("Server is down " + error);
    }
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.mainContent}>
        <IntroSlider />
        {this.state.fontLoaded &&
          <View style={styles.introButtonsContainer}>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="rgba(0, 0, 0, 0)"
              style={styles.buttonContainer}
              onPress={() => navigate('Login')}>
              <Text style={styles.buttonTitle}>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="rgba(0, 0, 0, 0)"
              style={styles.buttonContainer}
              onPress={() => navigate('Signup')}>
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
    paddingBottom: Platform.OS === 'ios' ? 25 : 10
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
