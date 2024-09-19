import React from "react";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import Title from "../../../components/Layout/Title";
import MenusScrollFrame from "../../../components/MenusScrollFrame";
import DonationData from "../datas/Donation/DonationData";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

function Donation() {
    const title = "자료기증 관련 안내";
    return (
        <SubBackWrap>
            <WrappedSubTopMenu />
            <Title>{title}</Title>
            <MenusScrollFrame children={<DonationData />} title={title} />
        </SubBackWrap>
    );
}

export default Donation;
