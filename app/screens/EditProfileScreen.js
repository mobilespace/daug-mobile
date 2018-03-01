import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Font } from 'expo';

export default class EditProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Edit Profile",
    headerTintColor: '#fd746c',
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Righteous'
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
  }

  render() {
    return (
      <View style={styles.mainContent}>
        <Text style={styles.placeholderText}>Edit Profile Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: {
    color: '#fd746c',
    fontSize: 20,
    fontFamily: 'Righteous'
  }
});
