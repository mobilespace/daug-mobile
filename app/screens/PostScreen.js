import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Font } from 'expo';

export default class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Post',
    headerTintColor: '#fd746c',
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Righteous'
    },
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
        <Text style={styles.placeholderText}>Post Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Righteous',
    color: '#28ABEC',
    marginTop: 10,
    textAlign: 'center'
  }
});
