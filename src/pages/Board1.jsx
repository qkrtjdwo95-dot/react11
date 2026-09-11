import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Board1 = () => {
   
    // 0. 상수, 변수
    const num = 1;

    // 1. 상태변수 초기값 변경될 수 있는 변수
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0); 
    const [page, setPage] = useState(1);
    const [text, setText] = useState("");
    const [cnt, setCnt] = useState(10);

    // 2. 함수(호출되지 않으면 실행안됨)
    // 글쓰기 같은 경우는 사용자가 글쓰기 버튼을 눌렀을 때
    // 글 목록은 사용자에 의해 호출되는게 아니고 자동으로 호출되어야 함
    const boardList = async() => {
        const url = `/api/board/select.json?page=${page}&text=${text}&cnt=${cnt}`;
        const { data } = await axios.get(url);
        console.log(data); 
        // data.status 와 200이랑 비교하는데 값도 같고 타입도 같아야 함
        if(data.status === 200) {
            setRows(data.rows);
            setTotal(data.total);
            
        } 
    }

    // 3. dlvprxm 
    useEffect(()=> {
        boardList();

    }, []);
    
    return (
        <div>
            <table>
                <tbody>
                    { rows.map((item, idx) => (
                        <tr key = {idx}>
                            <td>{idx}</td>
                            <td>{item._id}</td>
                            <td>{item.title}</td>
                            <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Board1;