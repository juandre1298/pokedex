import { useEffect, useState } from "react";
import { getPokeInfo } from "./getPokeInfo";
import { Link } from "react-router-dom";
import { colors } from "./colors";

export const PokemonCard = (props) => {
  const { setPokeName, ydist } = props;
  const [pokeInfo, setPokeInfo] = useState({});

  useEffect(() => {
    getPokeInfo(props.pokemon).then((val) => setPokeInfo(val));
  }, []);

  const linkToMoreInfo = () => {
    setPokeName(pokeInfo.species);
  };

  return (
    <div onClick={linkToMoreInfo}>
      <div className="PokemonCard" key={pokeInfo.id} id={ydist}>
        <div className="PokemonInfo">
          <h1 className="pokemonName">{pokeInfo.species}</h1>
          {/* <img className="pokemonImgMin" src={pokeInfo.img1} /> */}
          <div className="pokemonTypes">
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
        </div>

        <p className="pokemonId">#{pokeInfo.id}</p>

        <img className="pokemonImg" src={pokeInfo.img} />
      </div>
    </div>
  );
};
