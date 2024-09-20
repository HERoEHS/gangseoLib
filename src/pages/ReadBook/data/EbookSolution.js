import React from "react";
import FirestTitle from "../../../components/TextBoxs/CntTitle";
import Ebook from "../../../robot_functions/components/ebook/Ebook";

function EbookSolution({ title }) {
  return (
    <div className="cntWrapBox">
      <FirestTitle>{title}</FirestTitle>
      {/* ebook 페이지 */}
      <Ebook />
      {/* ebook 페이지 */}
    </div>
  );
}

export default EbookSolution;
