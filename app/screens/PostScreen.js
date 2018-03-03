import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { Font } from 'expo';

import { Button, Icon } from 'react-native-elements';

export default class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Post',
    headerTintColor: '#fd746c',
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Righteous'
    },
  });

  constructor(props) {
    super(props);

    const { post } = props.navigation.state.params

    this.state = {
      fontLoaded: false,
      member: post,
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

  displayComment(comment, index) {
    return (
      <View style={styles.commentContainer} key={index}>
        <TouchableOpacity onPress={() => navigate('Profile', { admin: 'false' })} activeOpacity={0.8}>
          <Image source={{ uri: comment.user.image }} style={styles.commentAvatar} />
        </TouchableOpacity>
        <View style={styles.postUsernameLocationContainer}>
          <TouchableOpacity
            style={styles.postUsernameView}
            onPress={() => navigate('Profile', { admin: 'false' })}
          >
            <Text style={styles.commentUsernameLabel}>{comment.user.name}</Text>
          </TouchableOpacity>
          <View style={styles.postLocationView}>
            <Text style={styles.commentContentLabel}>{comment.content}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderComments() {
    const { comments } = this.state.member

    return (
      <View style={styles.commentsContainer}>
        {
          comments.map((comment, index) => {
            return this.displayComment(comment, index)
          })
        }
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation
    const { member, commented, liked } = this.state

    const Component = member.comments ? ScrollView : View

    return (
      <Component style={styles.mainContent}>
        <View style={styles.postContainer} key={member}>
          <View style={styles.postHeaderContainer}>
            <TouchableOpacity onPress={() => navigate('Profile', { admin: 'false' })} activeOpacity={0.8}>
              <Image source={{ uri: member.image }} style={styles.avatar} />
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
          <TouchableOpacity onPress={() => navigate('Post', { post: member })} activeOpacity={1}>
            <View style={styles.postContentContainer}>
              <Image source={{ uri: member.post.image }} style={styles.postImage} resizeMode="cover" />
              <Text style={styles.postCaption}>{member.post.caption}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.postFooterContainer}>
            <View style={styles.postDateView}>
              <Text style={styles.postDateText}>{member.post.date}</Text>
            </View>
            <View style={[styles.postActionView, { marginRight: 20 }]}>
              <Icon
                name={liked ? "ios-heart" : "ios-heart-outline"}
                color={liked ? 'red' : null} type="ionicon" size={25}
                onPress={() => this.setState({ liked: !liked })}
              />
              <Text style={styles.postActionText}>200</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionHeaderText}>{member.comments ? member.comments.length : 'NO'} COMMENTS</Text>
        {member.comments && this.renderComments()}
      </Component>
    )
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1
  },
  postContainer: {
    backgroundColor: 'white',
    borderColor: '#aaaaaa'
  },
  postHeaderContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#aaaaaa',
  },
  commentContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(244,244,244,1)',
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
  commentAvatar: {
    height: 25,
    width: 25,
    borderRadius: 13.5,
    marginLeft: 10
  },
  nameLabel: {
    fontSize: 18,
    color: '#455C7B',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Righteous'
  },
  commentUsernameLabel: {
    fontSize: 14,
    color: '#44484B',
    marginLeft: 10,
    fontFamily: 'Righteous'
  },
  commentContentLabel: {
    flex: 1,
    fontSize: 15,
    color: '#656A73',
    marginLeft: 10,
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
  },
  sectionHeaderText: {
    fontSize: 13,
    fontFamily: 'Righteous',
    color: '#aaaaaa',
    marginVertical: 10,
    marginLeft: 10
  },
  commentsContainer: {
    backgroundColor: 'white'
  }
});
