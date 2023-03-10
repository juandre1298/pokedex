export const getPokeDetailInfo = async (pokeName) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokeName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {}
};
