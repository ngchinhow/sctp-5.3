import { PokemonClient } from 'pokenode-ts';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const client = new PokemonClient();

async function listPokemons() {
  try {
    const response = await client.listPokemons();
    return response.results;
  } catch (error) {
    console.error(error);
  }
}

export default function App() {


  return (
    <View style={styles.container}>
      <Pressable
        onPress={listPokemons}
      >
        <Text>Open up App.js to start working on your app!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
