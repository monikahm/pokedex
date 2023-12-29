import { Pokemon, PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export const fetchPokemonById = async (setPokemon: React.Dispatch<React.SetStateAction<Pokemon | undefined>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
    const randomPokemon = Math.floor(Math.random() * 1026)
    await api
        .getPokemonById(randomPokemon)
        .then((data) => setPokemon(data))
        .catch((error) => {
            setError("kunne ikke hente pokemon") 
            console.error(error)});
}

export const fetchPokemonByName = async (name: string, setPokemon: React.Dispatch<React.SetStateAction<Pokemon | undefined>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
    await api
        .getPokemonByName(name)
        .then((data) => setPokemon(data))
        .catch((error) => {
            setError("kunne ikke hente pokemon") 
            console.error(error)});
}
