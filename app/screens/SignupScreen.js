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

import { ENV_URL } from '../utils/helpers';

export default class SignupScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Let's get started",
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
      name: '',
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

  async signupButtonPressed() {
    this.setState({ isLoading: true })

    const { name, email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'name': name,
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
      let response = await fetch(`${ENV_URL}/auth/signup`, {
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
          'Signed Up!',
          'You have successfully signed up!',
          [
            { text: "Continue", onPress: () => navigate('HomeTabs') }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Sign up failed!', `Unable to signup.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
  }

  signupValid() {
    const { name, email, password } = this.state

    return name.length > 0 && email.length > 0 && password.length > 0
  }

  render() {
    const { name, email, password, isLoading, errors } = this.state

    return (
      <LinearGradient
        colors={['#fd746c', '#ff9068']}
        style={styles.mainContent}>
        {this.state.fontLoaded &&
          <View style={styles.inputViewContainer}>
            <Input
              ref={input => this.nameInput = input}
              leftIcon={
                <MaterialCommunityIcons
                  name='rename-box'
                  color='white'
                  size={25}
                />
              }
              value={name}
              onChangeText={name => this.setState({ name })}
              placeholder="Name"
              placeholderTextColor="white"
              autoCapitalize="words"
              returnKeyType="next"
              displayError={errors && errors.name}
              errorMessage="Please provide your name"
              errorStyle={{ color: 'gray' }}
              containerStyle={[styles.inputContainer, errors && errors.name && { borderColor: 'gray' }]}
              inputStyle={{ color: 'white', fontFamily: 'Righteous' }}
              onSubmitEditing={() =>
                this.emailInput.focus()
              }
            />
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
              onChangeText={password => this.setState({ password })}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              displayError={errors && errors.password}
              errorMessage="Password must have at least 8 characters"
              errorStyle={{ color: 'gray' }}
              returnKeyType="go"
              containerStyle={[styles.inputContainer, errors && errors.password && { borderColor: 'gray'}]}
              inputStyle={{ color: 'white', fontFamily: 'Righteous' }}
              onSubmitEditing={() => {
                this.signupButtonPressed()
              }}
            />
            <Button
              text="Sign Up"
              loading={isLoading}
              buttonStyle={[styles.loginButtonStyle, !this.signupValid() && { backgroundColor: 'gray' }]}
              disabled={!this.signupValid()}
              onPress={this.signupButtonPressed.bind(this)}
              textStyle={styles.buttonTextStyle}
              containerStyle={{ marginTop: 20 }}
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
