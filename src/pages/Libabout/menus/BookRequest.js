import React from "react";
import "../../../assets/css/sass/bookRequest.scss";
import { SubBackWrap } from "../../../components/Layout/BackWrap";
import Title from "../../../components/Layout/Title";
import MenusScrollFrame from "../../../components/MenusScrollFrame";
import BookRequestData from "../datas/BookRequest/BookRequestData";
import { WrappedSubTopMenu } from '../../../robot_functions/components/WrapTopMenu';

function BookRequest() {
    const title = "희망도서 신청 안내";

    return (
        <SubBackWrap>
            <WrappedSubTopMenu />
            <Title>{title}</Title>
            <MenusScrollFrame children={<BookRequestData />} />
        </SubBackWrap>
    );
}

export default BookRequest;
