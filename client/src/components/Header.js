import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import okLogo from "./img/ok-logo.png";
import booksLogo from "./img/books-logo.png";
import "./css/Header.css";
import { DataContext } from "./Context";
import NamesContainer from "./NamesContainer";
import Axios from "axios";
import { pcc } from "../data_pc";
import { psnn } from "../data_psn";
import { xboxx } from "../data_xbox";
function Header() {
  const ctx = useContext(DataContext);
  let allGames = [];
  allGames = allGames.concat(pcc, psnn, xboxx);
  const {
    cart,
    theme,
    changeTheme,
    headerMargin,
    changeHeaderMargin,
    favorite,
  } = ctx;
  const [state, setState] = useState({
    toggle: false,
    loggedIn: false,
    currentUser: {},
    toggleLogin: false,
    toggleSearch: false,
    iconSearch: false,
    gameNames: [],
    searchTerm: "",
    cartClass: "",
    favoriteClass: "",
  });

  const menuToggle = () => {
    setState({ ...state, toggle: !state.toggle });
  };
  useEffect(() => {
    let url = "http://localhost:3001";
    Axios.defaults.withCredentials = true;
    Axios.get(url + "/login", {
      headers: { "x-access-token": localStorage.getItem("token") },
    }).then((response) => {
      if (response.data.loggedIn === true) {
        setState({
          loggedIn: response.data.loggedIn,
          currentUser: response.data.userInfo,
          Authority: response.data.role_name,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setState({
      toggle: false,
      loggedIn: false,
      currentUser: {},
    });
  };

  const menuToggleLogin = () => {
    setState({ toggleLogin: !state.toggleLogin });
  };

  const menuToggleSearch = () => {
    setState({ toggleSearch: !state.toggleSearch });
  };

  const menuIconSearch = (e) => {
    setState({ iconSearch: !state.iconSearch });
  };

  const editSearchTerm = (e) => {
    setState({ searchTerm: e.target.value });
  };

  const dynamicSearch = () => {
    return allGames.filter((game) =>
      game.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  };
  return (
    <header
      className={
        "" +
        (theme ? "theme " : "") +
        (headerMargin ? "header-margin " : "header-margin-false ")
      }
    >
      <div className={theme ? "theme-menu" : "menu"}>
        <i className="fas fa-bars fa-lg" onClick={menuToggle}></i>
        <i className="fas fa-adjust fa-lg" onClick={() => changeTheme()}></i>
      </div>
      <div className="logo">
        <Link to="/" title="Onlina FSRE Knjižnica">
          <img src={booksLogo} />
        </Link>
      </div>
      <div className={theme ? "theme-welcome" : "welcome"}>
        <p>Dobrodošli na Online FSRE Knjižnica</p>
        <p> | </p>
        <span title="Change theme" onClick={() => changeTheme()}>
          Promijeni temu
        </span>
      </div>
      <div className={theme ? "theme-user-login" : "user-login"}>
        <div className="admins">
          <Link
            to={
              state.loggedIn && state.Authority === "SuperAdmin"
                ? "/admins"
                : "/"
            }
          >
            {state.loggedIn && state.Authority === "SuperAdmin"
              ? "Admins |"
              : ""}
          </Link>

          <Link
            to={
              (state.loggedIn && state.Authority === "SuperAdmin") ||
              state.Authority === "Admin"
                ? "/users"
                : "/"
            }
          >
            {(state.loggedIn && state.Authority === "SuperAdmin") ||
            state.Authority === "Admin"
              ? "Users"
              : ""}
          </Link>
        </div>
        <div className="login">
          <Link to={state.loggedIn ? "/userInfo" : "/signup"}>
            {state.loggedIn ? state.currentUser.username : "Sign Up"}
          </Link>
          <p className="paragraf">|</p>
          <Link to="/login" onClick={state.loggedIn ? logout : () => {}}>
            {state.loggedIn ? "Log Out" : "Log In"}
          </Link>
        </div>
      </div>
      <nav className={theme ? "theme-nav" : ""}>
        <ul className={state.toggle ? "toggle" : ""}>
          <li>
            <Link
              to="/pc"
              title="PC"
              onClick={() => {
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              }}
            >
              <i className="fas fa-desktop fa-lg"></i>Strojarstvo
            </Link>
          </li>
          <li>
            <Link
              to="/psn"
              title="PSN"
              onClick={() => {
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              }}
            >
              <i className="fab fa-playstation fa-lg"></i>Računarstvo
            </Link>
          </li>
          <li>
            <Link to="/" title="Online FSRE Knjižnica">
              <img src={okLogo} alt="" width="100" />
            </Link>
          </li>
          <li>
            <Link
              to="/xbox"
              title="XBOX"
              onClick={() => {
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              }}
            >
              <i className="fab fa-xbox fa-lg"></i>Elektrotehnika
            </Link>
          </li>
          {/* <li>
              <Link to="/sale" title="SALE">
                <i className="fas fa-percent fa-lg"></i>SALE
              </Link>
            </li>
            <li>
              <Link to="/new" title="NEW">
                <i className="fas fa-tag fa-lg"></i>NEW
              </Link>
            </li>
            <li>
              <Link to="/dailydeals" title="DAILY DEALS">
                <i className="fab fa-hotjar fa-lg"></i>DAILY{" "}
                <span className="red">DEALS</span>
              </Link>
            </li> */}
          <li className="close" onClick={menuToggle}>
            <i className="fas fa-times fa-2x"></i>
          </li>
        </ul>
      </nav>
      <div className={theme ? "theme-i" : "nav-right"}>
        <div className={theme ? "theme-search-part" : "search-part"}>
          <div onClick={() => changeHeaderMargin()}>
            <i onClick={menuIconSearch}>
              {state.iconSearch ? (
                ""
              ) : (
                <i
                  className="fas fa-search fa-lg"
                  title="Search"
                  onClick={menuToggleSearch}
                ></i>
              )}
            </i>
          </div>
          <div
            className={
              state.toggleSearch
                ? "toggle-search"
                : "toggle-search-false fontAwesome"
            }
          >
            <div className="search-div">
              <input
                type="text"
                value={state.searchTerm}
                onChange={editSearchTerm}
                placeholder="&#xF002;  Search"
              />
            </div>
            <div className="search-right">
              <div
                className="ikss"
                onClick={() => {
                  menuToggleSearch();
                  changeHeaderMargin();
                }}
              >
                <i className="fas fa-times" onClick={menuIconSearch}>
                  {state.iconSearch ? (
                    ""
                  ) : (
                    <i
                      className="fas fa-search fa-lg"
                      title="Search"
                      onClick={menuToggleSearch}
                    ></i>
                  )}
                </i>
              </div>
              <div className="search-enter">
                <i className="fas fa-search fa-lg"></i>
              </div>
            </div>
          </div>
          <h3></h3>
          {/* <NamesContainer games={allGames} /> */}
        </div>
        <Link to="/favorite" title="Favorite">
          <i className={"far fa-heart fa-lg"}></i>
        </Link>
        <Link
          to="/cart"
          title="Cart"
          className={cart.length ? "red-circle" : "redd"}
        >
          <i className="fas fa-shopping-cart fa-lg"></i>
          <span>{cart.length}</span>
        </Link>
        <div className="user-mobile" title="Profile">
          <i className="fas fa-user fa-lg" onClick={menuToggleLogin}></i>
        </div>
      </div>
      <div className="tgs">
        <Link to="/" title="THE GAME SHOP">
          <img src={okLogo} alt="" width="80" />
        </Link>
      </div>
      <div
        className={state.toggleLogin ? "toggle-login" : "toggle-login-false"}
      >
        {/* <div className="input-first">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-second">
            <input type="password" placeholder="Password" required />
          </div>
          <input className="header-log" type="submit" value="Login"/>
          <div className="dont-have">
              <div className="line"></div>
              <p>Don't have an account?</p>
          </div>
          <input className="header-sign" type="submit" value="Sign Up"/> */}
        <div className={theme ? "theme-profile-side" : "profile-side"}>
          <Link to="/userInfo" className="user-side" title="Profile">
            <i className="fas fa-user fa-lg"></i>Profile
          </Link>
          <Link to="/users" className="users-side" title="Users">
            <i class="fas fa-users fa-lg"></i>Users
          </Link>
          <Link
            to="/favorite"
            className={favorite.length ? "red-circle" : "redd cart-side"}
            title="Favorite"
          >
            <i className="fas fa-heart fa-lg"></i>Favorite
            <span>{favorite.length}</span>
          </Link>
          <Link
            to="/cart"
            title="Cart"
            className={cart.length ? "red-circle" : "redd cart-side"}
          >
            <i className="fas fa-shopping-cart fa-lg"></i>Cart
            <span>{cart.length}</span>
          </Link>
          <div className="logout-side" title="Logout">
            <i class="fas fa-sign-out-alt fa-lg"></i>Logout
          </div>
        </div>
        <div>
          <i
            className="fas fa-times fa-2x close-log"
            onClick={menuToggleLogin}
          ></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
