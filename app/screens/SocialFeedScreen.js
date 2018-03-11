import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  DeviceEventEmitter
} from 'react-native';
import { Font, LinearGradient } from 'expo';
import { Button, Icon } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons';

import { ENV_URL, timeSince, getUserId } from '../utils/helpers';

export default class SocialFeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Daug',
    headerTintColor: '#fd746c',
    headerTitleStyle: {
      fontSize: 20
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fontLoaded: false,
      posts: null,
      commented: false,
      liked: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });

    this.fetchPosts()

    getUserId()
      .then(res => {
        this.setState({ userId: res })
        this.fetchUser()
      })
      .catch(err => {
        alert("An error occurred")
      });
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('new_post_created', (e) => {
      this.fetchPosts()
    })
  }

  async fetchPosts() {
    try {
      const response = await fetch(`${ENV_URL}/api/feed`, {
        method: 'GET'
      });
      const responseJSON = await response.json();

      if (response.status === 200) {
        console.log(responseJSON);

        this.setState({ posts: responseJSON })
      } else {
        const error = responseJSON.message

        console.log("failed" + error);
      }
    } catch (error) {
      console.log("failed" + error);
    }
  }

  async fetchUser() {
    this.setState({ isLoading: true });

    try {
      let response = await fetch(`${ENV_URL}/api/users/${this.state.userId}`, {
        method: 'GET'
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON);

        this.setState({ user: responseJSON, isLoading: false })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log("failed" + error);
      }
    } catch (error) {
      console.log("failed" + error);
    }
  }

  renderMemberRow(member) {
    const { commented, liked } = this.state
    const { navigate } = this.props.navigation

    return (
      <View style={styles.postContainer} key={member}>
        <View style={styles.postHeaderContainer}>
          <TouchableOpacity onPress={() => navigate('Profile', { isHeaderShow: true, user: member.user })} activeOpacity={0.8}>
            <Image source={{ uri: member.user.profile_image || '' }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.postUsernameLocationContainer}>
            <TouchableOpacity
              style={[styles.postUsernameView, member.location && { marginTop: 10 }]}
              onPress={() => navigate('Profile', { isHeaderShow: true, user: member.user })}
            >
              <Text style={styles.nameLabel}>{member.user.name}</Text>
            </TouchableOpacity>
            {member.location &&
              <View style={styles.postLocationView}>
                <Text style={styles.locationLabel}>{member.location}</Text>
              </View>
            }
          </View>
        </View>
        <TouchableOpacity onPress={() => navigate('Post', { post: member })} activeOpacity={1}>
          <View style={styles.postContentContainer}>
            {member.image && <Image source={{ uri: member.image || ''}} style={styles.postImage} resizeMode="cover" />}
            <Text style={styles.postCaption}>{member.description}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.postFooterContainer}>
          <View style={styles.postDateView}>
            <Text style={styles.postDateText}>{timeSince(member.createdAt)}</Text>
          </View>
          <View style={styles.postActionView}>
            <Icon
              name={commented ? "ios-chatbubbles" : "ios-chatbubbles-outline"}
              color={commented ? 'black' : null} type="ionicon" size={25}
              onPress={() => this.setState({ commented: !commented })}
            />
            <Text style={styles.postActionText}>{member.comments || 0}</Text>
          </View>
          <View style={[styles.postActionView, {marginRight: 20}]}>
            <Icon
              name={liked ? "ios-heart" : "ios-heart-outline"}
              color={liked ? 'red' : null} type="ionicon" size={25}
              onPress={() => this.setState({ liked: !liked })}
            />
            <Text style={styles.postActionText}>{member.likes || 0}</Text>
          </View>
        </View>
      </View>
    )
  }

  loadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  contentView() {
    const { posts } = this.state

    return (
      <ScrollView>
        <FlatList
          data={posts}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this.renderMemberRow(item)}
        />
      </ScrollView>
    )
  }

  render() {
    const { navigate } = this.props.navigation
    const { isLoading, posts, user } = this.state

    return ( this.state.fontLoaded &&
      <View style={styles.mainContent}>
        <View style={styles.createPostContainer}>
          <TouchableOpacity onPress={() => navigate('CreatePost', { member: user })} style={styles.createPostLabelContainer}>
            <Text style={styles.createPostLabel}>Create Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhotoIcon}>
            <SimpleLineIcons
              name='picture'
              size={Platform.OS === 'ios' ? 22 : 25}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhotoIcon} onPress={() => navigate('CreatePost', { member: user })}>
            <SimpleLineIcons
              name='feed'
              size={Platform.OS === 'ios' ? 22 : 25}
            />
          </TouchableOpacity>
        </View>
        {isLoading ? this.loadingView() : this.contentView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createPostContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  createPostLabelContainer: {
    flex: 10,
    marginLeft: 20
  },
  createPostLabel: {
    fontSize: 18,
    color: '#DA727E',
    fontWeight: 'bold',
    fontFamily: 'Righteous'
  },
  addPhotoIcon: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  postContainer: {
    backgroundColor: 'white',
    borderColor: '#aaaaaa',
  },
  postHeaderContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#aaaaaa',
  },
  postUsernameLocationContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  postUsernameView: {
    flex: 1,
    justifyContent: 'center'
  },
  postLocationView: {
    flex: 1,
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
  locationLabel: {
    flex: 1,
    fontSize: 15,
    color: '#44484B',
    marginLeft: 10,
    fontFamily: 'Righteous'
  },
  postContentContainer: {
    backgroundColor: '#f9f9f9'
  },
  postImage: {
    width: '100%',
    height: 250
  },
  postCaption: {
    margin: 10,
    color: '#44484B',
    fontSize: 15,
    fontFamily: 'Righteous'
  },
  postFooterContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  postDateView: {
    flex: 3,
    justifyContent: 'center'
  },
  postDateText: {
    marginLeft: 20,
    color: '#44484B',
    fontSize: 11,
    fontFamily: 'Righteous'
  },
  postActionView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  postActionText: {
    marginLeft: 10,
    color: '#44484B',
    fontSize: 15,
    fontFamily: 'Righteous'
  }
});
