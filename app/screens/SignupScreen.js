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

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      name: '',
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

  signupButtonPressed() {
    const { name, email, password } = this.state;

    return (
      Alert.alert(
        'Success!',
        `Name: ${name} & Email: ${email} & Password: ${password}`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    )
  }

  signupValid() {
    const { name, email, password } = this.state

    return name.length > 0 && email.length > 0 && password.length > 0
  }

  render() {
    const { name, email, password } = this.state

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
              autoCapitalize="none"
              returnKeyType="next"
              displayError={false}
              errorMessage="Please enter a valid name"
              errorStyle={{ color: 'white' }}
              containerStyle={styles.inputContainer}
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
              displayError={false}
              errorMessage="Please enter a valid email address"
              errorStyle={{ color: 'white' }}
              containerStyle={styles.inputContainer}
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
              displayError={false}
              errorMessage="The password fields are not identics"
              errorStyle={{ color: 'white' }}
              returnKeyType="go"
              containerStyle={styles.inputContainer}
              inputStyle={{ color: 'white', fontFamily: 'Righteous' }}
              onSubmitEditing={() => {
                this.signupButtonPressed()
              }}
            />
            <Button
              style={styles.buttonView}
              text="Sign Up"
              buttonStyle={[styles.loginButtonStyle, !this.signupValid() && { backgroundColor: 'gray' }]}
              disabled={!this.signupValid()}
              onPress={this.signupButtonPressed.bind(this)}
              textStyle={styles.buttonTextStyle}
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
