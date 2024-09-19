import React, { useState } from "react";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import Title from "../../../components/Layout/Title";
import { SubTopMenu } from "../../../components/Layout/TopMenu";
import MenusScrollFrame from "../../../components/MenusScrollFrame";
import Month9Data from "../datas/Program/Month9Data";
import MenusScrollFrame from "../../../components/MenusScrollFrame";
import Month9Data from "../datas/Program/Month9Data";
import Title from "../../../components/Layout/Title";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

function Program() {
    const months = ["9월", "10월", "11월", "12월"];
    const [currentMonth, setCurrentMonth] = useState();

    const handleMonth = (currentMonthIndex) => {
        setCurrentMonth(currentMonthIndex);
    };

    const september = [
        {
            date: "2일 (월)",
            program: [
                {
                    content: "[마을결합형도서관] 마을독서동아리 리더교육Ⅱ",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "3일 (화)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "4일 (수)",
            program: [
                {
                    content:
                        "(집중력을 도둑맞은 시대) 학습몰입을 통한 학습력 향상 학습법 배우기",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                {
                    content:
                        "[학부모 독서문화프로그램] 수학 잘하는 아이, 수학도 잘하는 아이",
                    icon: 5,
                },
            ],
        },
        {
            date: "5일 (목)",
            program: [
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                { content: "[체험] 시니어 힐링공예(9월 강좌)", icon: 5 },
            ],
        },
        {
            date: "6일 (금)",
            program: [{ content: "정기휴관일", icon: 1 }],
        },
        {
            date: "7일 (토)",
            program: [
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                { content: "어린이 퓨전인형극 오즈의 마법사 공연", icon: 5 },
                { content: "2024년 9월 영화 및 음악 감상", icon: 5 },
                { content: "몬스터 호텔 - 뒤바뀐 세계", icon: 4 },
            ],
        },
        {
            date: "8일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "9일 (월)",
            program: [
                {
                    content: "[마을결합형도서관] 마을독서동아리 리더교육Ⅱ",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "10일 (화)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "11일 (수)",
            program: [
                {
                    content:
                        "(집중력을 도둑맞은 시대) 학습몰입을 통한 학습력 향상 학습법 배우기",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                {
                    content:
                        "[학부모 독서문화프로그램] 수학 잘하는 아이, 수학도 잘하는 아이",
                    icon: 5,
                },
                { content: "2024년 9월 수요예술무대", icon: 5 },
            ],
        },
        {
            date: "12일 (목)",
            program: [
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                { content: "[체험] 시니어 힐링공예(9월 강좌)", icon: 5 },
            ],
        },
        {
            date: "13일 (금)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "14일 (토)",
            program: [
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                { content: "2024년 9월 영화 및 음악 감상", icon: 5 },
                { content: "배드 가이즈", icon: 4 },
            ],
        },
        {
            date: "15일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "16일 (월)",
            program: [{ content: "추석연휴", icon: 2 }],
        },
        {
            date: "17일 (화)",
            program: [{ content: "추석연휴", icon: 2 }],
        },
        {
            date: "18일 (수)",
            program: [{ content: "추석연휴", icon: 2 }],
        },
        {
            date: "19일 (목)",
            program: [
                { content: "[체험] 시니어 힐링공예(9월 강좌)", icon: 5 },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "20일 (금)",
            program: [{ content: "정기휴관일", icon: 1 }],
        },
        {
            date: "21일 (토)",
            program: [
                { content: "2024년 9월 영화 및 음악 감상", icon: 5 },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                {
                    content: "[한책] 「이어진 끈을 잘랐더니」 함께읽기",
                    icon: 5,
                },
                { content: "스탠바이, 웬디", icon: 4 },
            ],
        },
        {
            date: "22일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "23일 (월)",
            program: [
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                { content: "웹소설 작가 데뷔 방법 훔쳐보기", icon: 5 },
            ],
        },
        {
            date: "24일 (화)",
            program: [
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                {
                    content:
                        "[체험] 도서관에서 만나는 지구촌 다문화체험(6개국)",
                    icon: 5,
                },
            ],
        },
        {
            date: "25일 (수)",
            program: [
                { content: "2024년 9월 수요예술무대", icon: 5 },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                {
                    content:
                        "2024년 독서동아리 특강 「김영희 작가 강연회: 전기, 밀양-서울」 운영",
                    icon: 5,
                },
                {
                    content: "[독서의 달] 그림책이 내게 물었다 - 그림책 인문학",
                    icon: 5,
                },
            ],
        },
        {
            date: "26일 (목)",
            program: [
                { content: "[체험] 시니어 힐링공예(9월 강좌)", icon: 5 },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "27일 (금)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "28일 (토)",
            program: [
                { content: "2024년 9월 영화 및 음악 감상", icon: 5 },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                { content: "2024년 9월 강서인디영화", icon: 5 },
                { content: "양치기", icon: 4 },
            ],
        },
        {
            date: "29일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "30일 (월)",
            program: [
                { content: "[강좌]웹소설 작가 데뷔 방법 훔쳐보기", icon: 5 },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
    ];

    const october = [
        {
            date: "1일 (화)",
            program: [
                {
                    content:
                        "[체험] 도서관에서 만나는 지구촌 다문화체험(6개국)",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "2일 (수)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "3일 (목)",
            program: [{ content: "개천절", icon: 2 }],
        },
        {
            date: "4일 (금)",
            program: [{ content: "정기휴관일", icon: 1 }],
        },
        {
            date: "5일 (토)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "6일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "7일 (월)",
            program: [
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
                { content: "웹소설 작가 데뷔 방법 훔쳐보기", icon: 5 },
            ],
        },
        {
            date: "8일 (화)",
            program: [
                {
                    content:
                        "[체험] 도서관에서 만나는 지구촌 다문화체험(6개국)",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "9일 (수)",
            program: [{ content: "한글날", icon: 2 }],
        },
        {
            date: "10일 (목)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "11일 (금)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "12일 (토)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "13일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "14일 (월)",
            program: [
                { content: "웹소설 작가 데뷔 방법 훔쳐보기", icon: 5 },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "15일 (화)",
            program: [
                {
                    content:
                        "[체험] 도서관에서 만나는 지구촌 다문화체험(6개국)",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "16일 (수)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "17일 (목)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "18일 (금)",
            program: [{ content: "정기휴관일", icon: 1 }],
        },
        {
            date: "19일 (토)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "20일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "21일 (월)",
            program: [{ content: "2024년 하반기 나도 데일리!", icon: 5 }],
        },
        {
            date: "22일 (화)",
            program: [
                {
                    content:
                        "[체험] 도서관에서 만나는 지구촌 다문화체험(6개국)",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "23일 (수)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "24일 (목)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "25일 (금)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "26일 (토)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "27일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "28일 (월)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "29일 (화)",
            program: [
                {
                    content:
                        "[체험] 도서관에서 만나는 지구촌 다문화체험(6개국)",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "30일 (수)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "31일 (목)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
    ];
    const november = [
        {
            date: "1일 (금)",
            program: [{ content: "정기휴관일", icon: 1 }],
        },
        {
            date: "2일 (토)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "3일 (일)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "4일 (월)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "5일 (화)",
            program: [
                {
                    content:
                        "[체험] 도서관에서 만나는 지구촌 다문화체험(6개국)",
                    icon: 5,
                },
                { content: "2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "6일 (수)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "7일 (목)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "8일 (금)",
            program: [
                { content: "[강좌]2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "9일 (토)",
            program: [
                { content: "[강좌]2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "10일 (일)",
            program: [
                { content: "[강좌]2024년 하반기 나도 데일리 독자!", icon: 5 },
            ],
        },
        {
            date: "11일 (월)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "12일 (화)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "13일 (수)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "14일 (목)",
            program: [{ content: "2024년 하반기 나도 데일리 독자!", icon: 5 }],
        },
        {
            date: "15일 (금)",
            program: [{ content: "정기휴관일", icon: 1 }],
        },
        {
            date: "16일 (토)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "17일 (일)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "18일 (월)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "19일 (화)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "20일 (수)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "21일 (목)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "22일 (금)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "23일 (토)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "24일 (일)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "25일 (월)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "26일 (화)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "27일 (수)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "28일 (목)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "29일 (금)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "30일 (토)",
            program: [{ content: "", icon: "" }],
        },
    ];

    const december = [
        {
            date: "1일 (일)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "2일 (월)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "3일 (화)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "4일 (수)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "5일 (목)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "6일 (금)",
            program: [{ content: "정기휴관일", icon: 1 }],
        },
        {
            date: "7일 (토)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "8일 (일)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "9일 (월)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "10일 (화)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "11일 (수)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "12일 (목)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "13일 (금)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "14일 (토)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "15일 (일)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "16일 (월)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "17일 (화)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "18일 (수)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "19일 (목)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "20일 (금)",
            program: [{ content: "정기휴관일", icon: 1 }],
        },
        {
            date: "21일 (토)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "22일 (일)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "23일 (월)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "24일 (화)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "25일 (수)",
            program: [{ content: "성탄절", icon: 2 }],
        },
        {
            date: "26일 (목)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "27일 (금)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "28일 (토)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "29일 (일)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "30일 (월)",
            program: [{ content: "", icon: "" }],
        },
        {
            date: "31일 (화)",
            program: [{ content: "", icon: "" }],
        },
    ];

    const changMonth = [september, october, november, december];

  return (
    <SubBackWrap>
      <WrappedSubTopMenu />
      <Title>프로그램 안내</Title>
      <MenusScrollFrame
        children={
          <Month9Data
            children={changMonth[currentMonth]}
            months={months}
            handleMonth={handleMonth}
          />
        }
      />
    </SubBackWrap>
  );
}

export default Program;
