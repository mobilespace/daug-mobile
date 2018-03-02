import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Font } from 'expo';
import { Header } from 'react-native-elements';

export default class CreatePostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Create Post",
    headerTintColor: '#fd746c',
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Righteous'
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('SocialStack')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Righteous' }}>Cancel</Text>
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('SocialStack')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Righteous' }}>Share</Text>
        </View>
      </TouchableOpacity>
    )
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
    const { goBack } = this.props.navigation

    return (
      <View style={styles.modalContainer}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={() => goBack()}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Righteous', color: 'black' }}>Cancel</Text>
              </View>
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'Create Post',
            style: {
              fontSize: 20,
              fontFamily: 'Righteous',
              color: '#fd746c'
            }
          }}
          rightComponent={
            <TouchableOpacity onPress={() => goBack()}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Righteous', color: 'black' }}>Share</Text>
              </View>
            </TouchableOpacity>
          }
          innerContainerStyles={{alignItems: 'center', paddingTop: 30}}
          outerContainerStyles={{height: 90, backgroundColor: 'rgba(245,245,245,1)'}}
        />
        <View style={styles.mainContent}>
          <Text style={styles.placeholderText}>Create Post Screen</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Righteous',
    color: '#28ABEC',
    marginTop: 10,
    textAlign: 'center'
  }
});
