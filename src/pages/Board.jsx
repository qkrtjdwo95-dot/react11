import { Pagination } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Board = () => {
    const navigate = useNavigate();

    // 1. 상태변수
    const [page, setPage] = useState(1);
    const [text, setText] = useState('');
    const [cnt, setCnt] = useState(10);
    const [rows, setRows]  = useState([]);
    const [total, setTotal] = useState(0);


    // 2. 함수
    const handleList = async () => {
        // url  ?   키=값    &  키=값     & 키=값
        const url = `/api/board/select.json?page=${page}&text=${text}&cnt=${cnt}`;
        const { data } = await axios.get(url);
        console.log(data);

        setTotal(data.total);
        setRows( data.rows );

    }

    const handleContent = (no) => {
        // 게시글 상세화면으로 이동
        navigate(`/board/content?no=${no}`);
    }

    //페이지네이션 컴포넌트에서 oncHange가 될때 호출된 함수를 생성함
    const onChange = (page, pageSize)=>{
        console.log(page, pageSize);
        setPage(page);
        setCnt(pageSize);
    }

    // 3. 이펙트 (함수를 호출하기 위한 타이밍을 설정) [   ] 비어 있으면 최초 1번만됨
    useEffect(() => {
        handleList();
    }, [ page, cnt  ]);


    // 5. 화면 표시
    return (
        <div>
            <h3>게시판</h3>
            <Link to="/board/write">
                <button>글쓰기</button>
            </Link>
            <hr />
            <table border={1}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    { rows.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td onClick={()=> handleContent(item._id)}>{item.title}</td>
                            <td>{item.writer}</td>
                            <td>{item.hit}</td>
                            <td>{item.regdate2}</td>
                        </tr>
                    )) }
                </tbody>
            </table>

            <Pagination current={page} total={total} onChange={onChange} />;

        </div>
    );
};

export default Board;