/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title = "Go to Detail"
          onPress = { () => this.props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          }) }
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'Details',
  };

  render() {

    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherparam = params ? params.otherParam : null;

    return (
      <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: { JSON.stringify(itemId) }</Text>
        <Text>otherParam: { JSON.stringify(otherparam) }</Text>
        <Button 
          title = 'Go back'
          onPress = { () => this.props.navigation.goBack() }
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}
