const rclnodejs = require('rclnodejs');

let rosNode;
const publishers = {};
const rosData = {};

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
    { name: '/heroehs/aimy/vision/person', type: 'std_msgs/msg/Bool' },
    { name: '/heroehs/aimy/chest_display', type: 'std_msgs/msg/Int32' },
  ];

  topics.forEach(topic => {
    rosNode.createSubscription(topic.type, topic.name, (msg) => {
      const updatedTopic = {
        topic: topic.name,
        data: msg.data,
        timestamp: Date.now()
      };
      rosData[topic.name] = updatedTopic;
      io.emit('ros_data_update', updatedTopic);
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
