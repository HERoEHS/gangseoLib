import React from "react";
import parkingImg from "../../../../assets/images/parkingImg.svg";
import FirestTitle from "../../../../components/TextBoxs/CntTitle";
import CntWrap from "../../../../components/TextBoxs/CntWrap";

function ParkingData() {
    return (
        <>
            <CntWrap>
                {/* Start:큰 단락 복사 사용시 */}
                <div className="cntWrapBox">
                    <FirestTitle>주차장 이용 안내</FirestTitle>
                    <div className="cntTextBox">
                        <div>
                            <li className="textBoxType2">
                                <span>위치(층) :</span> 강서도서관 &#62; 야외
                            </li>
                        </div>
                        <div>
                            <li className="textBoxType1">주차 요금</li>
                            <li className="textBoxType2">
                                <span>무료 주차 :</span> 최초 1시간까지 무료(1일
                                1회에 한함)
                            </li>
                            <li className="textBoxType2">
                                <span>요금징수 :</span> 1시간 초과 시 매 5분당
                                100원
                                <br />
                                (무료주차 시간 이후 초과요금은 주차권에 의해서
                                퇴관 시 정산함)
                            </li>
                        </div>
                        <div>
                            <li className="textBoxType1">시설 소개</li>
                            <li className="imgBox">
                                <img src={parkingImg} alt="식당이미지1" />
                            </li>
                            <li className="textBoxType2">
                                식당은 따로 운영되지 않으며 개인 도시락 취식 및
                                멀티자판기 사용가능합니다.
                            </li>
                        </div>
                        <div>
                            <li className="textBoxType1">이용 안내</li>
                            <li className="textBoxType2">
                                <span>개관일 :</span> 9:00 ~20:00
                            </li>
                            <li className="textBoxType2">
                                <span>휴관일 :</span> 운영 안함
                            </li>
                            <li className="textBoxType2">
                                <span>주차면수 :</span> 19면(장애인 주차면수 1면
                                포함)
                            </li>
                        </div>
                    </div>
                </div>
                {/* End:큰 단락 복사 사용시 */}
            </CntWrap>
        </>
    );
}

export default ParkingData;
