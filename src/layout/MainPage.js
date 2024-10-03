import React, { useEffect, useState } from "react";
import MainIcons from "../components/Icons/MainIcons";
import { MainBackWrap } from "../components/Layout/BackWrap";
import SmoothLink from "../components/Layout/SmoothLink";
import { REQUEST_TYPES, publishAimyRequest } from '../robot_functions/ros/PublishAimyRequest';
import { useRosData } from '../robot_functions/hooks/useRosData';

function MainPage() {
    const rosData = useRosData(['/heroehs/aimy/web/top_menu', '/heroehs/aimy/manage/ebook']);
    const [topMenuData, setTopMenuData] = useState(null);
    const [ebookData, setEbookData] = useState(null);

    useEffect(() => {
        if (rosData['/heroehs/aimy/web/top_menu']) {
            setTopMenuData(rosData['/heroehs/aimy/web/top_menu'].data);
            console.log('Top Menu Data:', rosData['/heroehs/aimy/web/top_menu'].data); // 콘솔에 출력
        }
    }, [rosData['/heroehs/aimy/web/top_menu']]);

    useEffect(() => {
        if (rosData['/heroehs/aimy/manage/ebook']) {
            setEbookData(rosData['/heroehs/aimy/manage/ebook'].data);
            console.log('Ebook Data:', rosData['/heroehs/aimy/manage/ebook'].data); // 콘솔에 출력
        }
    }, [rosData['/heroehs/aimy/manage/ebook']]);

    const handleClick = (config) => {
        publishAimyRequest(config);
    };

    return (
        <MainBackWrap>
            <h1>Main Page</h1>
            {/* {topMenuData && <div>{topMenuData}</div>}
            {ebookData && <div>{ebookData}</div>} */}
            <div className="mainMenuWrap">
                <div className="mainMenubox">
                    <SmoothLink to="/chatbot"
                        onClick={() => handleClick({
                            requestTypes: [REQUEST_TYPES.AUDIO, REQUEST_TYPES.MODE],
                            presetAudio: 2,
                            setMode: 1
                        })}>
                        <div className="innerPoint">
                            <div>
                                <MainIcons iconName="mainMike" />
                                <p>
                                    챗봇 에이미와
                                    <br />
                                    대화해보세요!
                                </p>
                            </div>
                            <MainIcons iconName="iconAime" />
                        </div>
                    </SmoothLink>
                    <div className="menuShadow"></div>
                    <div className="menuLight"></div>
                </div>
                <div className="mainMenuRow">
                    <div className="mainMenubox">
                        <SmoothLink to="/libabout">
                            <div className="innerType2">
                                <MainIcons iconName="mainIconLib" />
                                <p>
                                    도서관
                                    <br /> 안내
                                </p>
                            </div>
                        </SmoothLink>
                        <div className="menuShadow"></div>
                        <div className="menuLight"></div>
                    </div>
                    <div className="mainMenubox">
                        <SmoothLink to="/libsetabout">
                            <div className="innerType2">
                                <MainIcons iconName="mainIconSeat" />
                                <p>
                                    도서관
                                    <br /> 좌석안내
                                </p>
                            </div>
                        </SmoothLink>
                        <div className="menuShadow"></div>
                        <div className="menuLight"></div>
                    </div>
                </div>
                {/* <div className="mainMenuRow">
                        <div className="mainMenubox">
                            <SmoothLink to="/readbook">
                                <div className="innerType2">
                                    <MainIcons iconName="mainIconRead" />
                                    <p>
                                        도서관
                                        <br /> 읽어주기
                                    </p>
                                </div>
                            </SmoothLink>
                            <div className="menuShadow"></div>
                            <div className="menuLight"></div>
                        </div>
                        <div className="mainMenubox">
                            <SmoothLink to="/serchbook">
                                <div className="innerType2">
                                    <MainIcons iconName="mainIconSearch" />
                                    <p>
                                        도서
                                        <br /> 검색
                                    </p>
                                </div>
                            </SmoothLink>
                            <div className="menuShadow"></div>
                            <div className="menuLight"></div>
                        </div>
                    </div> */}
                {/* 한개짜리 */}
                <div className="mainMenubox">
                    <SmoothLink to="/readbook">
                        <div className="inner">
                            <MainIcons iconName="mainIconRead" />
                            <p>
                                도서
                                <br />
                                읽어주기
                            </p>
                        </div>
                    </SmoothLink>
                    <div className="menuShadow"></div>
                    <div className="menuLight"></div>
                </div>
                {/* 한개짜리 */}
            </div>
        </MainBackWrap>
    );
}

export default MainPage;
