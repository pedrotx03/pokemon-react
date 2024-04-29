import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(response => response.json())
      .then(data => {
        const pokemonPromises = data.results.map(result =>
          fetch(result.url).then(response => response.json())
        );
        Promise.all(pokemonPromises)
          .then(pokemonData => {
            setPokemons(pokemonData);
          })
          .catch(error => {
            console.error("Error fetching Pokemon data:", error);
          });
      })
      .catch(error => {
        console.error("Error fetching Pokemon list:", error);
      });
  }, []);
  return (
  <>
  <div>
    {pokemons.map(pokemon =>(
      <img alt={pokemon.name} src={pokemon.sprites.front_default}/>   
    ))}
  </div>
  </>
  );
}

export default App;
