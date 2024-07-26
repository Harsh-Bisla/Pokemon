import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonImages, setPokemonImages] = useState({});
 const name= useRef("");

 const getName=()=>{
  let newArr=pokemonName.filter((pokemon)=>pokemon.name===name.current.value)
  setPokemonName(newArr)
 }

  const url = "https://pokeapi.co/api/v2/pokemon?limit=100";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemonName(data.results);
        data.results.forEach((pokemon) => {
          fetch(pokemon.url)
            .then((res) => res.json())
            .then((data) => {
              setPokemonImages((prevImages) => ({
                ...prevImages,
                [pokemon.name]: data.sprites.front_default,
              }));
            });
        });
      });
  }, []);

  return (
    <>
      <div className="heading">
        <h1>Pokemon</h1>
      </div>

      <div className="input">
        <input type="text" placeholder="search..." ref={name}/>
        <button onClick={getName} className="btn">Search</button>
      </div>

      <div className="card-container">
        {pokemonName.map((pokemon) => (
          <div key={pokemon.name} className="card">
            <img src={pokemonImages[pokemon.name]} style={{ width: "150px" }} alt="logo" />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;