import React from "react";
import MenusScrollFrame from "../../../components/MenusScrollFrame";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import PrintingData from "../datas/Printing/PrintingData";
import Title from "../../../components/Layout/Title";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

function Printing() {
  return (
    <SubBackWrap>
      <WrappedSubTopMenu />
      <Title>복사, 인쇄, 출력, 스캔</Title>
      <MenusScrollFrame children={<PrintingData />} />
    </SubBackWrap>
  );
}

export default Printing;
