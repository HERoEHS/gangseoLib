import React, { useEffect, useState } from 'react';
import SocketManager from './SocketManager';
import { setSocket, setRosData } from '../ros/rosStore';

const ServerConnection = ({ setServerInfo }) => {
    const [envVariables, setEnvVariables] = useState({});
    const [socketUrl, setSocketUrl] = useState('');

    useEffect(() => {
        // 환경 변수 확인
        const env = {
            HOST_IP: process.env.REACT_APP_HOST_IP,
            SERVER_PORT: process.env.REACT_APP_SERVER_PORT,
            // 필요한 다른 환경 변수들도 여기에 추가
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

    // // 환경 변수 출력을 위한 임시 렌더링
    // return (
    //     <div>
    //         <h3>Environment Variables:</h3>
    //         <pre>{JSON.stringify(envVariables, null, 2)}</pre>
    //     </div>
    // );
};

export default ServerConnection;
