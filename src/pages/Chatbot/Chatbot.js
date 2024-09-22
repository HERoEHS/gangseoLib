import React from "react";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import Title from "../../components/Layout/Title";
import MenusScrollFrame from "../../components/MenusScrollFrame";
import ChatbotData from "./data/ChatbotData";
import { WrappedDepthTopMenu } from '../../robot_functions/components/WrapTopMenu';
import { REQUEST_TYPES, publishAimyRequest } from '../../robot_functions/ros/PublishAimyRequest';

const handleClick = (config) => {
    publishAimyRequest(config);
};

// 버튼 크기 설정
const buttonWidth = '13vw';  // 버튼 너비
const buttonHeight = '10vh';  // 버튼 높이

// 스타일 객체 수정
const buttonContainerStyle = {
  position: 'fixed',
  top: '10px',
  left: '25vw',
  right: '0',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1000,
  width : '60vw',
};

const buttonStyle = {
  width: buttonWidth,
  height: buttonHeight,
  padding: '0',  // 패딩을 제거하고 너비와 높이로 크기 조절
  margin: '0 10px',
  fontSize: '1.7em',
  backgroundColor: '#EE2B74',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  display: 'flex',  // 텍스트를 중앙에 배치하기 위해 추가
  justifyContent: 'center',
  alignItems: 'center',
};

function Chatbot() {
  return (
    <SubBackWrap>
      <WrappedDepthTopMenu stopModes={[2, 4]}/>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle}
            onClick={() => handleClick({
                requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP,],
                presetAudio : 101,
                setWaypoints: [1],
                setStop: [4],
            })}>
            대기 장소</button>
        <button style={buttonStyle}
            onClick={() => handleClick({
                requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP,],
                presetAudio : 102,
                setWaypoints: [2],
                setStop: [4],
            })}>
            열람실</button>
        <button style={buttonStyle}
            onClick={() => handleClick({
                requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP,],
                presetAudio : 103,
                setWaypoints: [3],
                setStop: [4],
            })}>
            화장실</button>
        <button style={buttonStyle}
            onClick={() => handleClick({
                requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP,],
                presetAudio : 104,
                setWaypoints: [4],
                setStop: [4],
            })}>
            충전소</button>
      </div>

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
