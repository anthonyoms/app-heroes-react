import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = () => {
  const navigate = useNavigate();
  const { heroeId } = useParams();

  const hero = getHeroById(heroeId);
  if (!hero) {
    return <Navigate to="/" />;
  }
  const handleClick = () => {
    navigate(-1);
  };
  const { superhero, publisher, alter_ego, first_appearance, characters } =
    hero;
  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`../assets/heroes/${heroeId}.jpg`}
          alt={superhero}
          className="img-thumbnail"
        />
      </div>
      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>first appearance: </b>
            {first_appearance}
          </li>
        </ul>

        <h5>Characters: </h5>
        <p>{characters}</p>
        <button className="btn btn-outline-info" onClick={handleClick}>
          Return
        </button>
      </div>
    </div>
  );
};
