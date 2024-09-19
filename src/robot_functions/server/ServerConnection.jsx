import React, { useEffect, useState } from 'react';
import SocketManager from './SocketManager';

const ServerConnection = ({ setServerInfo, setRosData, setSocket }) => {
    const [socketUrl, setSocketUrl] = useState('');

    useEffect(() => {
        const fetchServerInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/serverInfo', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setServerInfo(data);
                setSocketUrl(`http://${data.ip}:${data.port}`);
            } catch (error) {
                console.error('Error fetching server info:', error);
            }
        };

        fetchServerInfo();
    }, [setServerInfo]);

    useEffect(() => {
        if (!socketUrl) return;

        const socketManager = SocketManager.getInstance();
        const socket = socketManager.connect(socketUrl);
        setSocket(socket);

        socket.on('ros_data_update', (data) => {
            setRosData(data);
        });

        return () => {
            // Don't disconnect on component unmount
            // socketManager.disconnect();
        };
    }, [socketUrl, setRosData, setSocket]);

    return null;
};

export default ServerConnection;
