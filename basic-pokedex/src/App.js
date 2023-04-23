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
import { colors } from "./components/colors";

function App() {
  const [pokeName, setPokeName] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [pokeList, setPokeList] = useState([]);
  // just to know how many pokemonts there are
  const fetchPokemons = async () => {
    let data = await getPokemons(60, 30);
    setTotal(Math.ceil(data.count / 30));
  };

  useEffect(() => {
    fetchPokemons();
    setPokeList(arrayRange(1, 30, 1));
  }, []);

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  return (
    <div className="App">
      <Router>
        <Navbar
          pokeName={pokeName}
          setPokeName={setPokeName}
          page={page}
          total={total}
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
                setPokeList={setPokeList}
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
