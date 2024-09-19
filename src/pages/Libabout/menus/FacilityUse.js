import React, { useCallback, useState } from "react";
import SwiperComponent from "../../../components/Contents/SwiperComponent";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import Modal from "../../../pages/Libabout/datas/FacilityUse/Modal";
import FacilityUseData from "../datas/FacilityUse/FacilityUseData";
import FloorData from "../datas/FacilityUse/FloorData";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

function FacilityUse() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const handleMapClick = useCallback((area) => {
        console.log("Map clicked:", area);
        setModalContent({
            title: `${area.name}`,
            content: area.detail(),
        });
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    const pageData = [
        {
            title: "시설 개요",
            description: "시설에 대한 설명입니다.",
            ContentsData: <FacilityUseData />,
        },
        {
            title: "층별 안내",
            description: "층별에 대한 설명입니다.",
            ContentsData: <FloorData onMapClick={handleMapClick} />,
        },
    ];
    const tabs = ["시설 개요", "층별 안내"];
    console.log("Modal state:", { isModalOpen, modalContent });
    return (
        <SubBackWrap>
            <WrappedSubTopMenu />
            <div className="subContentWrap">
                <SwiperComponent
                    mainTitle={"시설 이용 안내"}
                    tabs={tabs}
                    data={pageData}
                />
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalContent?.title}
                content={modalContent?.content}
            />
        </SubBackWrap>
    );
}

export default FacilityUse;
