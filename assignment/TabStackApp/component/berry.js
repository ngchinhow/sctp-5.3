import { useEffect, useState } from 'react';
import { StyleSheet, Image, View, FlatList, Pressable, Text } from 'react-native';
import loadingIcon from '../assets/icon.png';
import { getBerryDetails, getItemDetails, listBerries } from '../service/pokeapi-service';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function BerryGlancePanel({ shortDetail, navigation }) {
  const [berryDetails, setBerryDetails] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  let segments = shortDetail.url.split('/');
  let id = segments[segments.length - 2];

  useEffect(() => {
    getBerryDetails(id)
      .then((detail) => {
        setBerryDetails(detail);
        let segments = detail.item.url.split('/');
        let id = segments[segments.length - 2];
        return getItemDetails(id);
      })
      .then((item) => setItemDetails(item));
  }, []);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'lightblue' : 'white'
        },
        styles.glancepanel
      ]}
      onPress={() => navigation.navigate('Detail', { berryDetails: berryDetails, imageResource: itemDetails.sprites.default })}
    >
      <Image
        source={
          itemDetails === null ? loadingIcon : { uri: itemDetails.sprites.default }
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

function BerryGlanceScreen({ navigation }) {
  const [berryList, setBerryList] = useState([]);

  useEffect(() => {
    listBerries().then((details) => setBerryList(details));
  }, []);

  return (
    <View style={styles.glancescreen}>
      <FlatList
        data={berryList}
        renderItem={({ item }) => <BerryGlancePanel shortDetail={item} navigation={navigation} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

function BerryDetailRow({ hint, value }) {
  return (
    <View style={styles.detailrow}>
      <Text style={styles.detailtexthint}>{hint}</Text>
      <Text style={styles.detailtextvalue}>{value}</Text>
    </View>
  );
}

function BerryDetailScreen({ route }) {
  let berryDetails = route.params.berryDetails;
  let imageResource = route.params.imageResource;

  return (
    <View>
      <View style={styles.detailimage}>
        <Image
          source={{ uri: imageResource }}
          style={styles.detaillogo}
        />
      </View>
      <BerryDetailRow hint="Berry's name:" value={berryDetails.name} />
      <BerryDetailRow hint={`${berryDetails.name}'s size:`} value={berryDetails.size} />
      <BerryDetailRow hint={`${berryDetails.name}'s smoothness:`} value={berryDetails.smoothness} />
    </View>
  );
}

export default function BerryStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='List' component={BerryGlanceScreen} />
      <Stack.Screen name='Detail' component={BerryDetailScreen} />
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
