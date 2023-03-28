import React, { useContext } from "react";
import HomeImg from "../img/home_img.jpg";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { MainTitle } from "../MainTitle";
import { DataContext, ProductConsumer } from "../Context";
import { pcc } from "../../data_pc";
import { psnn } from "../../data_psn";
import { xboxx } from "../../data_xbox";
function Home() {
  const ctx = useContext(DataContext);
  const { theme } = ctx;
  function applyFilter(type) {
    pcc.forEach((element) => {
      return (element.type = "pc");
    });
    psnn.forEach((element) => {
      return (element.type = "psn");
    });
    xboxx.forEach((element) => {
      return (element.type = "xbox");
    });
    var daily_games =
      type === "pc" ? [...pcc] : type === "psn" ? [...psnn] : [...xboxx];
    var daily_index = [2, 6, 9, 11, 13, 14];
    var random_list = [];
    for (var i = 0; i < 6; i++) {
      random_list.push(daily_games[daily_index[i]]);
    }
    return random_list.map((game) => (
      <div
        className={theme ? "theme-card" : "card"}
        title={game.title}
        key={game._id}
      >
        <Link to={`/${game.type}/${game._id}`}>
          <img src={game.src} alt="" />
        </Link>
        <ul>
          <li>
            <div className="game-name">
              <Link to={`/${game.type}/${game._id}`}>{game.title}</Link>
            </div>
          </li>
          <li>
            <div className="real-price">
              <Link to={`/${game.type}/${game._id}`}>{game.author}</Link>
            </div>
          </li>
          <li>
            <div className="release-date">
              <Link to={`/${game.type}/${game._id}`}>{game.price}</Link>
            </div>
          </li>
          <li>
            <div className="real-price">
              <Link to={`/${game.type}/${game._id}`}>
                {game.indetificationNumber}
              </Link>
            </div>
          </li>
          <li className="on-sale">
            {game.discount ? (
              <div className="discountt">
                <span>{game.onsale}</span>
              </div>
            ) : (
              <div></div>
            )}
            {game.discount ? (
              <div className="minus">
                <span>-{game.discount}%</span>
              </div>
            ) : (
              <div></div>
            )}
            <div className={game.new === "new" ? "new-game" : ""}>
              <span>{game.new}</span>
            </div>
          </li>
        </ul>
      </div>
    ));
  }

  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div>
            <div className="home-img">
              <img src={HomeImg} alt="" />
            </div>
            <div className="home-content">
              <MainTitle title="Strojarstvo" provider={value.theme} type="pc" />
              {applyFilter("pc")}
              <MainTitle
                title="Računarstvo"
                provider={value.theme}
                type="psn"
              />
              {applyFilter("psn")}
              <MainTitle
                title="Elektrotehnika"
                provider={value.theme}
                type="xbox"
              />
              {applyFilter("xbox")}
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Home;
