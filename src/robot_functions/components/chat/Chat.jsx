import React, { useEffect, useState, useRef } from 'react';
import ChatUI from './ChatUI';
import { useChatLogic } from './ChatLogic';
import { getSocket, getRosData } from '../../ros/rosStore';
import "./Chat.css";
import "./style.scss";

export function Chat() {
    const [socket, setSocket] = useState(null);
    const [rosData, setRosData] = useState({});
    const { messages, handleRosDataUpdate } = useChatLogic();
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    useEffect(() => {
        const currentSocket = getSocket();
        setSocket(currentSocket);

        if (currentSocket) {
            currentSocket.on('ros_data_update', (data) => {
                handleRosDataUpdate(data);
                console.log('Received ROS data:', data);
            });
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

    // New useEffect for handling resize and mutation events
    useEffect(() => {
        const resizeObserver = new ResizeObserver(scrollToBottom);
        const mutationObserver = new MutationObserver(scrollToBottom);

        if (chatContainerRef.current) {
            resizeObserver.observe(chatContainerRef.current);
            mutationObserver.observe(chatContainerRef.current, { childList: true, subtree: true });
        }

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return (
        <div className="Chat">
            <div className="chat-container" ref={chatContainerRef}>
                <ChatUI messages={messages} />
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default Chat;
