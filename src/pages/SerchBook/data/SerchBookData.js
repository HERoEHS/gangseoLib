import React from "react";
import "../../../assets/css/sass/serchBookData.scss";
import serchIcon from "../../../assets/icons/tabler_search.svg";
import InputData from "./InputData";

function SerchBookData() {
  return (
    <div className="serchBookLayout">
      <div className="serchContainer">
        <InputData />
      </div>
    </div>
  );
}

export default SerchBookData;
