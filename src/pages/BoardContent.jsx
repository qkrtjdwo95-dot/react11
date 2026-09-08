import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const BoardContent = () => {

    // 0. 상수(변경불가)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // 1. 상태변수 (변경가능)
    const [no, setNo] = useState(searchParams.get("no") || 0);
    const [nextNo, setNextNo] = useState(0);
    const [prevNo, setPrevNo] = useState(0);
    const [result, setResult] = useState({});

    // 2. 함수
    const handleData = async () => {
        // 백엔드의 주소 ? 파라미터로 가져올 번호를 전달
        const url = `/api/board/selectonehit.json?no=${no}`;
        const { data } = await axios.get(url);
        console.log(data);
        setNextNo(data.nextNo);
        setPrevNo(data.prevNo);
        setResult(data.result);
    }

    const handlePrev = () => {
        navigate(`/board/content?no=${prevNo}`);
        setNo(prevNo);
    }

     const handleNext = () => {
        navigate(`/board/content?no=${nextNo}`);
        setNo(nextNo);
    }

    // 3. 이펙트
    useEffect(() => {
        handleData();
    }, [no]);

    // 4. 화면표시
    return (
        <div>
            <p>번호 : {no}</p>
            <p>제목 : {result.title}</p>
            <p>내용 : {result.content}</p>
            <p>작성자 : {result.writer}</p>
            <p>조회수 : {result.hit}</p>
            <p>날짜 : {result.regdate2}</p>
            <Link to="/board"><button>목록으로</button></Link>
            <button onClick={handlePrev}>이전글</button>
            <button onClick={handleNext}>다음글</button>
            <button>게시글변경</button>
            <button>게시글삭제</button>
        </div>
    );
};

export default BoardContent;