import React, { useEffect } from "react";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import Title from "../../components/Layout/Title";
import MenusScrollFrame from "../../components/MenusScrollFrame";
import ReadBookData from "./data/ReadBookData";
import readbookimg_arobot from "../../robot_functions/assets/AeiRobot2.jpg"
import { WrappedDepthTopMenu } from '../../robot_functions/components/WrapTopMenu';
import { REQUEST_TYPES, publishAimyRequest } from '../../robot_functions/ros/PublishAimyRequest';
import { useRosData } from '../../robot_functions/hooks/useRosData';

function Readbook() {
    const rosData = useRosData(['/heroehs/aimy/manage/ebook']); // 필요한 토픽 구독

    useEffect(() => {
        const timer = setTimeout(() => {
            publishAimyRequest({
                requestTypes: [REQUEST_TYPES.AUDIO],
                presetAudio: 5
            });
        }, 250);

        return () => clearTimeout(timer);
    }, []);

    const ebooks = [
        {
            title: "에이로봇 브로셔",
            image: readbookimg_arobot,
            imageStyle: { width: '470px', height: 'auto' },
            author: "에이로봇",
            publisher: "에이로봇",
            publicationDate: "2023년 10월 11일 출간",
            ISNB: "XXXXXXXXXXXXX",
            format: "e-Book",
        },
    ];

    return (
        <SubBackWrap>
            <WrappedDepthTopMenu stopModes={[2, 4]} />
            <Title>도서 읽어주기</Title>
            <MenusScrollFrame children={<ReadBookData ebooks={ebooks} rosData={rosData} />} />
        </SubBackWrap>
    );
}

export default Readbook;
