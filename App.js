import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import TeamDetailScreen from './screens/TeamDetailScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import FavoritePlayersScreen from './screens/FavoritePlayersScreen';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Details: {screen: TeamDetailScreen},
    Welcome: {screen: WelcomeScreen},
    FavoritePlayers: {screen: FavoritePlayersScreen},
  },
  {
    initialRouteName: 'Welcome',
  }
);

const App = createAppContainer(MainNavigator);

export default App;
