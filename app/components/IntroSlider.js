import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import { Font, LinearGradient } from 'expo';

import LOGO_IMAGE from '../../assets/daug_logo.png';

export default class IntroSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Righteous': require('../../assets/fonts/Righteous-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <LinearGradient
        colors={['#fd746c', '#ff9068']}
        style={styles.sliderContainer}>
        <Image source={LOGO_IMAGE} style={styles.logoImage} resizeMode="contain" />
        {this.state.fontLoaded && <Text style={styles.logoTitle}>DAUG</Text>}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  logoTitle: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Righteous'
  }
});

