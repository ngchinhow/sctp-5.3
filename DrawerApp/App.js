import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function Screen1() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen 1!</Text>
    </View>
  );
}

function Screen2() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen 2!</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Screen2'>
        <Drawer.Screen name='Screen1' component={Screen1} />
        <Drawer.Screen name='Screen2' component={Screen2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
