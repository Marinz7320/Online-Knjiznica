import React from "react";
import Name from "./Name";

function NamesContainer(props) {
  return (
    <div>
      {props.games.map((game) => (
        <Name gameName={game.title} />
      ))}
    </div>
  );
}

export default NamesContainer;
