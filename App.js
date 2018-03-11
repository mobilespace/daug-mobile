import React, { Component } from 'react';

import { createRootNavigator } from './app/navigation/RootNavigator';

import { isSignedIn } from './app/utils/helpers';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null
    }

    const Layout = createRootNavigator(signedIn);

    return (
      <Layout />
    )
  }
}
