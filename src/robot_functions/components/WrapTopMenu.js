import React from "react";
import { DepthTopMenu, SubTopMenu } from "../../components/Layout/TopMenu";
import { REQUEST_TYPES, publishAimyRequest } from "../ros/AimyPublisher";

const WrappedDepthTopMenu = () => (
    <div onClick={() => publishAimyRequest({
        requestTypes: [REQUEST_TYPES.STOP],
        setStop: [2] // AUDIO
    })}>
        <DepthTopMenu />
    </div>
);

const WrappedSubTopMenu = () => (
    <div onClick={() => publishAimyRequest({
        requestTypes: [REQUEST_TYPES.STOP],
        setStop: [2] // AUDIO
    })}>
        <SubTopMenu />
    </div>
);

export { WrappedDepthTopMenu, WrappedSubTopMenu };
