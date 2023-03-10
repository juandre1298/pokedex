import React from "react";
import { useState } from "react";
import { searchPokemon } from "../api";

const Searchbar = (props) => {
  const { onSearch } = props;
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState("");

  const changeSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      onSearch(null);
    }
  };

  const pokeSearch = async (e) => {
    onSearch(search);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input placeholder="who's that pokemon???" onChange={changeSearch} />
      </div>
      <div className="searchbar-btn">
        <button onClick={pokeSearch}>Buscar</button>
      </div>
      <div></div>
    </div>
  );
};

export default Searchbar;
