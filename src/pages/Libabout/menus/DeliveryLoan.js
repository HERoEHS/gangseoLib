import React from "react";
import MenusScrollFrame from "../../../components/MenusScrollFrame";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import DeliveryLoanData from "../datas/DeliveryLoan/DeliveryLoanData";
import Title from "../../../components/Layout/Title";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

function DeliveryLoan() {
  const title = "택배대출 안내";

  return (
    <SubBackWrap>
      <WrappedSubTopMenu />
      <Title>{title}</Title>
      <MenusScrollFrame children={<DeliveryLoanData />} />
    </SubBackWrap>
  );
}

export default DeliveryLoan;
