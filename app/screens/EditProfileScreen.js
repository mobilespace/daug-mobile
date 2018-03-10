import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Font } from 'expo';
import { Input, Header } from 'react-native-elements';

import { ENV_URL } from '../utils/helpers';

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fontLoaded: false,
      name: 'Charlie',
      bio: "The world's friendliest dalmation!",
      email: 'charlie@doggo.com'
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  async submitProfile() {
    this.setState({ isLoading: true })

    const { name, bio } = this.state

    var details = {
      'name': name,
      'bio': bio
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`${ENV_URL}/api/users/19`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })

        Alert.alert(
          'Profile updated!',
          '',
          [
            { text: "Dismiss", onPress: () => this.props.navigation.goBack() }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })

        Alert.alert('Unable to update profile!', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      Alert.alert('Unable to update profile!', `${error}`)
    }
  }

  render() {
    const { name, bio, email } = this.state

    return (
      <View style={styles.modalContainer}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Righteous', color: 'black' }}>Cancel</Text>
              </View>
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'Edit Profile',
            style: {
              fontSize: 20,
              fontFamily: 'Righteous',
              color: '#fd746c'
            }
          }}
          rightComponent={
            <TouchableOpacity onPress={this.submitProfile.bind(this)} style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Righteous', color: 'black' }}>Done</Text>
              </View>
            </TouchableOpacity>
          }
          innerContainerStyles={{ alignItems: 'center', paddingTop: 30 }}
          outerContainerStyles={{ height: 90, backgroundColor: 'rgba(245,245,245,1)' }}
        />
        <View style={styles.mainContent}>
          <View style={styles.photoContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: 'https://thumbs.dreamstime.com/b/dalmatian-puppy-portrait-10524552.jpg' }}
              resizeMode='cover'
            />
            <TouchableOpacity onPress={() => console.log("Change Profile Photo here")}>
              <Text style={styles.changePhotoLabel}>Change Photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <Input
                value={name}
                onChangeText={name => this.setState({ name })}
                placeholder="Name"
                placeholderTextColor="#aaaaaa"
                autoCapitalize="words"
                style={styles.inputStyle}
                containerStyle={{ width: '100%', borderColor: '#aaaaaa' }}
              />
            </View>
            <View style={[styles.inputContainer, { marginBottom: 10 }]}>
              <Text style={styles.inputLabel}>Bio</Text>
              <Input
                value={bio}
                onChangeText={bio => this.setState({ bio })}
                placeholder="Bio"
                placeholderTextColor="#aaaaaa"
                autoCapitalize="sentences"
                style={styles.inputStyle}
                containerStyle={{ width: '100%', borderColor: '#aaaaaa' }}
              />
            </View>
          </View>
          <Text style={styles.sectionHeaderText}>PRIVATE INFORMATION</Text>
          <View style={styles.privateDetailsContainer}>
            <View style={[styles.inputContainer, { marginVertical: 10 }]}>
              <Text style={styles.inputLabel}>Email</Text>
              <Input
                value={email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                placeholderTextColor="#aaaaaa"
                autoCapitalize="none"
                style={styles.inputStyle}
                containerStyle={{ width: '100%', borderColor: '#aaaaaa' }}
              />
            </View>
          </View>
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
    flex: 1
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#aaaaaa'
  },
  changePhotoLabel: {
    fontSize: 16,
    fontFamily: 'Righteous',
    color: '#28ABEC',
    marginTop: 10,
    textAlign: 'center'
  },
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: 'white'
  },
  inputContainer: {
    height: 80,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Righteous',
    color: '#aaaaaa',
  },
  inputStyle: {
    width: '100%',
    borderColor: '#aaaaaa',
    fontSize: 18,
    fontFamily: 'Righteous',
    color: 'black',
  },
  sectionHeaderText: {
    fontSize: 13,
    fontFamily: 'Righteous',
    color: '#aaaaaa',
    marginHorizontal: 20
  },
  privateDetailsContainer: {
    marginVertical: 10,
    backgroundColor: 'white'
  }
});
