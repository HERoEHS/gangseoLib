import React from "react";
import { SubBackWrap } from "../../components/Layout/BackWrap";
import Title from "../../components/Layout/Title";
import { DepthTopMenu } from "../../components/Layout/TopMenu";
import MenusScrollFrame from "../../components/MenusScrollFrame";
import EventData from "./data/EventData";

function EventPage() {
    const title = "이벤트 안내";
    return (
        <SubBackWrap>
            <DepthTopMenu />
            <Title>{title}</Title>
            <MenusScrollFrame children={<EventData />} title={title} />
        </SubBackWrap>
    );
}

export default EventPage;
