import { useEffect, useState } from "react";
import { getPokeInfo } from "../components/getPokeInfo";
import { Link } from "react-router-dom";

export const Main = (props) => {
  const { colors, setPokeName, pokeName, page, pokeList } = props;
  const [loading, setLoading] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  useEffect(() => {
    console.log(pokeName);
  }, [pokeList]);

  return (
    <div className="displaySection">
      {/*       <button onClick={() => setLoading(loading ? false : true)}>
        refresh
      </button> */}
      {loading ? (
        <div>loading...</div>
      ) : (
        pokeList.map((object, i) => {
          return (
            <DisplayPokeInfo
              pokemon={object}
              key={i}
              colors={colors}
              setPokeName={setPokeName}
            />
          );
        })
      )}
    </div>
  );
};

const DisplayPokeInfo = (props) => {
  const { colors, setPokeName } = props;
  const [pokeInfo, setPokeInfo] = useState({});

  useEffect(() => {
    getPokeInfo(props.pokemon).then((val) => setPokeInfo(val));
  }, []);

  const linkToMoreInfo = () => {
    setPokeName(pokeInfo.species);
  };

  return (
    <Link onClick={linkToMoreInfo} to="/pokeInfo">
      <div className="PokemonCard" key={pokeInfo.id}>
        <div className="PokemonInfo">
          <h1 className="pokemonName">{pokeInfo.species}</h1>
          <img className="pokemonImgMin" src={pokeInfo.img1} />
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
    </Link>
  );
};
