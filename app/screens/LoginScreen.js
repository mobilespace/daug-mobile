import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Font, LinearGradient } from 'expo';
import { Button, Input } from 'react-native-elements';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import IntroSlider from '../components/IntroSlider';

import LOGO_IMAGE from '../../assets/daug_logo.png';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: '',
      password: ''
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  loginButtonPressed() {
    const { email, password } = this.state;

    return (
      Alert.alert(
        'Success!',
        `Email: ${email} & Password: ${password}`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    )
  }

  loginValid() {
    const { email, password } = this.state

    return email.length > 1 && password.length > 1
  }

  render() {
    const { email, password } = this.state

    return (
      <LinearGradient
        colors={['#fd746c', '#ff9068']}
        style={styles.mainContent}>
        {this.state.fontLoaded &&
          <View style={styles.inputViewContainer}>
            <Input
              ref={input => this.emailInput = input}
              leftIcon={
                <MaterialCommunityIcons
                  name='email-outline'
                  color='white'
                  size={25}
                />
              }
              value={email}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              placeholderTextColor="white"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              displayError={false}
              errorMessage="Please enter a valid email address"
              errorStyle={{ color: 'white' }}
              containerStyle={styles.inputContainer}
              inputStyle={{ color: 'white' }}
              onSubmitEditing={() =>
                this.passwordInput.focus()
              }
            />
            <Input
              ref={input => (this.passwordInput = input)}
              leftIcon={
                <SimpleLineIcons
                  name='lock'
                  color='white'
                  size={25}
                />
              }
              value={password}
              onChangeText={ password => this.setState({ password })}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              displayError={false}
              errorMessage="The password fields are not identics"
              errorStyle={{color: 'white'}}
              returnKeyType="go"
              containerStyle={styles.inputContainer}
              inputStyle={{ color: 'white'}}
              onSubmitEditing={() => {
                this.loginButtonPressed()
              }}
            />
            <Button
              style={styles.buttonView}
              text="Login"
              buttonStyle={[styles.loginButtonStyle, !this.loginValid() && { backgroundColor: 'gray'}]}
              disabled={!this.loginValid()}
              onPress={this.loginButtonPressed.bind(this)}
            />
          </View>
        }
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputViewContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    height: 45,
    marginVertical: 10,
  },
  buttonView: {
    marginTop: 40
  },
  loginButtonStyle: {
    width: 220,
    height: 50,
    backgroundColor: '#28ABEC'
  },
  buttonTextStyle: {
    fontFamily: 'Righteous',
    fontSize: 21
  },
});
