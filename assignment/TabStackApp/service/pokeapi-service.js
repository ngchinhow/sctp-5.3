import { BerryClient, ItemClient, PokemonClient } from 'pokenode-ts';

const pokemonClient = new PokemonClient();
const berryClient = new BerryClient();
const itemClient = new ItemClient();

export async function listPokemons() {
  try {
    const response = await pokemonClient.listPokemons();
    return response.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getPokemonDetails(id) {
  try {
    return await pokemonClient.getPokemonById(id);
  } catch (error) {
    console.error(error);
  }
}

export async function listBerries() {
  try {
    const response = await berryClient.listBerries();
    return response.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getBerryDetails(id) {
  try {
    return await berryClient.getBerryById(id);
  } catch (error) {
    console.error(error);
  }
}

export async function getItemDetails(id) {
  try {
    return await itemClient.getItemById(id);
  } catch (error) {
    console.error(error);
  }
}