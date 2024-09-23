import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SubBackWrap } from "../../components/Layout/BackWrap";
import Title from "../../components/Layout/Title";
import MenusScrollFrame from "../../components/MenusScrollFrame";
import ChatbotData from "./data/ChatbotData";
import { WrappedDepthTopMenu } from '../../robot_functions/components/WrapTopMenu';
import { REQUEST_TYPES, publishAimyRequest } from '../../robot_functions/ros/PublishAimyRequest';
import { getSocket, getRosData } from '../../robot_functions/ros/rosStore';
import { useChatLogic } from '../../robot_functions/components/chat/ChatLogic';

const handleClick = (config) => {
    publishAimyRequest(config);
};

const buttonWidth = '13vw';
const buttonHeight = '10vh';

const buttonContainerStyle = {
    position: 'fixed',
    top: '10px',
    left: '25vw',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1000,
    width: '60vw',
};

const buttonStyle = {
    width: buttonWidth,
    height: buttonHeight,
    padding: '0',
    margin: '0 10px',
    fontSize: '1.7em',
    backgroundColor: '#EE2B74',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.03,
    transition: 'opacity 0.3s ease',
};

function Chatbot() {
    const [socket, setSocket] = useState(null);
    const [rosData, setRosData] = useState({});
    const { messages, handleRosDataUpdate: chatLogicUpdate } = useChatLogic();
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [activeButton, setActiveButton] = useState(null);

    const [buttonStates, setButtonStates] = useState({
        waitingArea: false,
        readingRoom: false,
        restroom: false,
        chargingStation: false
    });

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    const handleRosDataUpdate = useCallback((data) => {
        // 토픽이 '/heroehs/aimy/dialogue/nav_button'인 경우에만 처리

        if (data.topic === '/heroehs/aimy/dialogue/nav_button') {
            console.log('data:', data);

            const navButtonValue = data.data;

            if (navButtonValue >= 1 && navButtonValue <= 4) {
                setActiveButton(navButtonValue);
            } else {
                setActiveButton(null);
            }
        }

        chatLogicUpdate(data);
        console.log('Received ROS data:', data);
    }, [chatLogicUpdate]);

    useEffect(() => {
        const currentSocket = getSocket();
        setSocket(currentSocket);

        if (currentSocket) {
            currentSocket.on('ros_data_update', handleRosDataUpdate);
        }

        return () => {
            if (currentSocket) {
                currentSocket.off('ros_data_update');
            }
        };
    }, [handleRosDataUpdate]);

    useEffect(() => {
        const currentRosData = getRosData();
        setRosData(currentRosData);

        if (Object.keys(currentRosData).length > 0) {
            handleRosDataUpdate(currentRosData);
        }
    }, [handleRosDataUpdate]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getButtonStyle = (buttonNumber) => ({
        ...buttonStyle,
        opacity: activeButton === buttonNumber ? 1 : 0,
        pointerEvents: activeButton === buttonNumber ? 'auto' : 'none',
    });

    return (
        <SubBackWrap>
            <WrappedDepthTopMenu stopModes={[2, 4]}/>
            <div style={buttonContainerStyle}>
                <button style={getButtonStyle(1)}
                    onClick={() => handleClick({
                        requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP],
                        presetAudio: 101,
                        setWaypoints: [1],
                        setStop: [4],
                    })}>
                    대기 장소
                </button>
                <button style={getButtonStyle(2)}
                    onClick={() => handleClick({
                        requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP],
                        presetAudio: 102,
                        setWaypoints: [2],
                        setStop: [4],
                    })}>
                    열람실
                </button>
                <button style={getButtonStyle(3)}
                    onClick={() => handleClick({
                        requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP],
                        presetAudio: 103,
                        setWaypoints: [3],
                        setStop: [4],
                    })}>
                    화장실
                </button>
                <button style={getButtonStyle(4)}
                    onClick={() => handleClick({
                        requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP],
                        presetAudio: 104,
                        setWaypoints: [4],
                        setStop: [4],
                    })}>
                    충전소
                </button>
            </div>

            <Title>
                Hi,
                <span style={{ fontSize: 72, fontWeight: "bolder", color: "#EE2B74" }}>
                    &nbsp;에이미!
                </span>
            </Title>
            <MenusScrollFrame children={<ChatbotData />} />
            <div ref={messagesEndRef} />
        </SubBackWrap>
    );
}

export default Chatbot;
