import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { SubBackWrap } from "../../components/Layout/BackWrap";
import Title from "../../components/Layout/Title";
import MenusScrollFrame from "../../components/MenusScrollFrame";
import ChatbotData from "./data/ChatbotData";
import { WrappedDepthTopMenu } from '../../robot_functions/components/WrapTopMenu';
import { REQUEST_TYPES, publishAimyRequest } from '../../robot_functions/ros/PublishAimyRequest';
import { useRosData } from '../../robot_functions/hooks/useRosData';

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
    const [activeButton, setActiveButton] = useState(null);
    const messagesEndRef = useRef(null);
    const rosData = useRosData(['/heroehs/aimy/dialogue/nav_button']);

    const memoizedRosData = useMemo(() => rosData, [JSON.stringify(rosData)]);

    useEffect(() => {
        if (memoizedRosData['/heroehs/aimy/dialogue/nav_button']) {
            const navButtonValue = memoizedRosData['/heroehs/aimy/dialogue/nav_button'].data;
            if (navButtonValue >= 1 && navButtonValue <= 4) {
                setActiveButton(navButtonValue);
            } else {
                setActiveButton(null);
            }
        }
    }, [memoizedRosData]);

    const getButtonStyle = useCallback((buttonNumber) => ({
        ...buttonStyle,
        opacity: activeButton === buttonNumber ? 1 : 0,
        pointerEvents: activeButton === buttonNumber ? 'auto' : 'none',
    }), [activeButton]);

    const handleButtonClick = useCallback((config) => {
        publishAimyRequest(config);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, []);

    return (
        <SubBackWrap>
            <WrappedDepthTopMenu
                stopModes={[2, 4]}
                navigateTo="/"
            />
            <div style={buttonContainerStyle}>
                {[
                    { id: 1, text: '대기 장소', waypoint: 1 },
                    { id: 2, text: '열람실', waypoint: 2 },
                    { id: 3, text: '화장실', waypoint: 3 },
                    { id: 4, text: '충전소', waypoint: 4 },
                ].map(button => (
                    <button
                        key={button.id}
                        style={getButtonStyle(button.id)}
                        onClick={() => handleButtonClick({
                            requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.WAYPOINT, REQUEST_TYPES.STOP],
                            presetAudio: 100 + button.id,
                            setWaypoints: [button.waypoint],
                            setStop: [4],
                        })}
                    >
                        {button.text}
                    </button>
                ))}
            </div>

            <Title>
                Hi,
                <span style={{ fontSize: 72, fontWeight: "bolder", color: "#EE2B74" }}>
                    &nbsp;에이미!
                </span>
            </Title>
            <MenusScrollFrame>
                <ChatbotData rosData={rosData} />
            </MenusScrollFrame>
            <div ref={messagesEndRef} />
        </SubBackWrap>
    );
}

export default Chatbot;
