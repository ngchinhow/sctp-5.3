import { useEffect, useState } from 'react';
import { StyleSheet, Image, View, FlatList, Pressable, Text } from 'react-native';
import loadingIcon from '../assets/icon.png';
import { getPokemonDetails, listPokemons } from '../service/pokeapi-service';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function PokemonGlancePanel({ shortDetail, navigation }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  let segments = shortDetail.url.split('/');
  let id = segments[segments.length - 2];

  useEffect(() => {
    getPokemonDetails(id).then((detail) => setPokemonDetails(detail));
  }, []);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'lightblue' : 'white'
        },
        styles.glancepanel
      ]}
      onPress={() => navigation.navigate('Detail', { pokemonDetails: pokemonDetails })}
    >
      <Image
        source={
          pokemonDetails === null ? loadingIcon : { uri: pokemonDetails.sprites.front_default }
        }
        style={styles.glancelogo}
      />
      <Text
        style={styles.glancetext}
      >
        {shortDetail.name}
      </Text>
    </Pressable>
  );
}

function PokemonGlanceScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    listPokemons().then((details) => setPokemonList(details));
  }, []);

  return (
    <View style={styles.glancescreen}>
      <FlatList
        data={pokemonList}
        renderItem={({ item }) => <PokemonGlancePanel shortDetail={item} navigation={navigation} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

function PokemonDetailRow({ hint, value }) {
  return (
    <View style={styles.detailrow}>
      <Text style={styles.detailtexthint}>{hint}</Text>
      <Text style={styles.detailtextvalue}>{value}</Text>
    </View>
  );
}

function PokemonDetailScreen({ route }) {
  let pokemonDetails = route.params.pokemonDetails;

  return (
    <View>
      <View style={styles.detailimage}>
        <Image
          source={{ uri: pokemonDetails.sprites.front_default }}
          style={styles.detaillogo}
        />
      </View>
      <PokemonDetailRow hint="Pokemon's name:" value={pokemonDetails.name} />
      <PokemonDetailRow hint={`${pokemonDetails.name}'s height:`} value={pokemonDetails.height} />
      <PokemonDetailRow hint={`${pokemonDetails.name}'s weight:`} value={pokemonDetails.weight} />
    </View>
  );
}

export default function PokemonStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='List' component={PokemonGlanceScreen} />
      <Stack.Screen name='Detail' component={PokemonDetailScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  glancepanel: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  glancescreen: {
    flex: 1,
  },
  glancelogo: {
    height: 100,
    width: 100,
    padding: 10
  },
  glancetext: {
    fontSize: 25,
    width: 150,
    textAlign: 'left',
    marginLeft: 50
  },
  detaillogo: {
    height: 200,
    width: 200
  },
  detailimage: {
    width: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailrow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailtexthint: {
    width: 200,
    fontSize: 20,
    textAlign: 'right',
    marginRight: 20
  },
  detailtextvalue: {
    width: 200,
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 20
  }
});
