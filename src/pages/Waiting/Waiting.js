import React, { useEffect } from "react";
import imgWaiting from "../../assets/images/imgWaiting.png";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import { SubTopMenu } from "../../components/Layout/TopMenu";
import { WrappedDepthTopMenu } from '../../robot_functions/components/WrapTopMenu';
import { REQUEST_TYPES, publishAimyRequest } from '../../robot_functions/ros/PublishAimyRequest';

function Waiting() {
    useEffect(() => {
        const timer = setTimeout(() => {
            publishAimyRequest({
                requestTypes: [REQUEST_TYPES.AUDIO],
                presetAudio: 7
            });
        }, 250);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SubBackWrap>
            <WrappedDepthTopMenu />
            <div className="imgCenter">
                <img src={imgWaiting} />
            </div>
        </SubBackWrap>
    );
}

export default Waiting;
