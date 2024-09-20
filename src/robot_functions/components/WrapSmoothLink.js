import React from 'react';
import SmoothLink from '../../components/Layout/SmoothLink';
import { REQUEST_TYPES, publishAimyRequest } from '../ros/PublishAimyRequest';

const WrapSmoothLink = ({ to, children, requestConfig }) => {
    const handleClick = () => {
        if (requestConfig) {
            publishAimyRequest(requestConfig);
        }
    };

    return (
        <SmoothLink to={to} onClick={handleClick}>
            {children}
        </SmoothLink>
    );
};

export default WrapSmoothLink;
