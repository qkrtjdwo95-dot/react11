import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {

    const navigate = useNavigate();

    // 1. 상태변수 
    const [title, setTitle] = useState('1');
    const [content, setContent] = useState('2');
    const [writer, setWriter] = useState('3');

    // 2. 함수
    const handleInsert = async (e) => {
        // form태그에 의해서 호출된 함수는 자동으로 새로고침 기능이 있으나 그 기능을 막는다.
        e.preventDefault();

        // url설정
        const url = `/api/board/insert.json`;

        // 전달해야할 데이터 (키 : 값)
        const body = {
            "title": title,
            "content": content,
            "writer": writer
        }

        // 백엔드 호출하기
        const { data } = await axios.post(url, body);
        console.log(data);

        if(data.status === 200) {
            alert('글쓰기 성공');
            navigate('/board'); // navigate를 이용한 페이지 전환하기 
        }
        else {
            alert('글쓰기 실패');
        }
    }

    // 5. 화면표시
    return (
        <div>
            <h3>글쓰기</h3>
            <form onSubmit={handleInsert}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} />
                <button type="submit">글쓰기</button>
            </form>
        </div>
    );
};

export default BoardWrite;