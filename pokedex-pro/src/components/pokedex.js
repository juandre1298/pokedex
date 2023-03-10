import React from "react";
import Pokemon from "./pokemon";
import Pagination from "./pagination";

const Pokedex = (props) => {
  const { pokemon, page, setPage, total, loading } = props;
  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  };
  const nextPage = () => {
    const nextPage = Math.min(page + 1, total);
    setPage(nextPage);
  };
  console.log(loading);
  return (
    <div>
      <div className="header">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={total}
          onLeftClick={lastPage}
          onRightClick={nextPage}
        />
      </div>
      {loading ? (
        <div>catching them all!</div>
      ) : (
        <div className="pokedex-grid">
          {pokemon.map((pokemon, idx) => {
            return <Pokemon pokemon={pokemon} key={pokemon.name} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
