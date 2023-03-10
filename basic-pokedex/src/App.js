import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/main.css";
import "./styles/navbar.css";
import "./styles/pokeInfo.css";
import { useState } from "react";
/* first we need to install npm "install axios" so we can make easier to call from the api */
import { PokeInfo } from "./pages/pokeInfo";
import { Main } from "./pages/main";
import { Navbar } from "./components/navbar";
import { getPokemons } from "./components/api";

function App() {
  let colors = {
    normal: {
      backgroundColor: "#A8A878",
      borderTopColor: "#D8D8D0",
      borderBottomColor: "#705848",
    },
    fire: {
      backgroundColor: "#F08030",
      borderTopColor: "#F8D030",
      borderBottomColor: "#C03028",
    },
    water: {
      backgroundColor: "#6890F0",
      borderTopColor: "#98D8D8",
      borderBottomColor: "#807870",
    },
    grass: {
      backgroundColor: "#78C850",
      borderTopColor: "#C0F860",
      borderBottomColor: "#588040",
    },
    electric: {
      backgroundColor: "#F8D030",
      borderTopColor: "#F8F878",
      borderBottomColor: "#B8A038",
    },
    ice: {
      backgroundColor: "#98D8D8",
      borderTopColor: "#D0F8E8",
      borderBottomColor: "#9090A0",
    },
    fighting: {
      backgroundColor: "#C03028",
      borderTopColor: "#F08030",
      borderBottomColor: "#484038",
    },
    poison: {
      backgroundColor: "#A040A0",
      borderTopColor: "#D880B8",
      borderBottomColor: "#483850",
    },
    ground: {
      backgroundColor: "#E0C068",
      borderTopColor: "#F8F878",
      borderBottomColor: "#886830",
    },
    ground: {
      backgroundColor: "#E0C068",
      borderTopColor: "#F8F878",
      borderBottomColor: "#886830",
    },
    flying: {
      backgroundColor: "#A890F0",
      borderTopColor: "#C8C0F8",
      borderBottomColor: "#705898",
    },
    psychic: {
      backgroundColor: "#F85888",
      borderTopColor: "#F8C0B0",
      borderBottomColor: "#789010",
    },
    bug: {
      backgroundColor: "#A8B820",
      borderTopColor: "#D8E030",
      borderBottomColor: "#A8B820",
    },
    ghost: {
      backgroundColor: "#705898",
      borderTopColor: "#A890F0",
      borderBottomColor: "#483850",
    },
    dark: {
      backgroundColor: "#705848",
      borderTopColor: "#A8A878",
      borderBottomColor: "#484038",
    },
    dragon: {
      backgroundColor: "#7038F8",
      borderTopColor: "#B8A0F8",
      borderBottomColor: "#483890",
    },
    steel: {
      backgroundColor: "#B8B8D0",
      borderTopColor: "#D8D8C0",
      borderBottomColor: "#807870",
    },
    fairy: {
      backgroundColor: "#F0B6BC",
      borderTopColor: "#F5CAD1",
      borderBottomColor: "#905F63",
    },
  };
  const [pokeName, setPokeName] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [pokeList, setPokeList] = useState([]);

  const fetchPokemons = async () => {
    let data = await getPokemons(30, 1);
    setTotal(Math.ceil(data.count / 30));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    setPokeList(arrayRange(page * 30 + 1, page * 30 + 30, 1));
  }, [page]);

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const pageNext = () => {
    setPage(Math.min(total, page + 1));
  };

  const pagePrevious = () => {
    setPage(Math.max(1, page - 1));
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          pokeName={pokeName}
          setPokeName={setPokeName}
          page={page}
          total={total}
          pageNext={pageNext}
          pagePrevious={pagePrevious}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                colors={colors}
                setPokeName={setPokeName}
                pokeName={pokeName}
                page={page}
                setPage={setPage}
                total={total}
                setTotal={setTotal}
                pokeList={pokeList}
              />
            }
          />
          <Route
            path="/pokeInfo"
            element={
              <PokeInfo
                colors={colors}
                pokeName={pokeName}
                setPokeName={setPokeName}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
