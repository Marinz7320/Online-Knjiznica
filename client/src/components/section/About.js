import React, { Component } from "react";
import { DataContext } from "../Context";
import Marin from "../img/marin.jpg";
import Hrvoje from "../img/hrvoje.jpg";
import "../css/About.css";
import { MainTitle } from "../MainTitle";

class About extends Component {
  static contextType = DataContext;

  render() {
    const { theme } = this.context;

    return (
      <div>
        <MainTitle title="About us" provider={theme} />
        <div className={theme ? "theme-about" : "about"}>
          <div className={theme ? "theme-marin" : "marin"}>
            <img src={Marin} alt="" width="200px" />
            <p>
              Zovem se Marin Zovko, imam 22 godine. Student sam pete godine
              računarstva na Fakultetu Strojarstva Računarstva i Elektrotehnike.
              Do sada sam stekao iskustva u programiranju u programskim jezicima
              kao što C, C++, C#, Java, Pyhton, Javascript te njenim poznatim
              frameworcima. Nadam da se da će mi dosadašnje stečeno znanje u
              programiranju pomoći u kreiranju ovog projekta.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
