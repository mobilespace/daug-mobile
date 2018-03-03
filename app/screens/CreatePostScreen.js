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

    const { member } = props.navigation.state.params

    this.state = {
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
            <TouchableOpacity onPress={() => {
                Alert.alert(
                  'Success!',
                  `The post has been created with: ${newPostContent}`,
                  [
                    { text: "OK", onPress: () => goBack() }
                  ],
                  { cancelable: false }
                )
              }}
              style={{ flex: 1 }}
            >
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
