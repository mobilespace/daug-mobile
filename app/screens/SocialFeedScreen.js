import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Font, LinearGradient } from 'expo';
import { Button, Icon } from 'react-native-elements';

import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants';

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
      fontLoaded: false,
      commented: false,
      liked: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  renderMemberRow(member) {
    const { commented, liked } = this.state
    const { navigate } = this.props.navigation

    return (
      <View style={styles.postContainer} key={member}>
        <View style={styles.postHeaderContainer}>
          <TouchableOpacity onPress={() => navigate('Profile', { admin: 'false' })}>
            <Image source={{ url: member.image }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.postUsernameLocationContainer}>
            <TouchableOpacity
              style={[styles.postUsernameView, member.location && { marginTop: 10 }]}
              onPress={() => navigate('Profile', { admin: 'false' })}
            >
              <Text style={styles.nameLabel}>{member.name}</Text>
            </TouchableOpacity>
            {member.location &&
              <View style={styles.postLocationView}>
                <Text style={styles.locationLabel}>{member.location}</Text>
              </View>
            }
          </View>
        </View>
        <TouchableOpacity onPress={() => navigate('Post')}>
          <View style={styles.postContentContainer}>
            <Image source={{ url: member.post.image }} style={styles.postImage} resizeMode="cover" />
            <Text style={styles.postCaption}>{member.post.caption}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.postFooterContainer}>
          <View style={styles.postDateView}>
            <Text style={styles.postDateText}>{member.post.date}</Text>
          </View>
          <View style={styles.postActionView}>
            <Icon
              name={commented ? "ios-chatbubbles" : "ios-chatbubbles-outline"}
              color={commented ? 'black' : null} type="ionicon" size={25}
              onPress={() => this.setState({ commented: !commented })}
            />
            <Text style={styles.postActionText}>10</Text>
          </View>
          <View style={[styles.postActionView, {marginRight: 20}]}>
            <Icon
              name={liked ? "ios-heart" : "ios-heart-outline"}
              color={liked ? 'red' : null} type="ionicon" size={25}
              onPress={() => this.setState({ liked: !liked })}
            />
            <Text style={styles.postActionText}>200</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <ScrollView>
        {this.state.fontLoaded &&
          <View style={styles.mainContent}>
            <TouchableOpacity style={styles.createPostContainer} onPress={() => navigate('CreatePost')}>
              <Text style={styles.createPostLabel}>Create Post</Text>
            </TouchableOpacity>
            <FlatList
              data={SOCIAL_FEED_MOCK_DATA}
              extraData={this.state}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => this.renderMemberRow(item)}
            />
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center'
  },
  createPostContainer: {
    backgroundColor: '#f9f9f9',
    height: 50,
    justifyContent: 'center'
  },
  createPostLabel: {
    fontSize: 18,
    color: '#DA727E',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Righteous',
    marginLeft: 20
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
