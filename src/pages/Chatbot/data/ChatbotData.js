import React from "react";
import "../../../assets/css/sass/chatbotData.scss";
import ChatbotQnA from "../../../components/Contents/ChatbotQnA";
import { Chat } from "../../../robot_functions/components/chat/Chat";

function ChatbotData({ rosData }) {
  return (
    <>
      <div className="cntWrapBox">
        <div className="chatBotBox">
          <ChatbotQnA />
          {/* 챗봇 페이지 구성 */}
          <Chat rosData={rosData} />
          {/* 챗봇 페이지 구성 */}
        </div>
      </div>
    </>
  );
}

export default ChatbotData;
