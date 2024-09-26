import React from "react";
import TopMenuIcon from "../Icons/TopMenuIcon";

function DepthTopMenu() {
  return (
    <div className="TopMenuWrap">
      <div className="TopMenuHome">
        <TopMenuIcon iconName="iconHome" />
      </div>
    </div>
  );
}

function SubTopMenu({ onHomeClick, onBackClick }) {
  return (
    <div className="TopMenuWrap">
      <div className="TopMenuHome" onClick={onHomeClick}>
        <TopMenuIcon iconName="iconHome" />
      </div>
      <div className="TopMenu" onClick={onBackClick}>
        <TopMenuIcon iconName="iconMenu" />
      </div>
    </div>
  );
}

export { DepthTopMenu, SubTopMenu };
