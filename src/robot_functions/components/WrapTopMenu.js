import React, { useCallback, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { DepthTopMenu, SubTopMenu } from "../../components/Layout/TopMenu";
import { REQUEST_TYPES, publishAimyRequest } from "../ros/PublishAimyRequest";
import { useRosData } from "../hooks/useRosData";
import SmoothLink from "../../components/Layout/SmoothLink";

const useTopMenuControl = (menuType, stopModes, navigateTo) => {
    const navigate = useNavigate();
    const rosData = useRosData(['/heroehs/aimy/web/top_menu']);

    const handleClick = useCallback(() => {
        publishAimyRequest({
            requestTypes: [REQUEST_TYPES.STOP],
            setStop: stopModes
        });
        if (navigateTo) {
            navigate(navigateTo);
        }
    }, [stopModes, navigate, navigateTo]);

    useEffect(() => {
        if (rosData['/heroehs/aimy/web/top_menu']) {
            const menuValue = rosData['/heroehs/aimy/web/top_menu'].data;
            if ((menuType === 'depth' && menuValue === 1) || (menuType === 'sub' && menuValue === 2)) {
                handleClick();
            }
        }
    }, [rosData, menuType, handleClick]);

    return handleClick;
};

const WrappedDepthTopMenu = forwardRef(({ stopModes, navigateTo = '/' }, ref) => {
    const handleClick = useTopMenuControl('depth', stopModes, navigateTo);
    const buttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        click: () => {
            if (buttonRef.current) {
                buttonRef.current.click();
            }
        }
    }));

    return (
        <SmoothLink to={navigateTo}>
            <div ref={buttonRef} onClick={handleClick}>
                <DepthTopMenu />
            </div>
        </SmoothLink>
    );
});

const WrappedSubTopMenu = ({ stopModes = [2, 4] }) => {
    const navigate = useNavigate();
    const rosData = useRosData(['/heroehs/aimy/web/top_menu']);

    const handleHomeClick = useCallback(() => {
        publishAimyRequest({
            requestTypes: [REQUEST_TYPES.STOP],
            setStop: stopModes
        });
        navigate('/');
    }, [stopModes, navigate]);

    const handleBackClick = useCallback(() => {
        publishAimyRequest({
            requestTypes: [REQUEST_TYPES.STOP],
            setStop: stopModes
        });
        navigate(-1);
    }, [stopModes, navigate]);

    useEffect(() => {
        if (rosData['/heroehs/aimy/web/top_menu']) {
            const menuValue = rosData['/heroehs/aimy/web/top_menu'].data;
            if (menuValue === 1) {
                handleHomeClick();
            } else if (menuValue === 2) {
                handleBackClick();
            }
        }
    }, [rosData, handleHomeClick, handleBackClick]);

    return (
        <SubTopMenu onHomeClick={handleHomeClick} onBackClick={handleBackClick} />
    );
};

export { WrappedDepthTopMenu, WrappedSubTopMenu };
