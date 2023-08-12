import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PokemonStackScreen from './component/pokemon';
import berryDark from './assets/grape-dark.png';
import berry from './assets/grape.png';
import pokedexDark from './assets/pokedex-dark.png';
import pokedex from './assets/pokedex.png';
import BerryStackScreen from './component/berry';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let imageResource;

          if (route.name === 'Pokemon') {
            imageResource = focused ? pokedexDark : pokedex;
          } else if (route.name === 'Berry') {
            imageResource = focused ? berryDark : berry;
          }

          return <Image style={{ height: size, width: size }} source={imageResource} />
        },
        headerShown: false
      })}>
        <Tab.Screen name='Pokemon' component={PokemonStackScreen} />
        <Tab.Screen name='Berry' component={BerryStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
