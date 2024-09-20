import React from "react";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import { DepthTopMenu } from "../../components/Layout/TopMenu";
import Title from "../../components/Layout/Title";
import MenusScrollFrame from "../../components/MenusScrollFrame";
import ChatbotData from "./data/ChatbotData";
import { WrappedDepthTopMenu } from '../../robot_functions/components/WrapTopMenu';

function Chatbot() {
  return (
    <SubBackWrap>
      <WrappedDepthTopMenu stopModes={[2, 4]}/>
      <Title>
        Hi,
        <span style={{ fontSize: 72, fontWeight: "bolder", color: "#EE2B74" }}>
          &nbsp;에이미!
        </span>
      </Title>
      <MenusScrollFrame children={<ChatbotData />} />
    </SubBackWrap>
  );
}

export default Chatbot;
