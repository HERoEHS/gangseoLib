import React from "react";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import { DepthTopMenu } from "../../components/Layout/TopMenu";
import Title from "../../components/Layout/Title";
import MenusScrollFrame from "../../components/MenusScrollFrame";
import ReadBookData from "./data/ReadBookData";
import readbookimg1 from "../../assets/images/readbookimg1.svg";
import { WrappedDepthTopMenu } from '../../robot_functions/components/WrapTopMenu';
import readbookimg_arobot from "../../robot_functions/assets/AeiRobot2.jpg"

function Readbook() {
  const ebooks = [
    {
        title: "에이로봇 브로셔",
        image: readbookimg_arobot,
        imageStyle: { width: '470px', height: 'auto' }, // 이미지 스타일 추가

        author: "에이로봇",
        publisher: "에이로봇",
        publicationDate: "2023년 10월 11일 출간",
        ISNB: "XXXXXXXXXXXXX",
        format: "e-Book",
      },
    // {
    //   title: "언젠가 우리가 같은 별을 바라본다면",
    //   image: readbookimg1,
    //   author: "차인표",
    //   publisher: "제딧 그림",
    //   publicationDate: "2021년 12월 15일 출간",
    //   ISNB: "9791160320268",
    //   format: "e-Book",
    // },
  ];
  return (
    <SubBackWrap>
      <WrappedDepthTopMenu stopModes={[2, 4]}/>
      <Title>도서 읽어주기</Title>
      <MenusScrollFrame children={<ReadBookData ebooks={ebooks} />} />
    </SubBackWrap>
  );
}

export default Readbook;
