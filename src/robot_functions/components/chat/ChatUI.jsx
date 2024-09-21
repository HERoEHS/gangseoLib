import React, { useState, useEffect } from 'react';

function MessageHeader({ id, label, opacity = "1.0", marginLeft = "25px", marginRight = "25px" }) {
    return (
        <p id={id} style={{ opacity, marginLeft, marginRight }}>{label}</p>
    );
}

function CustomSVG({ type }) {
    if (type === "first") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="16" viewBox="0 0 53 16" fill="none">
                <rect width="45" height="3" transform="matrix(-1 0 0 1 52.1728 7)" fill="#B5B5B5" />
                <circle cx="8" cy="8" r="8" transform="matrix(-1 0 0 1 16.8272 0)" fill="#B5B5B5" />
            </svg>
        );
    }

    if (type === "second") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="16" viewBox="0 0 52 16" fill="none">
                <rect y="7" width="45" height="3" fill="#B5B5B5" />
                <circle cx="43.3456" cy="8" r="8" fill="#B5B5B5" />
            </svg>
        );
    }

    return null; // 또는 기본 SVG나 다른 요소를 반환
}

function ChatBalloonContent({ text, align = "left", color = "#313131", marginLeft = "0px", marginRight = "0px", status, isComplete, isStream }) {
    const textColor = isStream ? '#808080' : (isComplete ? color : '#808080');

    let baloonStyle = {
        textAlign: align,
        color: textColor,
        marginLeft: align === "left" ? "0px" : marginLeft,
        marginRight: align === "right" ? "0px" : marginRight,
        transition: 'color 0.3s ease'
    };

    if (text === "") {
        return (
            <div className="chatbaloon" style={baloonStyle}>
                <div className="dot-flashing"></div>
            </div>
        )
    } else {
        return (
            <div className="chatbaloon" style={baloonStyle}>
                <span style={{ color: textColor }}>{text}</span>
            </div>
        )
    }
}

function ChatBalloon({ message, opacity }) {
    const isSTT = message.topic === '/heroehs/aimy/dialogue/stt/stream' || message.topic === '/heroehs/aimy/dialogue/stt';
    const isStream = message.topic === '/heroehs/aimy/dialogue/stt/stream';

    const MessageStyle = {
        display: 'flex',
        justifyContent: isSTT ? 'flex-end' : 'flex-start',
        opacity: opacity,
        transition: 'opacity 0.3s ease'
    };
    let margin_pixel = "1.5vw"

    const marginLeft = isSTT ? margin_pixel : "0px";
    const marginRight = isSTT ? "0px" : margin_pixel;

    const ChatBaloonAlign = isSTT ? 'right' : 'left';
    const ChatBaloonColor = isSTT ? '#713300' : '#224E0F';  // 색상을 서로 바꿨습니다

    return (
        <div className="Message" style={MessageStyle}>
            {!isSTT ? (
                <>
                    <MessageHeader id="gemini" label="에이미" opacity={opacity} marginLeft={marginRight} />
                    <CustomSVG type="first" />
                    <ChatBalloonContent
                        text={message.data}
                        align={ChatBaloonAlign}
                        color={ChatBaloonColor}
                        status={message.status}
                        isComplete={message.isComplete}
                        isStream={isStream}
                    />
                </>
            ) : (
                <>
                    <ChatBalloonContent
                        text={message.data}
                        align={ChatBaloonAlign}
                        color={ChatBaloonColor}
                        status={message.status}
                        isComplete={message.isComplete}
                        isStream={isStream}
                    />
                    <CustomSVG type="second" />
                    <MessageHeader id="user" label="사용자" opacity={opacity} marginRight={marginLeft} />
                </>
            )}
        </div>
    );
}

function InitialMessage({ isVisible }) {
    const style = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: isVisible ? 1 : -1,
    };

    return (
        <div className="initial-message" style={style}>
            <p>어떠한 질문이든 물어보세요.</p>
        </div>
    );
}


function ChatBalloonList({ messages }) {
    const [showInitialMessage, setShowInitialMessage] = useState(true);

    useEffect(() => {
        if (messages.length > 0) {
            setShowInitialMessage(false);
        }
    }, [messages]);

    return (
        <>
            <InitialMessage isVisible={showInitialMessage} />
            {messages.map((message, index) => (
                <ChatBalloon
                    key={index}
                    message={message}
                />
            ))}
        </>
    );
}

export default function ChatUI({ messages }) {
    return (
        <div className="chat-ui">
            <ChatBalloonList messages={messages} />
        </div>
    );
}
