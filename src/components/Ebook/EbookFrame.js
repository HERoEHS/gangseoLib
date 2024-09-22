import React from "react";
import CntWrap from "../TextBoxs/CntWrap";

function EbookFrame({ children }) {
  return (
    <div className="ebookFrameLayout frame background">
      <div className="ebookScrollFrame">
        <CntWrap>{children}</CntWrap>
      </div>
    </div>
  );
}

export default EbookFrame;
