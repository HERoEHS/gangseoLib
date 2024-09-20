import React, { useEffect } from "react";
import SwiperComponent from "../../components/Contents/SwiperComponent";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import { DepthTopMenu } from "../../components/Layout/TopMenu";
import Nomal from "./datas/Nomal";
import Notebook from "./datas/Notebook";
import { REQUEST_TYPES, publishAimyRequest } from '../../robot_functions/ros/PublishAimyRequest';
import { WrappedDepthTopMenu } from '../../robot_functions/components/WrapTopMenu';

function LibSetAbout() { // React 컴포넌트 이름을 'LibSetAbout'으로 변경
    useEffect(() => {
        const timer = setTimeout(() => {
            publishAimyRequest({
                requestTypes: [REQUEST_TYPES.AUDIO],
                presetAudio: 4
            });
        }, 100); // 100ms 딜레이

        return () => clearTimeout(timer);
    }, []);

    const pageData = [
        {
            title: "노트북 좌석 안내",
            description: "노트북 좌석에 대한 설명입니다.",
            ContentsData: <Notebook />,
        },
        {
            title: "일반 좌석 안내",
            description: "일반 좌석에 대한 설명입니다.",
            ContentsData: <Nomal />,
        },
    ];
    const tabs = ["노트북 좌석", "일반 좌석"];
    return (
        <SubBackWrap>
            <WrappedDepthTopMenu />
            <div className="subContentWrap">
            {/* <TabContents></TabContents> */}
            <SwiperComponent
                mainTitle={"도서관 좌석 안내"}
                tabs={tabs}
                data={pageData}
            />
            </div>
        </SubBackWrap>
    );
}

export default LibSetAbout;
