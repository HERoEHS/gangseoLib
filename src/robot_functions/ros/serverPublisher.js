const rclnodejs = require('rclnodejs');
const { getPublisher } = require('./rosNode');

function createMessage(type, message) {
    const msg = rclnodejs.createMessageObject(type);
    // console.log(msg);
    switch (type) {
        case 'aimy_msgs/msg/AimyDefaultRequest':
            msg.request_id = message.request_id;
            msg.request_type = message.request_type;
            msg.stop = message.stop || [];
            msg.preset_motion = message.preset_motion || 0;
            msg.preset_audio = message.preset_audio || 0;
            msg.set_waypoints = message.set_waypoints || [];
            msg.set_mode = message.set_mode || 0;
            msg.tts_text = message.tts_text || '';
            break;
        case 'std_msgs/msg/String':
            msg.data = message.data || '';
            break;
        case 'std_msgs/msg/Bool':
            msg.data = message.data || false;
            break;
        case 'std_msgs/msg/Int32':
            msg.data = message.data || 0;
            break;
        // Add more cases here for other message types
        default:
            throw new Error(`Unsupported message type: ${type}`);
    }

    return msg;
}

function publishMessage(topic, type, message) {
    try {
        const publisher = getPublisher(topic, type);
        const msg = createMessage(type, message);

        publisher.publish(msg);
        // console.log(`Message published to topic ${topic}:`, msg);
    } catch (error) {
        console.error(`Error publishing message to ${topic}:`, error);
    }
}

module.exports = { publishMessage };
