import React from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getPokemonList } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const PokemonList = (props) => {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  React.useEffect(() => {
    FetchData();
  }, []);

  const FetchData = (page = 1) => {
    dispatch(getPokemonList(page));
  };

  const ShowData = () => {
    if (pokemonList.loading) {
      return <p>loading...</p>;
    }

    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className="list-wrapper">
          {pokemonList.data.map((el) => {
            return (
              <div className="pokemon-item">
                <p>{el.name}</p>
                <Link to={`/pokemon/${el.name}`}>View</Link>
              </div>
            );
          })}
        </div>
      );
    }

    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>unable do get data</p>;
  };

  return (
    <div>
      <div className="search-wrapper">
        <p>Search: </p>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => props.history.push(`/pokemon/${search}`)}>
          search
        </button>
      </div>
      {ShowData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName={"pagination"}
        />
      )}
    </div>
  );
};

export default PokemonList;
