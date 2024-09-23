import React, { useEffect } from "react";
import MainIcons from "../components/Icons/MainIcons";
import { MainBackWrap } from "../components/Layout/BackWrap";
import SmoothLink from "../components/Layout/SmoothLink";
import { REQUEST_TYPES, publishAimyRequest } from '../robot_functions/ros/PublishAimyRequest';
import { publishCommon } from '../robot_functions/ros/PublishCommon';

function MainPage() {
    // useEffect(() => {
    //     const config = {
    //         data: "hi"
    //     };

    //     const timer = setTimeout(() => {
    //         publishCommon('/heroehs/aimy/test', 'std_msgs/msg/String', config);
    //     }, 500); // 500ms 딜레이

    //     return () => clearTimeout(timer);
    // }, []);

    const handleClick = (config) => {
        publishAimyRequest(config);
    };

      return (
                  <MainBackWrap>
                    <h1>Main Page</h1>
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
