import React from "react";
import { DepthTopMenu, SubTopMenu } from "../../components/Layout/TopMenu";
import { REQUEST_TYPES, publishAimyRequest } from "../ros/PublishAimyRequest";

const WrappedDepthTopMenu = ({ stopModes = [2] }) => (
    <div onClick={() => publishAimyRequest({
        requestTypes: [REQUEST_TYPES.STOP],
        setStop: stopModes
    })}>
        <DepthTopMenu />
    </div>
);

const WrappedSubTopMenu = ({ stopModes = [2] }) => (
    <div onClick={() => publishAimyRequest({
        requestTypes: [REQUEST_TYPES.STOP],
        setStop: stopModes
    })}>
        <SubTopMenu />
    </div>
);

export { WrappedDepthTopMenu, WrappedSubTopMenu };
