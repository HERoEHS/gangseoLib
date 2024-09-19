import React from "react";
import SwiperComponent from "../../../components/Contents/SwiperComponent";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import LoanCertificateData from "../datas/MembershipCard/LoanCertificateData";
import MembershipData from "../datas/MembershipCard/MembershipData";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

const pageData = [
    {
        title: "대출증 안내",
        description: "대출증에 대한 설명입니다.",
        ContentsData: <LoanCertificateData />,
    },
    {
        title: "회원증 안내",
        description: "회원증에 대한 설명입니다.",
        ContentsData: <MembershipData />,
    },
];
const tabs = ["대출증 안내", "회원증 안내"];

function MembershipCard() {
    return (
        <SubBackWrap>
            <WrappedSubTopMenu />
            <div className="subContentWrap">
                {/* <TabContents></TabContents> */}
                <SwiperComponent
                    mainTitle={"대출증·회원증 안내"}
                    tabs={tabs}
                    data={pageData}
                />
            </div>
        </SubBackWrap>
    );
}

export default MembershipCard;
