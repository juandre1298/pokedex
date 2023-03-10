import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./pagination";

export const Navbar = (props) => {
  const { pokeName, setPokeName, total, page, pageNext, pagePrevious } = props;
  const [pokemonInput, setPokemonInput] = useState("");

  const setNewPokemon = () => {
    setPokeName(pokemonInput);
  };

  return (
    <div className="navbar">
      <Link className="pokedexIcon" to="/">
        Pokedex!
      </Link>
      <div className="searchSection">
        <input
          className="PokemonInput"
          type={"text"}
          onChange={(event) => {
            setPokemonInput(event.target.value);
          }}
          placeholder={"who's that pokemon???"}
        />
        <button onClick={setNewPokemon}>&#128269;</button>
      </div>

      <Pagination
        onLeftClick={pagePrevious}
        onRightClick={pageNext}
        page={page + 1}
        totalPages={total}
      />
      <div className="navbarButtons">
        <Link to="/">Home</Link>
        <Link to="/pokeInfo">Search Pokemon</Link>
      </div>
    </div>
  );
};
