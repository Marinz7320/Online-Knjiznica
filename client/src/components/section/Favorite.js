import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";
import "../css/Favorite.css";
import "../css/Pcc.css";
import { MainTitle } from "../MainTitle";
function Favorite() {
  const ctx = useContext(DataContext);
  const { theme, favorite, removeFavorite } = ctx;
  const [favorites, setFavorites] = useState(
    localStorage.getItem("dataFavorite")
      ? JSON.parse(localStorage.getItem("dataFavorite"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("dataFavorite", JSON.stringify(favorite));
  }, []);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("dataFavorite")));
  }, []);
  if (favorites.length === 0) {
    return (
      <div>
        <MainTitle title="Favorite" provider={theme} />
        <h2 className={theme ? "theme-card-main" : "card-main"}>
          Your wish list is empty
        </h2>
      </div>
    );
  } else {
    return (
      <>
        <MainTitle title="Favorite" provider={theme} />
        <div className="favorites-list">
          {favorites.map((item) => (
            <div className="card" title={item.title} key={item._id}>
              <Link to={`/pc/${item._id}`}>
                <img src={item.src} alt="" />
              </Link>
              <div className={theme ? "theme-title-column" : "title-column"}>
                <div className="game-name">
                  <Link to={`/pc/${item._id}`}>{item.title}</Link>
                </div>
              </div>
              <div className="right-column">
                <div className="real-price" title="">
                  <Link to={`/pc/${item._id}`}>{item.price}</Link>
                </div>
                <div className="real-price" title="">
                  <Link to={`/pc/${item._id}`}>
                    {item.identificationNumber}
                  </Link>
                </div>
                <div className="real-price" title="">
                  <Link to={`/pc/${item._id}`}>{item.author}</Link>
                </div>
                <div className="favorites-button">
                  <button
                    to="/favorite"
                    title="Add to favorite"
                    onClick={() => removeFavorite(item._id)}
                  >
                    Remove from favorites
                  </button>
                </div>

                <div className="on-sale">
                  {item.discount ? (
                    <div className="discountt">
                      <span>{item.onsale}</span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {item.discount ? (
                    <div className="minus">
                      <span>-{item.discount}%</span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className={item.new === "new" ? "new-game" : ""}>
                    <span>{item.new}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Favorite;
