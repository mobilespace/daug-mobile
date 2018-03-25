import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  DeviceEventEmitter,
  Alert,
  Dimensions
} from 'react-native';
import { Font, LinearGradient } from 'expo';
import { Button } from 'react-native-elements';

import LOGO_IMAGE from '../../assets/daug_logo.png';

import { ENV_URL, getUserId, onSignOut } from '../utils/helpers';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerVisible: navigation.state.params ? navigation.state.params.isHeaderShow : false,
      title: 'Profile',
      headerTintColor: '#fd746c',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Righteous'
      }
    }
  }

  constructor(props) {
    super(props);

    const userId = props.navigation.state.params && props.navigation.state.params.userId
    const isHeaderShow = props.navigation.state.params && props.navigation.state.params.isHeaderShow

    this.state = {
      isLoading: false,
      fontLoaded: false,
      userId: userId || null,
      user: null,
      isHeaderShow: isHeaderShow || false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    const { userId } = this.state

    if (userId === null) {
      getUserId()
        .then(res => {
          this.setState({ userId: res })
          this.state.user === null && this.fetchUser()
        })
        .catch(err => {
          alert("An error occurred")
        });
    } else {
      this.fetchUser()

      getUserId()
        .then(res => {
          this.setState({ post_detail_home_user_id: res })
        })
        .catch(err => {
          alert("An error occurred")
        });
    }

    this.setState({ fontLoaded: true });
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('user_profile_updated', (e) => {
      this.fetchUser()
    })
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

  async followUser() {
    const { post_detail_home_user_id, userId } = this.state

    try {
      let response = await fetch(`${ENV_URL}/api/users/${post_detail_home_user_id}/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = response.json();

        console.log(responseJSON)

        this.fetchUser()
        this.setState({ following: true })

        Alert.alert(
          'Following user!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("User followed!")
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, following: false })

        Alert.alert('Unable to follow user', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, following: false })

      Alert.alert('Unable to follow user', `${error}`)
    }
  }

  displayPost(post, index) {
    const { navigate } = this.props.navigation

    return (
      <TouchableOpacity
        style={[styles.postIconContainer, { width: DEVICE_WIDTH / 3, height: DEVICE_WIDTH / 3 }]}
        key={index}
        onPress={() => navigate('Post', { postId: post.id })}
        activeOpacity={1}
      >
        {post.image && <Image source={{ uri: post.image || '' }} style={styles.postImage} resizeMode="cover" />}
      </TouchableOpacity>
    )
  }

  renderPosts() {
    const { posts } = this.state.user

    return (
      <View style={styles.postsContainer}>
        {
          posts.map((post, index) => {
            return this.displayPost(post, index)
          })
        }
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
    const { user, isHeaderShow } = this.state
    const { navigate } = this.props.navigation

    return (
      <ScrollView>
        <View style={styles.mainContent}>
          <View style={styles.headerViewContainer}>
            <View style={styles.headerBannerViewContainer}>
              <Image
                style={styles.bannerImage}
                source={{ uri: user.banner_image || '' }}
                resizeMode='cover'
              />
            </View>
            <View style={styles.headerContentViewContainer}>
              <View style={styles.profileImageContainer}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: user.profile_image || '' }}
                  resizeMode='cover'
                />
              </View>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.profileStatsContainer}>
                  <View style={styles.profileStat}>
                    <Text style={styles.statsLabel}>{user.posts ? user.posts.length : '0'}</Text>
                    <Text style={styles.statsLabel}>Posts</Text>
                  </View>
                  <View style={styles.profileStat}>
                    <Text style={styles.statsLabel}>{user.followers && user.followers.length || 0}</Text>
                    <Text style={styles.statsLabel}>Followers</Text>
                  </View>
                  <View style={styles.profileStat}>
                    <Text style={styles.statsLabel}>{user.following && user.following.length || 0}</Text>
                    <Text style={styles.statsLabel}>Following</Text>
                  </View>
                </View>
                <View style={styles.profileEditButtonContainer}>
                  {
                    !isHeaderShow ?
                      <Button text="Edit Profile"
                        containerStyle={{ marginBottom: 10 }}
                        buttonStyle={styles.editProfileButton}
                        textStyle={styles.editProfileText}
                        onPress={() => navigate('EditProfile', { user: user })}
                      /> :
                      <Button text={this.state.following ? 'Following' : 'Follow'}
                        containerStyle={{ marginBottom: 10 }}
                        buttonStyle={this.state.following ? styles.followingButton : styles.followButton}
                        textStyle={this.state.following ? styles.followingText : styles.followText}
                        onPress={() => this.followUser()}
                      />
                  }
                </View>
              </View>
            </View>
            <View style={styles.headerFooterViewContainer}>
              <View style={styles.headerNameContainer}>
                <Text style={styles.nameText}>{user.name}</Text>
              </View>
              <View style={styles.headerBioContainer}>
                <Text style={styles.bioText}>{user.bio}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.sectionHeaderText}>{user.posts ? user.posts.length : 'NO'} POSTS</Text>
          {
            !isHeaderShow ?
            <View style={styles.contentViewContainer}>
              {this.renderPosts()}
              <Button
                text="LOGOUT"
                buttonStyle={styles.logoutButton}
                textStyle={styles.logoutText}
                onPress={() => onSignOut().then(() => navigate("IntroStack"))}
              />
            </View> :
            this.renderPosts()
          }
        </View>
      </ScrollView>
    )
  }

  render() {
    const { navigate } = this.props.navigation
    const { user, isHeaderShow, fontLoaded, isLoading } = this.state

    return (
      this.state.fontLoaded && ( isLoading || user === null ? this.loadingView() : this.contentView() )
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerViewContainer: {
    borderBottomWidth: 1,
    borderColor: '#aaaaaa',
    backgroundColor: '#f9f9f9'
  },
  headerBannerViewContainer: {
    height: 170
  },
  bannerImage: {
    width: '100%',
    height: 170
  },
  headerContentViewContainer: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageContainer: {
    flex: 2,
    marginLeft: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    marginTop: -60
  },
  profileDetailsContainer: {
    flex: 5
  },
  profileStatsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  profileStat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsLabel: {
    fontFamily: 'Righteous',
    color: 'black',
    fontSize: 13,
    fontWeight: 'normal'
  },
  profileEditButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editProfileButton: {
    backgroundColor: 'transparent',
    borderColor: '#aaaaaa',
    borderWidth: 2,
    width: 150,
    height: 30,
    borderRadius: 5
  },
  editProfileText: {
    fontFamily: 'Righteous',
    color: 'black',
    fontSize: 13
  },
  followButton: {
    backgroundColor: '#28ABEC',
    width: 150,
    height: 30,
    borderRadius: 5
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderColor: '#aaaaaa',
    borderWidth: 2,
    width: 150,
    height: 30,
    borderRadius: 5
  },
  followText: {
    fontFamily: 'Righteous',
    color: 'white',
    fontSize: 13
  },
  followingText: {
    color: 'black',
  },
  headerFooterViewContainer: {
    justifyContent: 'center'
  },
  headerNameContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 5,
    marginHorizontal: 20,
  },
  nameText: {
    fontFamily: 'Righteous',
    fontSize: 20
  },
  headerBioContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  bioText: {
    fontFamily: 'Righteous',
    fontSize: 15
  },
  contentViewContainer: {
  },
  logoutButton: {
    width: 220,
    height: 50,
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: '#28ABEC'
  },
  logoutText: {
    fontFamily: 'Righteous',
    fontSize: 18
  },
  sectionHeaderText: {
    fontSize: 13,
    fontFamily: 'Righteous',
    color: '#aaaaaa',
    marginVertical: 10,
    marginLeft: 10
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 20
  },
  postIconContainer: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    backgroundColor: '#f9f9f9'
  },
  postImage: {
    flex: 1
  }
});
