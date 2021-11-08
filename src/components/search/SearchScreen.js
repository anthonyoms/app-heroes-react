import React from "react";
import { heroes } from "../../data/heroes";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchScreen = () => {
    const location = useLocation();
    console.log(location)
    
  const navigate = useNavigate();
  const [values, handleInputChange, reset] = useForm({
    searchText: "",
  });

  const { searchText } = values;
  const heroesFiltered = heroes;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
    reset();
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
        </div>
      </div>
    </div>
  );
};
