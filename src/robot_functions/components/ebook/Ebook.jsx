import React, { useRef, useEffect, useState, useCallback } from 'react';
import { publishCommon } from '../../ros/PublishCommon';
import { useRosData } from '../../hooks/useRosData';
import { compile } from 'sass';

function Ebook() {
    const iframeRef = useRef(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [sampleText, setSampleText] = useState('');
    const [shouldPublish, setShouldPublish] = useState(false);

    const rosData = useRosData(['/heroehs/aimy/manage/ebook']);

    const handlePageMove = (direction) => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow.dndpia && iframe.contentWindow.dndpia.ebook && iframe.contentWindow.dndpia.ebook.page) {
            iframe.contentWindow.dndpia.ebook.page.actObj.move(direction);
        } else {
            console.error('dndpia.ebook.page.actObj.move 함수를 찾을 수 없습니다.');
        }
    };

    const handleRosDataUpdate = useCallback((topic, data) => {
        console.log("handleRosDataUpdate topic:", topic, data);
        if (topic === '/heroehs/aimy/manage/ebook') {
            console.log("Entered ebook condition");

            // data가 객체인 경우를 처리
            const messageData = typeof data === 'object' && data !== null ? data.data : data;

            console.log("Processed message data:", messageData);

            if (messageData === 'request_text') {
                console.log("Requesting text");
                setTimeout(() => {
                    setShouldPublish(true);
                }, 1000); // 1초 delay
            } else if (messageData === 'next_page') {
                console.log("Moving to next page");
                handlePageMove('next');
            }
        }
    }, []);

    useEffect(() => {
        if (rosData['/heroehs/aimy/manage/ebook']) {
            handleRosDataUpdate('/heroehs/aimy/manage/ebook', rosData['/heroehs/aimy/manage/ebook'].data);
        }
    }, [rosData, handleRosDataUpdate]);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.onload = () => {
                console.log('iframe이 로드되었습니다.');
                setIframeLoaded(true);

                const iframeWindow = iframe.contentWindow;
                if (iframeWindow.dndpia && iframeWindow.dndpia.ebook && iframeWindow.dndpia.ebook.skin) {
                    console.log('dndpia.ebook.skin 객체가 존재합니다.');

                    // 기존의 updatePageNum 함수를 저장
                    const originalUpdatePageNum = iframeWindow.dndpia.ebook.skin.updatePageNum;

                    // updatePageNum 함수를 오버라이드
                    iframeWindow.dndpia.ebook.skin.updatePageNum = function (arrNum) {
                        // 원래의 함수 실행
                        originalUpdatePageNum.call(this, arrNum);

                        // 텍스트 추출 로직
                        let texts = "";
                        arrNum.forEach((n, i) => {
                            const el = iframeWindow.document.querySelector(`div.page-wrapper[page='${n}'] div.ir`) ||
                                iframeWindow.document.querySelector(`div.page-wrapper[page='${n}'] div[aria-label]`);
                            if (el) {
                                texts += el.classList.contains("ir") ? el.textContent : el.ariaLabel;
                                texts += i == 0 ? "\r\r" : "";
                            }
                        });

                        // React state 업데이트
                        setSampleText(texts);
                    };
                }
            };
        }
    }, []);

    useEffect(() => {
        if (shouldPublish && sampleText.trim() !== '') {
            publishCommon('/heroehs/aimy/web/ebook', 'std_msgs/msg/String', { data: sampleText });
            console.log('Publish:', sampleText);
            setShouldPublish(false);
        }
    }, [sampleText, shouldPublish]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <iframe
                ref={iframeRef}
                src="/ebook/index.html"
                title="Ebook Viewer"
                style={{ width: '100%', height: '64vh', border: 'none' }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    width: '3em',
                    height: '23.2em',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    opacity: 0.05
                }}
                onClick={() => handlePageMove('prev')}
            >
                <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>이전</span>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    width: '3em',
                    height: '23.2em',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    opacity: 0.05
                }}
                onClick={() => handlePageMove('next')}
            >
                <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>다음</span>
            </div>
            {iframeLoaded && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>
                    <textarea
                        value={sampleText}
                        readOnly
                        style={{ width: '100%', height: '100px', opacity: 0.0 }}
                    />
                </div>
            )}
        </div>
    );
}

export default Ebook;
