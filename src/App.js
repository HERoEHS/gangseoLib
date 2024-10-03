import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../src/assets/css/index.css";
import "../src/assets/styles/style.scss";
import MainPage from "./layout/MainPage";
import Chatbot from "./pages/Chatbot/Chatbot";
import Libabout from "./pages/Libabout/Libabout";
import BookRequest from "./pages/Libabout/menus/BookRequest";
import Cafeteria from "./pages/Libabout/menus/Cafeteria";
import DeliveryLoan from "./pages/Libabout/menus/DeliveryLoan";
import Donation from "./pages/Libabout/menus/Donation";
import FacilityUse from "./pages/Libabout/menus/FacilityUse";
import Locker from "./pages/Libabout/menus/Locker";
import MembershipCard from "./pages/Libabout/menus/MembershipCard";
import Parking from "./pages/Libabout/menus/Parking";
import Printing from "./pages/Libabout/menus/Printing";
import Program from "./pages/Libabout/menus/Program";
import Wifi from "./pages/Libabout/menus/Wifi";
import Libsetabout from "./pages/LibSetAbout/LibSetAbout";
import SubTest from "./pages/LibSetAbout/SubTest";
import ReadEbook from "./pages/ReadBook/data/ReadEbook";
import ServerConnection from './robot_functions/server/ServerConnection';
import Readbook from "./pages/ReadBook/ReadBook";
import Waiting from "./pages/Waiting/Waiting";
import SerchBook from "./pages/SerchBook/SerchBook";
import { RosProvider } from './robot_functions/hooks/RosContext';

function App() {
    const [serverInfo, setServerInfo] = useState(null);
    const [rosData, setRosData] = useState({});
    const [socket, setSocket] = useState(null);

    return (
        <div className="globalContainer">
            <ServerConnection setServerInfo={setServerInfo} />
            <RosProvider>
                <Routes>
                    {/* 메인 페이지 route */}
                    <Route path="/" element={<MainPage />}></Route>
                    <Route path="/chatbot" element={<Chatbot socket={socket} rosData={rosData} />}></Route>
                    <Route path="/libabout" element={<Libabout />}></Route>
                    <Route path="/libsetabout" element={<Libsetabout />}></Route>
                    <Route path="/readbook" element={<Readbook />}></Route>
                    {/* 서브 페이지 테스트 route */}
                    <Route path="/subTest" element={<SubTest />}></Route>

                    {/* 도서관 안내 페이지 route */}
                    <Route path="/bookrequest" element={<BookRequest />}></Route>
                    <Route path="/Cafeteria" element={<Cafeteria />}></Route>
                    <Route path="/DeliveryLoan" element={<DeliveryLoan />}></Route>
                    <Route path="/Donation" element={<Donation />}></Route>
                    <Route path="/FacilityUse" element={<FacilityUse />}></Route>
                    <Route path="/Locker" element={<Locker />}></Route>
                    <Route
                        path="/MembershipCard"
                        element={<MembershipCard />}
                    ></Route>
                    <Route path="/Parking" element={<Parking />}></Route>
                    <Route path="/Printing" element={<Printing />}></Route>
                    <Route path="/Program" element={<Program />}></Route>
                    <Route path="/Wifi" element={<Wifi />}></Route>

                    {/* 도서 읽어주기 ebook route */}
                    <Route
                        path={`/readbook/ebook/:title`}
                        element={<ReadEbook />}
                    ></Route>

                    {/* 이벤트 route */}
                    {/* <Route path="/eventpage" element={<EventPage />}></Route> */}
                    <Route path="/eventpage" element={<Waiting />}></Route>
                    {/* 도서 검색 route */}
                    <Route path="/serchbook" element={<SerchBook />}></Route>
                    {/* 준비중 페이지 route */}
                    <Route path="/waiting" element={<Waiting />}></Route>
                </Routes>
            </RosProvider>
        </div>
    );
}

export default App;
