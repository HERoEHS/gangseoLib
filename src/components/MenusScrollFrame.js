import React from "react";
import "../assets/css/sass/menusScrollFrame.scss";
import CntWrap from "./TextBoxs/CntWrap";

function MenusScrollFrame({ children }) {
  return (
    <div className="menusScroll frame background">
      <div className="scrollFrame">
        <CntWrap>{children}</CntWrap>
      </div>
    </div>
  );
}

export default MenusScrollFrame;
