import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { Font, LinearGradient } from 'expo';
import { Button } from 'react-native-elements';

import LOGO_IMAGE from '../../assets/daug_logo.png';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
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
    const { navigate } = this.props.navigation

    return (
      <ScrollView>
        {this.state.fontLoaded &&
          <View style={styles.mainContent}>
            <View style={styles.headerViewContainer}>
              <View style={styles.headerBannerViewContainer}>
                <Image
                  style={styles.bannerImage}
                  source={{ url: 'http://puppytoob.com/wp-content/uploads/2015/05/dalmatian-1024x683.jpg' }}
                  resizeMode='cover'
                />
              </View>
              <View style={styles.headerContentViewContainer}>
                <View style={styles.profileImageContainer}>
                  <Image
                    style={styles.profileImage}
                    source={{ url: 'https://thumbs.dreamstime.com/b/dalmatian-puppy-portrait-10524552.jpg' }}
                    resizeMode='cover'
                  />
                </View>
                <View style={styles.profileDetailsContainer}>
                  <View style={styles.profileStatsContainer}>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>1</Text>
                      <Text style={styles.statsLabel}>Posts</Text>
                    </View>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>281</Text>
                      <Text style={styles.statsLabel}>Followers</Text>
                    </View>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>124</Text>
                      <Text style={styles.statsLabel}>Following</Text>
                    </View>
                  </View>
                  <View style={styles.profileEditButtonContainer}>
                    <Button text="Edit Profile"
                      containerStyle={{ marginBottom: 10 }}
                      buttonStyle={styles.editProfileButton}
                      textStyle={styles.editProfileText}
                      onPress={() => navigate('EditProfile')}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.headerFooterViewContainer}>
                <View style={styles.headerNameContainer}>
                  <Text style={styles.nameText}>Charlie</Text>
                </View>
                <View style={styles.headerBioContainer}>
                  <Text style={styles.bioText}>The world's friendliest dalmation!</Text>
                </View>
              </View>
            </View>
            <View style={styles.contentViewContainer}>
              <Button
                text="LOGOUT"
                buttonStyle={styles.logoutButton}
                textStyle={styles.logoutText}
                onPress={() => navigate('IntroStack')}
              />
            </View>
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
  }
});
