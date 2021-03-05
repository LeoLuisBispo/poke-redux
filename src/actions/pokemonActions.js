import axios from "axios";

export const getPokemonList = (page) => async (dispatch) => {
  try {
    const perPage = 15;
    const offset = page * 15 - perPage;

    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`
    );

    dispatch({
      type: "POKEMON_LIST_LOADING",
    });

    dispatch({
      type: "POKEMON_LIST_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "POKEMON_LIST_FAIL",
    });
  }
};

export const getPokemon = (pokemon) => async (dispatch) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    dispatch({
      type: "POKEMON_MULTIPLE_LOADING",
    });

    dispatch({
      type: "POKEMON_MULTIPLE_SUCCESS",
      payload: res.data,
      pokemonName: pokemon,
    });
  } catch (error) {
    dispatch({
      type: "POKEMON_MULTIPLE_FAIL",
    });
  }
};
