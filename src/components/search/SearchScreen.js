import React, { useMemo } from "react";
import queryString from "query-string";

import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../heroes/HeroCard";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const [values, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = values;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>SearchScreen</h1>
      <hr />

      <div className="row">
        <div className="col-5 animate__animated animate__fadeIn">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="searchText"
              value={searchText}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Find your hero"
              className="form-control"
            />
            <button
              type="sunmit"
              className="btn mt-1 btn-block btn-outline-primary"
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-7 animate__animated animate__fadeInRight">
          <h4>Results</h4>
          <hr />

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}

          <div className="alert">
            {q === "" && "Search a hero"}
            {q !== "" &&
              !heroesFiltered.length &&
              `There is no a hero with ${q}`}
          </div>
        </div>
      </div>
    </div>
  );
};
