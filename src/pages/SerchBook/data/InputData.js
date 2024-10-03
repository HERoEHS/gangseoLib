import React from "react";
import { useForm } from "react-hook-form";
import "../../../assets/css/sass/serchBookData.scss";
import serchIcon from "../../../assets/icons/tabler_search.svg";
import serchBtnIcon from "../../../assets/icons/serchBtnIcon.svg";
import serchAmiIcon from "../../../assets/icons/serchamiIcon.svg";

function InputData({ handleTrimmedSearch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // form 제출
  const Submit = (body) => {
    const trimmedSearch = body.serchInput.trim();
    handleTrimmedSearch(trimmedSearch);
    // startSerchBook(trimmedSearch);
  };

  //강서도서관 검색 결과 링크
  // const startSerchBook = (serchData) => {
  //   const baseUrl =
  //     "https://gslib.sen.go.kr/gslib/intro/search/index.do?menu_idx=4&locExquery=111005&editMode=normal&officeNm=%EA%B0%95%EC%84%9C%EB%8F%84%EC%84%9C%EA%B4%80&lectureNm=&mainSearchType=on&search_text=";

  //   const fullUrl = `${baseUrl}${encodeURIComponent(serchData)}`;

  //   window.open(fullUrl, "_blank");
  // };

  // validation 체크
  const serchInput = {
    required: {
      value: true,
      message: "※ 검색어를 입력해 주세요! ※",
    },
  };

  return (
    <>
      <form className="serchForm" onSubmit={handleSubmit(Submit)}>
        <div className="serchBox">
          <img className="serchIcon" src={serchIcon} alt="" />
          <input
            className="serchInput"
            id="serchInput"
            type="text"
            placeholder="검색어를 입력해 주세요!"
            autoComplete="off"
            {...register("serchInput", serchInput)}
          />
        </div>
        {errors.serchInput && (
          <div className="serchErr">{errors.serchInput.message}</div>
        )}
        <div className="serchBtnWrap">
          {/* 에이미 버튼 */}
          <button type="button" className="serchBookBtn">
            <img src={serchAmiIcon} alt="" />
            <div>에이미</div>
          </button>

          {/* 검색 버튼 */}
          <button type="submit" className="serchBookBtn">
            <img src={serchBtnIcon} alt="" />
            <div>검색</div>
          </button>
        </div>
      </form>
    </>
  );
}

export default InputData;
