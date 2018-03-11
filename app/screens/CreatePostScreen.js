import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ImageEditor,
  DeviceEventEmitter
} from 'react-native';
import { Font, ImagePicker } from 'expo';

import { SimpleLineIcons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { RNS3 } from 'react-native-aws3';

import { ENV_URL, getUserId } from '../utils/helpers';

export default class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);

    const { member } = props.navigation.state.params

    this.state = {
      isLoading: false,
      fontLoaded: false,
      member,
      newPostContent: '',
      image: null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    getUserId()
      .then(res => this.setState({ userId: res }))
      .catch(err => { console.log(err); alert("An error occurred")});

    this.setState({ fontLoaded: true });
  }

  async createPost() {
    this.setState({ isLoading: true })

    const { newPostContent, image } = this.state

    var details = {};

    if (image !== null) {
      details.image = image
    }

    if (newPostContent !== null && newPostContent.length > 0) {
      details.description = newPostContent
    }

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`${ENV_URL}/api/users/${this.state.userId}/posts`, {
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
            { text: "Dismiss", onPress: () => {
              DeviceEventEmitter.emit('new_post_created', {})
              this.props.navigation.goBack()
            }}
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

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('Profile Image cancelled');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: result.width, height: result.height },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });

    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: resizedUri,
      name: `user_${this.state.member.id}_post_${new Date().getTime()}.png`,
      type: "image/png"
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "daug",
      region: "us-east-1",
      accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");

      console.log(response.body);

      this.setState({ image: response.body.postResponse.location });
    });
  };

  render() {
    const { goBack } = this.props.navigation
    const { member, newPostContent, image } = this.state

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
                <Image source={{ uri: member.profile_image || '' }} style={styles.avatar} />
              </TouchableOpacity>
              <View style={styles.locationContainer}>
                <TouchableOpacity
                  style={[styles.usernameView, member.location && { marginTop: 10 }]}
                >
                  <Text style={styles.nameLabel}>{member.name}</Text>
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
            <View style={styles.createPostImageContainer}>
              {this.state.image ?
                <Image source={{ uri: image }} style={styles.postImage} resizeMode="cover" /> :
                <View style={styles.createAddPostImageContainer}>
                  <Text style={styles.orLabel}>OR</Text>
                  <TouchableOpacity style={styles.cameraIconView} onPress={() => this.pickImage()}>
                    <SimpleLineIcons
                      name='camera'
                      style={{ color: '#aaaaaa' }}
                      size={42}
                    />
                  </TouchableOpacity>
                </View>
              }
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
    display: 'flex',
    justifyContent: 'center'
  },
  createPostImageContainer: {
    display: 'flex'
  },
  postImage: {
    width: '100%',
    height: 250
  },
  createAddPostImageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 200
  },
  orLabel: {
    flex: 1,
    color: '#aaaaaa',
    fontSize: 26,
    marginTop: 40,
    fontFamily: 'Righteous',
    fontWeight: 'bold'
  },
  cameraIconView: {
    flex: 1,
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
    height: 100,
    fontSize: 25,
    color: 'black',
    fontFamily: 'Righteous',
    paddingLeft: 20,
    paddingTop: 30
  },
  postInputPlaceholder: {
    height: 100,
    fontSize: 25,
    color: 'black',
    fontFamily: 'Righteous',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
