const rclnodejs = require('rclnodejs');

let rosNode;
const publishers = {};
const rosData = {
  '/heroehs/aimy/commander/status': null,
  '/heroehs/aimy/dialogue/stt': null,
  '/heroehs/aimy/dialogue/stt/stream': null,
  '/heroehs/aimy/dialogue/llm': null,
  '/heroehs/aimy/manage/ebook': null,
  '/heroehs/aimy/dialogue/nav_button': null,
  '/heroehs/aimy/web/top_menu': null
};

// Initialize the ROS Node
async function initRosNode() {
  if (!rosNode) {
    await rclnodejs.init();
    rosNode = rclnodejs.createNode('web_interface_node');
    rclnodejs.spin(rosNode);
    console.log('ROS Node initialized');
  }
}

// Set up ROS Subscribers
async function setupRosSubscribers(io) {
  await initRosNode();

  const topics = [
    { name: '/heroehs/aimy/commander/status', type: 'std_msgs/msg/String' },
    { name: '/heroehs/aimy/dialogue/stt', type: 'std_msgs/msg/String' },
    { name: '/heroehs/aimy/dialogue/stt/stream', type: 'std_msgs/msg/String' },
    { name: '/heroehs/aimy/dialogue/llm', type: 'std_msgs/msg/String' },
    { name: '/heroehs/aimy/manage/ebook', type: 'std_msgs/msg/String' },
    { name: '/heroehs/aimy/dialogue/nav_button', type: 'std_msgs/msg/Int32' },
    { name: '/heroehs/aimy/web/top_menu', type: 'std_msgs/msg/Int32' },
  ];

  topics.forEach(topic => {
    rosNode.createSubscription(topic.type, topic.name, (msg) => {
      const updatedTopic = {
        data: msg.data,
        timestamp: Date.now()
      };
      rosData[topic.name] = updatedTopic;
      io.emit('ros_data_update', { topic: topic.name, data: updatedTopic });
      console.log('Subscribed:', topic.name, msg.data);
    });
  });
}

// Get or Create a ROS Publisher
function getPublisher(topic, type) {
  if (!publishers[topic]) {
    publishers[topic] = rosNode.createPublisher(type, topic);
  }
  return publishers[topic];
}

module.exports = {
  initRosNode,
  setupRosSubscribers,
  getPublisher,
};
