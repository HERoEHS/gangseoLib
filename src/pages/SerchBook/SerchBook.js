import React from "react";
import SerchBookData from "./data/SerchBookData";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import { DepthTopMenu } from "../../components/Layout/TopMenu";
import Title from "../../components/Layout/Title";
import MenusScrollFrame from "../../components/MenusScrollFrame";
import EbookFrame from "../../components/Ebook/EbookFrame";

function SerchBook() {
  return (
    <SubBackWrap>
      <DepthTopMenu />
      <Title>자료검색</Title>
      <EbookFrame children={<SerchBookData />} />
      {/* <SerchBookData /> */}
    </SubBackWrap>
  );
}

export default SerchBook;
