import { Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loggedSlice';

const Login = () => {

    const dispatch = useDispatch();



    // 1. 상태변수설정   name => setName, age setAge
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');


    // 2. 함수설정 백엔드로 전송하기
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `/api/member/login.json`;
        const body = {
            "id": id,
            "password": pw
        }
        const { data } = await axios.post(url, body);
        console.log(data);

        // 리듀스의 login을 호출하여 값을 변경
        dispatch(login({token : data.token}));
    }


    // 5. 화면 표시
    return (
        <div>
            <h3>로그인</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
                <Button type="primary" htmlType="submit">로그인</Button>
            </form>
        </div>
    );
};

export default Login;