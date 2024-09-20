import SocketManager from '../server/SocketManager';

function publishCommon(topic, type, message) {
    const socketManager = SocketManager.getInstance();
    const currentSocket = socketManager.getSocket();

    if (currentSocket) {
        currentSocket.emit('publish_ros', {
            topic: topic,
            type: type,
            message: message
        });

        // console.log(`Message published to topic ${topic}:`, message);
        return true;
    } else {
        console.error('Socket not connected');
        return false;
    }
}

export { publishCommon };
