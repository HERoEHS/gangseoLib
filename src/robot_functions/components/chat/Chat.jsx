import React, { useEffect, useRef, useState } from 'react';
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

    const [sttStreamData, setSttStreamData] = useState(null);
    const [sttData, setSttData] = useState(null);
    const [llmData, setLlmData] = useState(null);

    useEffect(() => {
        if (rosData['/heroehs/aimy/dialogue/stt/stream']) {
            setSttStreamData(rosData['/heroehs/aimy/dialogue/stt/stream'].data);
            console.log('SttStream Data:', rosData['/heroehs/aimy/dialogue/stt/stream'].data); // 콘솔에 출력
        }
    }, [rosData['/heroehs/aimy/dialogue/stt/stream']]);

    useEffect(() => {
        if (rosData['/heroehs/aimy/dialogue/stt']) {
            setSttData(rosData['/heroehs/aimy/dialogue/stt'].data);
            console.log('Stt Data:', rosData['/heroehs/aimy/dialogue/stt'].data); // 콘솔에 출력
        }
    }, [rosData['/heroehs/aimy/dialogue/stt']]);

    useEffect(() => {
        if (rosData['/heroehs/aimy/dialogue/llm']) {
            setLlmData(rosData['/heroehs/aimy/dialogue/llm'].data);
            console.log('Llm Data:', rosData['/heroehs/aimy/dialogue/llm'].data); // 콘솔에 출력
        }
    }, [rosData['/heroehs/aimy/dialogue/llm']]);

    useEffect(() => {
        if (sttStreamData !== null) {
            handleRosDataUpdate({ topic: '/heroehs/aimy/dialogue/stt/stream', data: sttStreamData });
        }
    }, [sttStreamData, handleRosDataUpdate]);

    useEffect(() => {
        if (sttData !== null) {
            handleRosDataUpdate({ topic: '/heroehs/aimy/dialogue/stt', data: sttData });
        }
    }, [sttData, handleRosDataUpdate]);

    useEffect(() => {
        if (llmData !== null) {
            handleRosDataUpdate({ topic: '/heroehs/aimy/dialogue/llm', data: llmData });
        }
    }, [llmData, handleRosDataUpdate]);

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
