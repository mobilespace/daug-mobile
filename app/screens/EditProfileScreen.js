import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Font } from 'expo';
import { Input } from 'react-native-elements';

export default class EditProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Edit Profile",
    headerTintColor: '#fd746c',
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Righteous'
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Righteous' }}>Cancel</Text>
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Righteous' }}>Done</Text>
        </View>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const { name, bio, email } = this.state

    return (
      <View style={styles.mainContent}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.profileImage}
            source={{ url: 'https://thumbs.dreamstime.com/b/dalmatian-puppy-portrait-10524552.jpg' }}
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
    )
  }
}

const styles = StyleSheet.create({
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
