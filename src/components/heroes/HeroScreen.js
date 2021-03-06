import React, { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";
import { getHeroById } from "../../selectors/getHeroById";
export const HeroScreen = () => {
  const navigate = useNavigate();
  const { heroeId } = useParams();

  const hero = useMemo(() => getHeroById(heroeId), [heroeId]);
  if (!hero) {
    return <Navigate to="/" />;
  }
  const handleReturn = () => {
    heroeId.includes("dc") ? navigate("/dc") : navigate("/marvel");
  };
  const { superhero, publisher, alter_ego, first_appearance, characters } =
    hero;
  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={heroImages(`./${heroeId}.jpg`).default}
          alt={superhero}
          className="img-thumbnail card-columns animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8  animate__animated animate__fadeIn">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush card-columns">
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
        <button className="btn btn-outline-info" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};
