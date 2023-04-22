import { useEffect, useState } from "react";
import { getPokeInfo } from "../components/getPokeInfo";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPokemons } from "./../components/api";
import { colors } from "../components/colors";
import { useRef } from "react";

export const Main = (props) => {
  const { setPokeName, pokeName, pokeList, setPokeList } = props;
  const [loading, setLoading] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
  const fetchMorePokemon = () => {
    setPokeList(
      pokeList.concat(
        arrayRange(
          parseInt(pokeList.slice(-1)),
          parseInt(pokeList.slice(-1)) + 20
        )
      )
    );
    console.log(pokeList.slice(-1));
  };
  // to make the scroll in one dive
  const scrollRef = useRef(null);
  // to change size in the scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollRef.current;
      const scrollHeight = scrollContainer.scrollHeight; // total height
      const clientHeight = scrollContainer.clientHeight; // THE HEIGHT OF THE SCROLLING AREA
      const scrollTop = scrollContainer.scrollTop; // The distance scrolled from the top
      const middlePosition = scrollTop + clientHeight / 2; // distance from the top to the actual middel section
      const cartHeight = 110;
      const middleId = Math.trunc(middlePosition / cartHeight) + 1;

      const middleUp2Element = document.getElementById(middleId - 2);
      const middleUpElement = document.getElementById(middleId - 1);
      const middleElement = document.getElementById(middleId);
      const middleDownElement = document.getElementById(middleId + 1);
      const middleDown2Element = document.getElementById(middleId + 2);

      middleUp2Element.classList.add("middleUp2Element");
      middleUp2Element.classList.remove("middleUpElement");

      middleUpElement.classList.add("middleUpElement");
      middleUpElement.classList.remove("middleElement");

      middleDownElement.classList.add("middleUpElement");
      middleDownElement.classList.remove("middleElement");

      middleDown2Element.classList.add("middleUp2Element");
      middleDown2Element.classList.remove("middleUpElement");

      middleElement.classList.add("middleElement");
    };

    // Attach the scroll event listener to the scroll container
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      // Detach the scroll event listener when component unmounts
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="displaySection">
      {/*       <button onClick={() => setLoading(loading ? false : true)}>
        refresh
      </button> */}
      {loading ? (
        <div>loading...</div>
      ) : (
        <div ref={scrollRef} className="pokemonList">
          <InfiniteScroll
            dataLength={pokeList.length}
            next={fetchMorePokemon}
            hasMore={true}
            loader={<h4>loading... pokemons</h4>}
            endMessage={<p>No more pokemons.</p>}
            scrollableTarget={scrollRef.current}
          >
            <div>
              {pokeList.map((object, i) => {
                return (
                  <DisplayPokeInfo
                    pokemon={object}
                    setPokeName={setPokeName}
                    key={i}
                    ydist={i + 1}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

const DisplayPokeInfo = (props) => {
  const { setPokeName, ydist } = props;
  const [pokeInfo, setPokeInfo] = useState({});

  useEffect(() => {
    getPokeInfo(props.pokemon).then((val) => setPokeInfo(val));
  }, []);

  const linkToMoreInfo = () => {
    setPokeName(pokeInfo.species);
  };

  return (
    <Link onClick={linkToMoreInfo} to="/pokeInfo">
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
    </Link>
  );
};
