/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}
