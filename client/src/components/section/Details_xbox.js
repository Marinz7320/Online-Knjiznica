import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";
import "../css/Details_pc.css";
import ShowMore from "../ShowMore";
import { useParams } from "react-router-dom";
import { xboxx } from "../../data_xbox";
function Details_xbox() {
  const ctx = useContext(DataContext);
  const [xbox, setXbox] = useState([]);
  const params = useParams();
  const getXbox = () => {
    if (params.id) {
      const res = xboxx;
      const data = res.filter((item) => {
        return parseInt(item._id) === parseInt(params.id);
      });
      setXbox(data);
    }
  };
  useEffect(() => {
    getXbox();
  }, []);
  const { theme, addFavorite, addCart } = ctx;
  return (
    <>
      {xbox.map((item) => (
        <div className={theme ? "theme-details" : "details"} key={item._id}>
          <div>
            <img src={item.src} alt="" width="270px" />
          </div>
          <div className="title-details">
            <div className="game-name">
              <p>{item.title}</p>
            </div>
            <div className="content">
              <p>
                <ShowMore content={item.content} />
              </p>
            </div>
          </div>
          <div className="right-details">
            <div className="real-price" title="">
              <span>{item.price}</span>
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
            <Link
              to="/cart"
              title="Add to cart"
              onClick={() => addCart(item._id)}
            >
              Add to cart
            </Link>
            <Link
              to="/favorite"
              title="Add to favorite"
              onClick={() => addFavorite(item._id)}
            >
              Add to favorite
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default Details_xbox;
