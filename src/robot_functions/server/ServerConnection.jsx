import React, { useEffect, useState } from 'react';
import SocketManager from './SocketManager';
import { setSocket, updateRosData } from '../ros/rosStore';

const ServerConnection = ({ setServerInfo }) => {
    const [envVariables, setEnvVariables] = useState({});
    const [socketUrl, setSocketUrl] = useState('');

    useEffect(() => {
        // 환경 변수 확인
        const env = {
            HOST_IP: process.env.REACT_APP_HOST_IP,
            SERVER_PORT: process.env.REACT_APP_SERVER_PORT,
        };
        setEnvVariables(env);
        console.log('Environment Variables:', env);

        const fetchServerInfo = async () => {
            try {
                const response = await fetch(`http://${env.HOST_IP}:${env.SERVER_PORT}/api/serverInfo`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setServerInfo(data);
                const url = `http://${data.ip}:${data.port}`;
                console.log('Setting socket URL:', url);
                setSocketUrl(url);
            } catch (error) {
                console.error('Error fetching server info:', error);
            }
        };

        fetchServerInfo();
    }, [setServerInfo]);

    useEffect(() => {
        if (!socketUrl) {
            console.log('Socket URL not set yet');
            return;
        }

        console.log('Attempting to connect to socket:', socketUrl);
        const socketManager = SocketManager.getInstance();
        const socket = socketManager.connect(socketUrl);
        setSocket(socket);

        socket.on('connect', () => {
            console.log('Socket connected successfully');
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        socket.on('ros_data_update', (data) => {
            // console.log('Received ROS data:', data);
            updateRosData(data.topic, data.data);
        });

        return () => {
            console.log('Cleaning up socket connection');
            socketManager.disconnect();
        };
    }, [socketUrl]);

    return null;
};

export default ServerConnection;
