import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { Font, LinearGradient } from 'expo';
import { Button } from 'react-native-elements';

import LOGO_IMAGE from '../../assets/daug_logo.png';

import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants';

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

    const user = props.navigation.state.params && props.navigation.state.params.user
    const isHeaderShow = props.navigation.state.params && props.navigation.state.params.isHeaderShow

    this.state = {
      fontLoaded: false,
      user: user || SOCIAL_FEED_MOCK_DATA[0].user,
      isHeaderShow: isHeaderShow || false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  displayPost(post, index) {
    return (
      <View style={styles.commentContainer} key={index}>
        <TouchableOpacity onPress={() => navigate('Profile', { admin: 'false' })} activeOpacity={0.8}>
          <Image source={{ uri: post.image }} style={styles.commentAvatar} />
        </TouchableOpacity>
        <View style={styles.postUsernameLocationContainer}>
          <TouchableOpacity
            style={styles.postUsernameView}
            onPress={() => navigate('Profile', { admin: 'false' })}
          >
            <Text style={styles.commentUsernameLabel}>{post.caption}</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  render() {
    const { navigate } = this.props.navigation
    const { user, isHeaderShow } = this.state

    return (
      <ScrollView>
        {this.state.fontLoaded &&
          <View style={styles.mainContent}>
            <View style={styles.headerViewContainer}>
              <View style={styles.headerBannerViewContainer}>
                <Image
                  style={styles.bannerImage}
                  source={{ uri: user.banner }}
                  resizeMode='cover'
                />
              </View>
              <View style={styles.headerContentViewContainer}>
                <View style={styles.profileImageContainer}>
                  <Image
                    style={styles.profileImage}
                    source={{ uri: user.image }}
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
                      <Text style={styles.statsLabel}>{user.followers}</Text>
                      <Text style={styles.statsLabel}>Followers</Text>
                    </View>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>{user.following}</Text>
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
                          onPress={() => navigate('EditProfile')}
                        /> :
                        <Button text="Follow"
                          containerStyle={{ marginBottom: 10 }}
                          buttonStyle={styles.followButton}
                          textStyle={styles.followText}
                          onPress={() => console.log("Followed")}
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
            {user.posts && this.renderPosts()}
            {
              !isHeaderShow &&
              <View style={styles.contentViewContainer}>
                <Button
                  text="LOGOUT"
                  buttonStyle={styles.logoutButton}
                  textStyle={styles.logoutText}
                  onPress={() => navigate('IntroStack')}
                />
              </View>
            }
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
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
  followText: {
    fontFamily: 'Righteous',
    color: 'white',
    fontSize: 13
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
    height: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutButton: {
    width: 220,
    height: 50,
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
    backgroundColor: 'white'
  }
});
