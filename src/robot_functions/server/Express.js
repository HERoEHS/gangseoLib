const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { initRosNode, setupRosSubscribers } = require('../ros/rosNode');
const { publishMessage } = require('../ros/serverPublisher');

// .env 파일 경로 설정 및 로드
const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });

const HOST_IP = process.env.HOST_IP || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const CLIENT_ORIGIN = `http://${HOST_IP}:${CLIENT_PORT}`;

console.log('Environment Variables:');
console.log('HOST_IP:', HOST_IP);
console.log('SERVER_PORT:', SERVER_PORT);
console.log('CLIENT_ORIGIN:', CLIENT_ORIGIN);

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ['http://192.168.50.22:3000', 'http://localhost:3000'],
  credentials: true
};

app.use(cors(corsOptions));

const io = socketIo(server, {
  cors: corsOptions
});

app.use(express.static(path.join(__dirname, '../../../build')));

app.get('/api/serverInfo', (req, res) => {
  res.json({
    ip: HOST_IP,
    port: SERVER_PORT
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../build', 'index.html'));
});

initRosNode().then(() => {
  setupRosSubscribers(io);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('publish_ros', (data) => {
      const { topic, message, type } = data;
      if (topic && message && type) {
        try {
          publishMessage(topic, type, message);
          console.log(`Published to ${topic}:`, message);
        } catch (error) {
          console.error('Error publishing message:', error);
        }
      } else {
        console.error('Invalid topic, message, or type');
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(SERVER_PORT, HOST_IP, () => {
    console.log(`Server running on http://${HOST_IP}:${SERVER_PORT}`);
  });
}).catch(error => {
  console.error('Failed to initialize ROS node:', error);
});
