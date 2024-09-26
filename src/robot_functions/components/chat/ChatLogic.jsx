import React, { useReducer, useCallback } from 'react';

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
    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    const handleSttUpdate = useCallback((topic, data) => {
        if (data === '<NONE>') return;
        if (topic === '/heroehs/aimy/dialogue/stt/stream') {
            if (data === '<BOS>') {
                dispatch({ type: 'START_STT' });
            } else if (data === '<EOS>') {
                dispatch({ type: 'COMPLETE_STT_STREAM' });
            } else {
                dispatch({ type: 'UPDATE_STT_STREAM', payload: { data } });
            }
        } else if (topic === '/heroehs/aimy/dialogue/stt') {
            dispatch({ type: 'COMPLETE_STT', payload: { data } });
        }
    }, []);

    const handleLlmUpdate = useCallback((data) => {
        if (data === '<NONE>') return;
        if (data === '<BOS>') {
            dispatch({ type: 'START_LLM' });
        } else if (data === '<EOS>') {
            dispatch({ type: 'COMPLETE_LLM' });
        } else {
            dispatch({ type: 'UPDATE_LLM', payload: { data } });
        }
    }, []);

    const handleRosDataUpdate = useCallback((updatedData) => {
        const { topic, data } = updatedData;

        dispatch({
            type: 'UPDATE_LAST_DATA',
            payload: { topic, timestamp: Date.now() }
        });

        if (topic === '/heroehs/aimy/dialogue/stt/stream' || topic === '/heroehs/aimy/dialogue/stt') {
            handleSttUpdate(topic, data);
        } else if (topic === '/heroehs/aimy/dialogue/llm') {
            handleLlmUpdate(data);
        }
    }, [handleSttUpdate, handleLlmUpdate]);

    const getAllMessages = useCallback(() => {
        const completedMessages = chatState.messages;
        const currentStt = chatState.sttState.currentMessage;
        const currentLlm = chatState.llmState.currentMessage;

        return [
            ...completedMessages,
            ...(currentStt ? [currentStt] : []),
            ...(currentLlm ? [currentLlm] : [])
        ];
    }, [chatState]);

    return {
        messages: getAllMessages(),
        handleRosDataUpdate
    };
}
