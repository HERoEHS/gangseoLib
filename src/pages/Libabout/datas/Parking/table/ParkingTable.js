import React from "react";

function ParkingTable() {
    return (
        <table className="defaultTable">
            <thead>
                <tr>
                    <th width="70%">감면 대상</th>
                    <th>할인율</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>장애인 등록증을 소지한 장애인 차량</td>
                    <td rowSpan="7">80% 감면</td>
                </tr>
                <tr>
                    <td className="lastTd">국가유공자 증서 소지자 차량</td>
                </tr>
                <tr>
                    <td className="lastTd">
                        고엽제후유증환자 및 고엽제후유의증환자 차량
                    </td>
                </tr>
                <tr>
                    <td className="lastTd">의상자증을 소지한 의상자 차량</td>
                </tr>
                <tr>
                    <td className="lastTd">
                        독립유공자증을 소지한 독립유공자 차량
                    </td>
                </tr>
                <tr>
                    <td className="lastTd">
                        5·18 민주유공자 증서를 소지한 5·18 민주화운동 부상자
                        차량
                    </td>
                </tr>
                <tr>
                    <td className="lastTd">
                        보훈보상대상자증을 소지한 보훈보상대상자 차량
                    </td>
                </tr>
                <tr>
                    <td>경형자동차와 저공해자동차</td>
                    <td rowSpan="4">50%감면</td>
                </tr>
                <tr>
                    <td className="lastTd">
                        다둥이 행복카드 소지 차량(세 자녀 이상)
                    </td>
                </tr>
                <tr>
                    <td className="lastTd">참전유공자 차량</td>
                </tr>
                <tr>
                    <td className="lastTd">병역명문가 예우대상자 차량</td>
                </tr>
                <tr>
                    <td>다둥이 행복카드 소지 차량(두 자녀)</td>
                    <td>30%감면</td>
                </tr>
            </tbody>
        </table>
    );
}

export default ParkingTable;
