import SocketManager from '../server/SocketManager';

const REQUEST_TYPES = {
    STOP: 0,
    MOTION: 1,
    AUDIO: 2,
    WAYPOINT: 3,
    MODE: 4
};

function generateRequestId(customId) {
    if (customId) {
        return customId;
    }
    return Math.random().toString(36).substring(7);
}

function publishAimyRequest(config) {
    const socketManager = SocketManager.getInstance();
    const currentSocket = socketManager.getSocket();

    if (currentSocket) {
        const requestId = generateRequestId(config.customRequestId);
        const message = {
            request_id: requestId,
            request_type: config.requestTypes || [],
            stop: config.setStop || [],
            preset_motion: config.presetMotion || 0,
            preset_audio: config.presetAudio || 0,
            set_waypoints: config.setWaypoints || [],
            set_mode: config.setMode || 0,
            tts_text: config.ttsText || ''
        };

        currentSocket.emit('publish_ros', {
            topic: '/heroehs/aimy/request',
            type: 'aimy_msgs/msg/AimyDefaultRequest',
            message: message
        });

        // console.log(`AimyDefaultRequest published with request_id: ${requestId}`, message);
        return requestId;
    } else {
        console.error('Socket not connected');
        return null;
    }
}

export { REQUEST_TYPES, publishAimyRequest };
