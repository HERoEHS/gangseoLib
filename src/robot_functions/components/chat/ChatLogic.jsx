import React from 'react';

const initialState = {
    messages: [],
    sttState: {
        currentMessage: null,
        isActive: false,
        streamData: ''
    },
    llmState: {
        currentMessage: null,
        isActive: false
    },
    lastUpdate: {}
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case 'START_STT':
            return {
                ...state,
                sttState: {
                    currentMessage: { data: '', topic: '/heroehs/aimy/dialogue/stt/stream', isComplete: false, shouldChangeColor: false },
                    isActive: true,
                    streamData: ''
                }
            };
        case 'UPDATE_STT_STREAM':
            if (!state.sttState.isActive || action.payload.data === '<NONE>') return state;
            return {
                ...state,
                sttState: {
                    ...state.sttState,
                    currentMessage: {
                        ...state.sttState.currentMessage,
                        data: action.payload.data
                    },
                    streamData: state.sttState.streamData + action.payload.data
                }
            };
        case 'COMPLETE_STT_STREAM':
            if (!state.sttState.isActive) return state;
            return {
                ...state,
                sttState: {
                    ...state.sttState,
                    currentMessage: {
                        ...state.sttState.currentMessage,
                        isComplete: true,
                        shouldChangeColor: true,
                        data: state.sttState.streamData.replace('<EOS>', '')
                    },
                    isActive: false
                }
            };
        case 'COMPLETE_STT':
            if (action.payload.data === '<NONE>') return state;
            const completedSttMessage = {
                topic: '/heroehs/aimy/dialogue/stt',
                data: action.payload.data,
                isComplete: true,
                shouldChangeColor: true
            };
            return {
                ...state,
                messages: [...state.messages, completedSttMessage],
                sttState: {
                    currentMessage: null,
                    isActive: false,
                    streamData: ''
                }
            };
        case 'START_LLM':
            return {
                ...state,
                llmState: {
                    currentMessage: { data: '', topic: '/heroehs/aimy/conversation/llm', isComplete: false, shouldChangeColor: false },
                    isActive: true
                }
            };
        case 'UPDATE_LLM':
            if (!state.llmState.isActive || action.payload.data === '<NONE>') return state;
            return {
                ...state,
                llmState: {
                    ...state.llmState,
                    currentMessage: {
                        ...state.llmState.currentMessage,
                        data: state.llmState.currentMessage.data + action.payload.data
                    }
                }
            };
        case 'COMPLETE_LLM':
            if (!state.llmState.isActive) return state;
            const completedLlmMessage = {
                ...state.llmState.currentMessage,
                isComplete: true,
                shouldChangeColor: true,
                data: state.llmState.currentMessage.data.replace('<EOS>', '')
            };
            return {
                ...state,
                messages: [...state.messages, completedLlmMessage],
                llmState: {
                    currentMessage: null,
                    isActive: false
                }
            };
        case 'UPDATE_LAST_DATA':
            return {
                ...state,
                lastUpdate: { ...state.lastUpdate, [action.payload.topic]: action.payload.timestamp }
            };
        default:
            return state;
    }
};

export function useChatLogic() {
    const [chatState, dispatch] = React.useReducer(chatReducer, initialState);

    const handleSttUpdate = (topic, data) => {
        if (data === '<NONE>') return; // <NONE> 메시지 무시
        if (topic === '/heroehs/aimy/dialogue/stt/stream') {
            if (data === '<BOS>') {
                dispatch({ type: 'START_STT' });
            } else if (data === '<EOS>') {
                dispatch({ type: 'COMPLETE_STT_STREAM' });
            } else if (chatState.sttState.isActive && !chatState.sttState.currentMessage.isComplete) {
                dispatch({ type: 'UPDATE_STT_STREAM', payload: { data } });
            }
        } else if (topic === '/heroehs/aimy/dialogue/stt') {
            dispatch({ type: 'COMPLETE_STT', payload: { data } });
        }
    };

    const handleLlmUpdate = (data) => {
        if (data === '<NONE>') return; // <NONE> 메시지 무시
        if (data === '<BOS>') {
            dispatch({ type: 'START_LLM' });
        } else if (data === '<EOS>') {
            dispatch({ type: 'COMPLETE_LLM' });
        } else if (chatState.llmState.isActive && !chatState.llmState.currentMessage.isComplete) {
            dispatch({ type: 'UPDATE_LLM', payload: { data } });
        }
    };

    const handleRosDataUpdate = (updatedTopic) => {
        // console.log('Received ROS data update:', updatedTopic);
        const { topic, data, timestamp } = updatedTopic;

        dispatch({
            type: 'UPDATE_LAST_DATA',
            payload: { topic, timestamp }
        });

        if (topic === '/heroehs/aimy/dialogue/stt/stream' || topic === '/heroehs/aimy/dialogue/stt') {
            handleSttUpdate(topic, data);
            console.log('Received STT data:', data);
        } else if (topic === '/heroehs/aimy/dialogue/llm') {
            handleLlmUpdate(data);
        } else {
            // console.log('Received data for other topic:', topic, data);
        }
    };

    React.useEffect(() => {
        // console.log('Current chat state:', chatState);
    }, [chatState]);

    const getAllMessages = () => {
        const completedMessages = chatState.messages;
        const currentStt = chatState.sttState.currentMessage;
        const currentLlm = chatState.llmState.currentMessage;

        return [
            ...completedMessages,
            ...(currentStt ? [currentStt] : []),
            ...(currentLlm ? [currentLlm] : [])
        ];
    };

    return {
        messages: getAllMessages(),
        handleRosDataUpdate
    };
}
