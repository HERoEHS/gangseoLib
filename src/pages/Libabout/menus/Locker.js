import React from "react";
import MenusScrollFrame from "../../../components/MenusScrollFrame";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import LockerData from "../datas/Locker/LockerData";
import Title from "../../../components/Layout/Title";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

function Locker() {
  const title = "사물함 안내";

  return (
    <SubBackWrap>
      <WrappedSubTopMenu />
      <Title>{title}</Title>
      <MenusScrollFrame children={<LockerData />} />
    </SubBackWrap>
  );
}

export default Locker;
