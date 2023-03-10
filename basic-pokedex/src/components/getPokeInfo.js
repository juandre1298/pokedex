import Axios from "axios";

export const getPokeInfo = (pokeName) => {
  return Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`).then(
    (res) => {
      return {
        name: pokeName,
        id: res.data.id,
        species: res.data.species.name,
        img1: res.data.sprites.front_default,
        img: res.data.sprites.other["official-artwork"].front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        types: res.data.types,
        other: res.data,
      };
    }
  );
};
