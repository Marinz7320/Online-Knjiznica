import React, { useState, useEffect } from "react";
import { pcc } from "../data_pc";
import { psnn } from "../data_psn";
import { xboxx } from "../data_xbox";

const DataContext = React.createContext({
  pcc: pcc,
  psnn: psnn,
  xboxx: xboxx,
  changeTheme: () => {},
  changeHeaderMargin: () => {},
  editSearchTerm: () => {},
  view: "flexrow",
  dynamicSearch: () => {},
  cart: [],
  favorite: [],
  total: 0,
  changeTheme: () => {},
  addCart: () => {},
  setGames: () => {},
  theme: false,
  isModalOn: false,
  setIsModalOn: () => {},
  removeProduct: () => {},
  errorMessage: "",
});

const DataProvider = (props) => {
  const [theme, setTheme] = useState(false);
  const [headerMargin, setHeaderMargin] = useState("");
  const [searchTerm, setSearchTerm] = useState();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [favorite, setFavorite] = useState([]);
  const [isModalOn, setIsModalOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const changeTheme = () => {
    setTheme(!theme);
  };

  const changeHeaderMargin = () => {
    setHeaderMargin(!headerMargin);
  };

  const editSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const dynamicSearch = () => {
    let gameList = [];
    gameList.concat(pcc, psnn, xboxx);
    return gameList.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const addCart = (id) => {
    const check = cart.every((item) => {
      return item._id !== id;
    });
    if (check) {
      const data_pc = pcc.filter((pc) => {
        return pc._id === id;
      });
      const data_psn = psnn.filter((psn) => {
        return psn._id === id;
      });
      const data_xbox = xboxx.filter((xbox) => {
        return xbox._id === id;
      });
      setCart([...cart, ...data_pc, ...data_psn, ...data_xbox]);
    } else {
      alert("The game has been added to cart.");
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const reduction = (id) => {
    let counter = 0;
    cart.forEach((item) => {
      if (item._id === id) {
        if (item.count !== 0) {
          item.count--;
          counter++;
        } else {
          setErrorMessage("Naručili ste maksimalan broj knjiga");
          setIsModalOn(true);
        }
      }
    });
    setCart(cart);
  };

  // const increase = (id) => {
  //   cart.forEach((item) => {
  //     if (item._id === id) {
  //       if(item.)
  //       item.count += 1;
  //     }
  //   });
  //   setCart(cart);
  //   getTotal();
  // };

  const removeProduct = (id) => {
    setErrorMessage("Da li želite izbrisati ovu knjigu");
    setIsModalOn(true);
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setIsModalOn(false);
  };

  // const getTotal = () => {
  //   const res = cart.reduce((prev, item) => {
  //     return prev + item.price * item.count;
  //   }, 0);
  //   setTotal(res);
  // };

  useEffect(() => {
    localStorage.setItem("dataCart", JSON.stringify(cart));
    localStorage.setItem("dataTotal", JSON.stringify(total));
  }, []);
  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      setCart(dataCart);
    }
    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      setTotal(dataTotal);
    }
  }, []);

  const addFavorite = (id) => {
    const check = favorite.every((item) => {
      return item._id !== id;
    });
    let allItems = [];
    allItems = allItems.concat(pcc);
    allItems = allItems.concat(psnn);
    allItems = allItems.concat(xboxx);
    if (check) {
      const newFavorite = allItems.find((item) => {
        return item._id === id;
      });
      setFavorite((prevUserFavorites) => {
        return [...prevUserFavorites, newFavorite];
      });
    } else {
      alert("The book has already been added to favorites.");
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
  };
  const removeFavorite = (id) => {
    if (
      window.confirm("Do you want to remove this book from your favorites?")
    ) {
      setFavorite((prevUserFavorites) => {
        return prevUserFavorites.filter((item) => item._id !== id);
      });
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
  };
  // useEffect(() => {
  //   setGames();
  // }, []);

  // const setGames = () => {
  //   let tempGamesPc = [];
  //   let tempGamesPsn = [];
  //   let tempGamesXbox = [];
  //   pcc.forEach((game) => {
  //     let pcGame = { ...game };
  //     pcGame.discount = pcGame.onsale
  //       ? Math.floor(100 - (pcGame.price / pcGame.onsale) * 100)
  //       : 0;
  //     tempGamesPc = [...tempGamesPc, pcGame];
  //   });
  //   psnn.forEach((game) => {
  //     let psnGame = { ...game };
  //     psnGame.discount = psnGame.onsale
  //       ? Math.floor(100 - (psnGame.price / psnGame.onsale) * 100)
  //       : 0;
  //     tempGamesPsn = [...tempGamesPsn, psnGame];
  //   });
  //   xboxx.forEach((game) => {
  //     let xboxGame = { ...game };
  //     xboxGame.discount = xboxGame.onsale
  //       ? Math.floor(100 - (xboxGame.price / xboxGame.onsale) * 100)
  //       : 0;
  //     tempGamesXbox = [...tempGamesXbox, xboxGame];
  //   });
  //   setPcc(tempGamesPc);
  //   setPsn(tempGamesPsn);
  //   setXbox(tempGamesXbox);
  // };
  const context = {
    pcc: pcc,
    psn: psnn,
    xbox: xboxx,
    cart: cart,
    theme: theme,
    headerMargin: headerMargin,
    favorite: favorite,
    total: total,
    changeHeaderMargin: changeHeaderMargin,
    addCart: addCart,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    editSearchTerm: editSearchTerm,
    changeTheme: changeTheme,
    dynamicSearch: dynamicSearch,
    reduction: reduction,
    isModalOn: isModalOn,
    setIsModalOn: setIsModalOn,
    removeProduct: removeProduct,
    errorMessage: errorMessage,
  };
  return (
    <DataContext.Provider value={context}>
      {props.children}
    </DataContext.Provider>
  );
};
const ProductConsumer = DataContext.Consumer;

export { DataProvider, ProductConsumer, DataContext };
