import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/AddGame.css";
import { DataContext } from "../Context";
import { MainTitle } from "../MainTitle";

class AddGame extends Component {
  static contextType = DataContext;

  render() {
    const { theme } = this.context;

    return (
      <div>
        <MainTitle title="Add game" provider={theme} />
        <div className={theme ? "theme-add" : "add"}>
          <Link to="/">
            +<p>ADD IMAGE</p>
          </Link>
          <div className="add-title">
            <div className="add-game-name">
              <input type="text" placeholder="Add game name..." />
            </div>
            <div className="add-content">
              <textarea
                name="text"
                placeholder="Add game content..."
              ></textarea>
            </div>
          </div>
          <div className="add-right">
            <div className="price">
              <label type="number">
                Price (EUR):
                <br />
                <input type="number" />
              </label>
            </div>
            <div className="old-price">
              <label type="number">
                Old price (EUR):
                <br />
                <input type="number" />
              </label>
            </div>
            <div className="console-new">
              <div className="device">
                <label type="radio" name="devicee">
                  Console:
                  <br />
                  <input type="radio" name="devicee" />
                  PC
                  <br />
                  <input type="radio" name="devicee" />
                  PSN
                  <br />
                  <input type="radio" name="devicee" />
                  XBOX
                </label>
              </div>
              <div className="new">
                <label type="radio" name="newgame">
                  New:
                  <br />
                  <input type="radio" name="newgame" />
                  Yes
                  <br />
                  <input type="radio" name="newgame" />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={theme ? "theme-add-button" : "add-button"}>
          <button className="btn" type="submit" form="form1" value="Submit">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default AddGame;
