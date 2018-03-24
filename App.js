/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {

    return {
      title: "home",
      headerLeft: (
        <Button
          onPress = { () => navigation.navigate('MyModal') }
          title = 'info'
        />
      ),
    }
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

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details'
    }
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

class ModalScreen extends React.Component {

  render() {

    return (
      <View>
        <Text>This is modal</Text>
        <Button
          onPress = { () => this.props.navigation.goBack() }
          title = "dismiss"
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {

  render() {

    return (
      <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f59054' }}>
        <Text>Settings</Text>
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
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f50948',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const ModalStack = StackNavigator(
  {
    Root: {
      screen: RootStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const TabNavigation = TabNavigator({
  Home: { screen: ModalStack },
  Settings: { screen: SettingsScreen },
});

export default class App extends React.Component {

  render() {
    return <TabNavigation />;
  }
}
