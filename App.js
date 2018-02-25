import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IntroScreen from './app/screens/IntroScreen';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <IntroScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
