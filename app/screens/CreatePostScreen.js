import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { Font } from 'expo';

import { SimpleLineIcons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

import { ENV_URL } from '../utils/helpers';

export default class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);

    const { member } = props.navigation.state.params

    this.state = {
      isLoading: false,
      fontLoaded: false,
      member,
      newPostContent: ''
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  async createPost() {
    this.setState({ isLoading: true })

    const { newPostContent } = this.state

    var details = {
      'description': newPostContent
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`${ENV_URL}/api/users/19/posts`, {
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
          'Post created!',
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

        Alert.alert('Unable to create post!', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      Alert.alert('Unable to create post!', `${error}`)
    }
  }

  render() {
    const { goBack } = this.props.navigation
    const { member, newPostContent } = this.state

    return (
      <View style={styles.modalContainer}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={() => goBack()} style={{ flex: 1 }}>
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
            <TouchableOpacity onPress={this.createPost.bind(this)} style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Righteous', color: 'black' }}>Share</Text>
              </View>
            </TouchableOpacity>
          }
          innerContainerStyles={{alignItems: 'center', paddingTop: 30}}
          outerContainerStyles={{height: 90, backgroundColor: 'rgba(245,245,245,1)'}}
        />
        <View style={styles.mainContent}>
          <View style={styles.createPostContainer}>
            <View style={styles.createPostHeaderContainer}>
              <TouchableOpacity activeOpacity={0.8}>
                <Image source={{ uri: member.user.image }} style={styles.avatar} />
              </TouchableOpacity>
              <View style={styles.locationContainer}>
                <TouchableOpacity
                  style={[styles.usernameView, member.location && { marginTop: 10 }]}
                >
                  <Text style={styles.nameLabel}>{member.user.name}</Text>
                </TouchableOpacity>
                <View style={styles.locationView}>
                  <SimpleLineIcons
                    name='location-pin'
                    style={styles.locationIcon}
                    size={15}
                  />
                  <Text style={styles.locationLabel}>Add Location</Text>
                </View>
              </View>
            </View>
            <View style={styles.createPostContentContainer}>
              <TextInput
                placeholder="What's on your mind?"
                placeholderTextColor="gray"
                multiline={true}
                style={styles.postInput}
                value={newPostContent}
                onChangeText={(text) => this.setState({ newPostContent: text })}
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
    flex: 1,
    backgroundColor: 'white'
  },
  mainContent: {
    flex: 1,
  },
  createPostContainer: {
    backgroundColor: 'white',
    borderColor: '#aaaaaa'
  },
  createPostHeaderContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createPostContentContainer: {
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  usernameView: {
    flex: 1,
    justifyContent: 'center'
  },
  locationView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10
  },
  nameLabel: {
    fontSize: 18,
    color: '#455C7B',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Righteous'
  },
  locationIcon: {
    marginLeft: 10,
    marginRight: 5
  },
  locationLabel: {
    flex: 1,
    fontSize: 13,
    color: '#44484B',
    fontFamily: 'Righteous'
  },
  postInput: {
    height: 250,
    fontSize: 25,
    color: 'black',
    fontFamily: 'Righteous',
    paddingLeft: 10,
    paddingTop: 10
  }
});
