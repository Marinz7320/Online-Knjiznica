import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";
import "../css/Details_pc.css";
import "../css/Cart.css";
import { MainTitle } from "../MainTitle";
import Axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
function Cart() {
  const ctx = useContext(DataContext);

  const {
    theme,
    cart,
    increase,
    reduction,
    removeProduct,
    total,
    getTotal,
    isModalOn,
    errorMessage,
    handleDelete,
  } = ctx;
  const [state, setState] = useState({
    loginStatus: false,
    user: {},
  });

  useEffect(() => {
    let url = "http://localhost:3001";
    Axios.get(url + "/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setState({ loginStatus: true, user: response.data.user[0] });
      }
    });
  }, []);
  const closeModal = () => {
    ctx.setIsModalOn(false);
  };
  const openModal = () => {
    ctx.setIsModalOn(true);
  };
  if (cart.length === 0) {
    return (
      <div>
        <MainTitle title="Cart" provider={theme} />
        <h2 className={theme ? "theme-cart-main" : "cart-main"}>
          Your cart is empty
        </h2>
      </div>
    );
  } else {
    return (
      <>
        <MainTitle title="Cart" provider={theme} />
        {cart.map((item) => (
          <>
            <div className={theme ? "theme-cart" : "cart"} key={item._id}>
              <Link to={`/pc/${item._id}`}>
                <img src={item.src} alt="" />
              </Link>
              <div className="game-elements">
                <div className="game-title">
                  <Link to={`/pc/${item._id}`}>{item.title}</Link>
                </div>
                <div className="game-title">{item.author}</div>
                <div className="game-title">{item.indetificationNumber}</div>
              </div>
              <div className="box">
                <div className="pricee">
                  <p>Broj knjiga na stanju: </p>
                  <p>{item.count}</p>
                </div>
                <div className="per-item">
                  <p>Godina izdanja: </p>
                  <p>{item.price}</p>
                </div>
              </div>
              <div className="delete" onClick={openModal}>
                X
              </div>
            </div>
            {isModalOn && (
              <ConfirmationModal
                okButtonText={"OK"}
                cancelButtonText={"Cancel"}
                open={true}
                onClose={closeModal}
                errorMessage={errorMessage}
                onConfirm={() => removeProduct(item._id)}
              />
            )}
          </>
        ))}
        <div className={theme ? "theme-total" : "total"}>
          <Link to="/checkout">Checkout</Link>
          {/*{this.state.loginStatus ? "/checkout" : "/login"}*/}
          {/* <div className="total-price">
            <h3>Total: {total ? total.toFixed(2) : 0}</h3>
          </div> */}
        </div>
      </>
    );
  }
}

export default Cart;
