import React from 'react';
import {TouchableHighlight,Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import TeamDetailScreen from './screens/TeamDetailScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Details: {screen: TeamDetailScreen},
    Welcome: {screen: WelcomeScreen}
  },
  {
    initialRouteName: 'Welcome',
  }
);

const App = createAppContainer(MainNavigator);

export default App;
