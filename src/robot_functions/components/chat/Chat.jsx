import React, { useEffect, useRef } from 'react';
import ChatUI from './ChatUI';
import { useChatLogic } from './ChatLogic';
import { useRosData } from '../../hooks/useRosData';
import "./Chat.css";
import "./style.scss";

export function Chat() {
    const { messages, handleRosDataUpdate } = useChatLogic();
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);

    const rosData = useRosData([
        '/heroehs/aimy/dialogue/stt/stream',
        '/heroehs/aimy/dialogue/stt',
        '/heroehs/aimy/dialogue/llm'
    ]);

    useEffect(() => {
        Object.entries(rosData).forEach(([topic, data]) => {
            if (data && data.data !== undefined) {
                handleRosDataUpdate({ topic, data: data.data });
            }
        });
        console.log(rosData);
    }, [rosData, handleRosDataUpdate]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
