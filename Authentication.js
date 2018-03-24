import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Button,
} from 'react-native';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = StackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = StackNavigator({ SignIn: SignInScreen });

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
 
class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.bootstrapAsync();
    }

    bootstrapAsync = async () => {

        const userToken = await AsyncStorage.getItem('userToken');

        this.props.navivation.navivate(userToken ? 'App' : 'Auth');
    };

    render() {

        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle = 'default' />
            </View>
        );
    }
}

class SignInScreen extends React.Component {

    render() {
        
        return (
            <View>
                <Button onPress = {this.signInAsync} />
            </View>
        );
    }

    signInAsync = async () => {

        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Welcome to the app!',
    };
    
    render() {
        return (
          <View style={styles.container}>
            <Button title="Show me more of the app" onPress={this._showMoreApp} />
            <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
          </View>
        );
    }
    
    _showMoreApp = () => {
        this.props.navigation.navigate('Other');
    };
    
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

class OtherScreen extends React.Component {

    render() {

        return (

            <View>
                <Text>Other</Text>
            </View>
        );
    }
}