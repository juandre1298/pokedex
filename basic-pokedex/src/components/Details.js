import React, { useState, useEffect } from "react";
import { getPokeInfo } from "./getPokeInfo";
import { getPokeDetailInfo } from "./getPokeDetailInfo";
import { colors } from "./colors";

export const Details = (props) => {
  const { pokeName } = props;
  // check if the pokemon is selected & and fetch
  const [pokeChosen, setPokeChosen] = useState(false);
  useEffect(() => {
    if (pokeName) {
      setPokeChosen(true);
      searchPokemon();
    }
  }, [pokeName]);
  // fetch info of pokemon

  const [loadingMoreInfo, setLoadingMoreInfo] = useState(false);
  const [pokeInfo, setPokeInfo] = useState({});
  const [pokeMoreInfo, setPokeMoreInfo] = useState({});
  const [randomText, setRandomText] = useState([]);

  const searchPokemon = () => {
    setLoadingMoreInfo(true);
    getPokeInfo(pokeName).then((val) => setPokeInfo(val));
    getPokeDetailInfo(pokeName).then((val) => {
      setPokeMoreInfo(val);
      setRandomText(
        val.flavor_text_entries
          .filter((text) => text.language.name.includes("en"))
          .map((text) => text.flavor_text)
      );
      setLoadingMoreInfo(false);
    });
    setPokeChosen(true);
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div className="detailsPokemon">
      {!pokeChosen ? (
        <section>
          <h1>Try to capture one Pokemon! </h1>
          <p>Just click on it on the list, or look up in the search space</p>
        </section>
      ) : (
        <>
          {loadingMoreInfo ? (
            <h3>loading...</h3>
          ) : (
            <div className="detailCard">
              <div className="detailSectionPokeImg">
                <img src={pokeInfo.img} />

                <h1>{pokeInfo.species}</h1>
                <h1>#{pokeInfo.id}</h1>
              </div>
              <div className="DetailSectionInfo">
                <>
                  <div className="generalInfo">
                    <div className="rightSection">
                      <img src={pokeInfo.img1} />
                    </div>
                    <div>
                      <h3>Fun fact:</h3>
                      <p>{randomText[getRandomInt(randomText.length)]}</p>
                    </div>
                  </div>
                  <h2>characteristics</h2>
                  <div className="types">
                    {pokeInfo.types.length > 1 ? (
                      <h3>Types:</h3>
                    ) : (
                      <h3>Type:</h3>
                    )}
                    {pokeInfo.types?.map((type, i) => (
                      <h3
                        className="pokemonType"
                        key={i}
                        style={colors[type.type.name]}
                      >
                        {type.type.name}
                      </h3>
                    ))}
                  </div>
                  <div className="pokemonTypes"></div>
                  <h3>color: {pokeMoreInfo.color.name}</h3>
                  <h3>habitat: {pokeMoreInfo.habitat.name}</h3>
                  <h3>height:{(pokeInfo.other.height * 0.1).toFixed(2)} m</h3>
                  <h3>weight:{(pokeInfo.other.weight * 0.1).toFixed(2)} kg</h3>
                  {/*        <h2>stats</h2>
                <h3>HP: {pokeInfo.hp}</h3>
                <h3>Attack: {pokeInfo.attack}</h3>
                <h3>Defense: {pokeInfo.defense}</h3> */}
                </>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
