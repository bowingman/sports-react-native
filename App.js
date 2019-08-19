import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen.js';
import TeamDetailScreen from './screens/TeamDetailScreen.js';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Details: {screen: TeamDetailScreen}
  },
  {
    initialRouteName: "Home"
  }
);

const App = createAppContainer(MainNavigator);

export default App;
