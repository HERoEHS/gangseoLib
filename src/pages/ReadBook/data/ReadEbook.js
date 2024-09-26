import React, { useEffect } from "react";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import Title from "../../../components/Layout/Title";
import { useParams } from "react-router-dom";
import EbookFrame from "../../../components/Ebook/EbookFrame";
import EbookSolution from "./EbookSolution";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';
import { useRosData } from '../../../robot_functions/hooks/useRosData';
import { publishCommon } from '../../../robot_functions/ros/PublishCommon';

function ReadEbook() {
  const { title } = useParams();
  const rosData = useRosData(['/heroehs/aimy/manage/ebook']); // 필요한 토픽 구독

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 데이터 요청
    publishCommon('/heroehs/aimy/manage/ebook', 'std_msgs/msg/String', { data: 'request_initial_data' });
  }, []);

  useEffect(() => {
    // console.log("ReadEbook rosData:", rosData);
  }, [rosData]);

  return (
    <SubBackWrap>
      <WrappedSubTopMenu stopModes={[2, 4]} />
      <Title>{title}</Title>
      <EbookFrame children={<EbookSolution rosData={rosData} />} />
    </SubBackWrap>
  );
}

export default ReadEbook;
