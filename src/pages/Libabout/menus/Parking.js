import React from "react";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import ParkingData from "../datas/Parking/ParkingData";
import SwiperComponent from "../../../components/Contents/SwiperComponent";
import ParkingDiscountData from "../datas/Parking/ParkingDiscountData";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';
function Parking() {
  const pageData = [
    {
      title: "주차장 안내",
      description: "주차장 안내에 대한 설명입니다.",
      ContentsData: <ParkingData />,
    },
    {
      title: "주차요금 할인 안내",
      description: "주차요금 할인 안내에 대한 설명입니다.",
      ContentsData: <ParkingDiscountData />,
    },
  ];
  const tabs = ["주차장 안내", "주차요금 할인 안내"];
  return (
    <SubBackWrap>
      <WrappedSubTopMenu />
      <div className="subContentWrap">
        {/* <TabContents></TabContents> */}
        <SwiperComponent
          mainTitle={"주차장 안내"}
          tabs={tabs}
          data={pageData}
        />
      </div>
    </SubBackWrap>
  );
}

export default Parking;
