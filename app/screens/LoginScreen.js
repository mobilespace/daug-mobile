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

import { ENV_URL, onSignIn } from '../utils/helpers';

import LOGO_IMAGE from '../../assets/daug_logo.png';

export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Login to account',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#fd746c',
      borderBottomColor: '#fd746c',
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Righteous'
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: '',
      password: '',
      isLoading: false,
      message: '',
      errors: null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  async loginButtonPressed() {
    this.setState({ isLoading: true })

    const { email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'email': email,
      'password': password
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`${ENV_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })
        Alert.alert(
          'Logged In!',
          'You have successfully logged in!',
          [
            { text: "Continue", onPress: () => onSignIn(responseJSON.user.id).then(() => navigate("HomeTabs")) }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })

        Alert.alert('Log in failed!', `Unable to login.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error })

      Alert.alert('Log in failed!', 'Unable to login. Please try again later')
    }
  }

  loginValid() {
    const { email, password } = this.state

    return email.length > 0 && password.length > 0
  }

  render() {
    const { email, password, isLoading, errors } = this.state

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
              displayError={errors && errors.email}
              errorMessage="Please enter a valid email address"
              errorStyle={{ color: 'gray' }}
              containerStyle={[styles.inputContainer, errors && errors.email && { borderColor: 'gray' }]}
              inputStyle={{ color: 'white', fontFamily: 'Righteous' }}
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
              displayError={errors && errors.password}
              errorMessage="Invalid password"
              errorStyle={{color: 'gray'}}
              returnKeyType="go"
              containerStyle={[styles.inputContainer, errors && errors.password && { borderColor: 'gray' }]}
              inputStyle={{ color: 'white', fontFamily: 'Righteous' }}
              onSubmitEditing={() => {
                this.loginButtonPressed()
              }}
            />
            <Button
              text="Login"
              loading={isLoading}
              buttonStyle={[styles.loginButtonStyle, !this.loginValid() && { backgroundColor: 'gray'}]}
              disabled={!this.loginValid()}
              onPress={this.loginButtonPressed.bind(this)}
              textStyle={styles.buttonTextStyle}
              containerStyle={{marginTop: 20}}
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
