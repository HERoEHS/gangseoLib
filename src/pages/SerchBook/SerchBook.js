import React from "react";
import SerchBookData from "./data/SerchBookData";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import { DepthTopMenu } from "../../components/Layout/TopMenu";
import Title from "../../components/Layout/Title";
import MenusScrollFrame from "../../components/MenusScrollFrame";

function SerchBook() {
  return (
    <SubBackWrap>
      <DepthTopMenu />
      <Title>자료검색</Title>
      <MenusScrollFrame children={<SerchBookData />} />
    </SubBackWrap>
  );
}

export default SerchBook;
