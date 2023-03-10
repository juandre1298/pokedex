import React from "react";
import FavoriteContext from "../contexts/favoritesContext";
const { useContext } = React;
const Navbar = () => {
  const { favoritePokemons } = useContext(FavoriteContext);
  console.log(favoritePokemons);
  let imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <nav>
      <div>
        <img src={imgUrl} alt="pokeapi logo" className="navbar-img" />
      </div>
      <div className="likedPokemons">
        &#10084;&#65039; {favoritePokemons.length}
      </div>
    </nav>
  );
};

export default Navbar;
