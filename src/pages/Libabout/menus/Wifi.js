import React from "react";
import SwiperComponent from "../../../components/Contents/SwiperComponent";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import AndroidData from "../../Libabout/datas/Wifi/AndroidData";
import IphoneData from "../../Libabout/datas/Wifi/IphoneData";
import NotebookData from "../../Libabout/datas/Wifi/NotebookData";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

const pageData = [
    {
        title: "안드로이드",
        description: "안드로이드에 대한 설명입니다.",
        ContentsData: <AndroidData />,
    },
    {
        title: "아이폰",
        description: "아이폰에 대한 설명입니다.",
        ContentsData: <IphoneData />,
    },
    {
        title: "노트북",
        description: "노트북에 대한 설명입니다.",
        ContentsData: <NotebookData />,
    },
];
const tabs = ["안드로이드", "아이폰", "노트북"];
function Wifi() {
    return (
        <SubBackWrap>
            <WrappedSubTopMenu />
            <div className="subContentWrap">
                {/* <TabContents></TabContents> */}
                <SwiperComponent
                    mainTitle={"와이파이 안내"}
                    tabs={tabs}
                    data={pageData}
                />
            </div>
        </SubBackWrap>
    );
}

export default Wifi;
