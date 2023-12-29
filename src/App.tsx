import { Pokemon } from "pokenode-ts";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchPokemonById, fetchPokemonByName } from "./api/pokemon";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPokemonById(setPokemon, setError).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setError("");
  }, [pokemon]);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    if (!searchRef.current?.value) {
      setError("You cant submit empty field");
    } else {
      fetchPokemonByName(searchRef.current.value, setPokemon, setError).finally(
        () => setLoading(false)
      );
    }
  };

  if (loading) {
    return <div>...Summoning a pokemon!</div>;
  }

  const backgroundSwitcher = () => {
    const typeName = pokemon?.types[0].type.name;
    console.log(typeName);
    if (pokemon?.types.length === 1 && typeName === "normal") {
      return "rgb(212, 212, 212)";
    } else {
      switch (typeName) {
        case "bug":
          return "rgb(112, 204, 176)";
        case "grass":
          return "rgb(135, 199, 94)";
        case "ghost" || "poison":
          return "rgb(184, 79, 185)";
        case "electric":
          return "rgb(255, 207, 74)";
        case "ground" || "rock":
          return "rgb(225, 193, 105)";
        case "fairy":
          return "rgb(250, 217, 230)";
        case "fire":
          return "rgb(235, 116, 113)";
        case "water":
          return "rgb(138, 197, 248)";
        case "fighting":
          return "rgb(192, 48, 40)";
        case "psychic":
          return "rgb(248, 88, 136)";
        default:
          return "rgb(212, 212, 212)";
      }
    }
  };

  return (
    <div className="card" style={{ backgroundColor: backgroundSwitcher() }}>
      <h1>{pokemon?.name.toUpperCase()}</h1>
      <div className="card">
        <img width="100" src={`${pokemon?.sprites.front_default}`}></img>
        <h2>Type</h2>
        {pokemon?.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
        <h2>Abilities</h2>
        {pokemon?.abilities.map((ability, index) => (
          <p key={index}>{ability.ability.name.replace("-", " ")}</p>
        ))}
      </div>
      { !error && (
      <form>
        <input
          className="input"
          type="search"
          placeholder="Pokemon id or name..."
          ref={searchRef}
          required
        ></input>
        <button
          type="submit"
          onClick={(e) => {
            onSubmit(e);
            console.log(searchRef.current?.value);
          }}
        >
          Search
        </button>
      </form>
      )}
      {error && (
        <div className="app--flex">
          {error}
          <button
            onClick={() =>
              fetchPokemonById(setPokemon, setError).finally(() =>
                setLoading(false)
              )
            }
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
