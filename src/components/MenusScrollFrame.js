import React, { useState } from "react";
import "../assets/css/sass/menusScrollFrame.scss";
import CntWrap from "./TextBoxs/CntWrap";
import Title from "./Layout/Title";

function MenusScrollFrame({ children }) {
  return (
    <div className="menusScroll frame background">
      <div>
        <div className="scrollFrame">
          <CntWrap>
            <div className="frameInner">
              <div className="InnerContent">{children}</div>
            </div>
          </CntWrap>
        </div>
      </div>
    </div>
  );
}

export default MenusScrollFrame;
