import React, { useState } from "react";
import "../../../assets/css/sass/serchBookData.scss";
import InputData from "./InputData";

function SerchBookData() {
  const [searchContent, setSearchContent] = useState("");
  const handleTrimmedSearch = (body) => {
    setSearchContent(body);
  };
  return (
    <div className="serchBookLayout">
      <div className="serchContainer">
        <InputData handleTrimmedSearch={handleTrimmedSearch} />
        <div className="serchIframeWrap">
          <iframe
            className="serchIframe"
            src={`https://gslib.sen.go.kr/gslib/intro/search/index.do?menu_idx=4&locExquery=111005&editMode=normal&officeNm=%EA%B0%95%EC%84%9C%EB%8F%84%EC%84%9C%EA%B4%80&lectureNm=&mainSearchType=on&search_text=${searchContent}`}
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default SerchBookData;
