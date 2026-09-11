import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {

    const navigate = useNavigate();

    // 상태변수
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');

    const [check, setCheck] = useState('중복확인');

    const handleId = async (e) => {
        setId(e.target.value);

        if (e.target.value.length > 0) {
            const url = `/api/member/idcheck.json?id=${e.target.value}`;
            const { data } = await axios.get(url);
            console.log(data);
            if(data.result === 0) {
                setCheck('사용가능');
            }
            else{
                setCheck('사용불가');
            }
        }
        else{
            setCheck('중복확인');
        }
    }

    const handleJoin = async(e) => {
        e.preventDefault();
        const url = `/api/member/join.json`;
        // 앞쪽키(변경불가) : 뒤쪽값(상태변수)
        const body = {
            "id" : id, 
            "age" :  age, 
            "email" : email,
            "name" : name,
            "password" : pw
        }
        const {data} = await axios.post(url, body);
        console.log(data);
        if(data.status === 200) {
            alert('회원가입 성공');
            navigate("/");
        }
    }

    return (
        <div>
            <h3>회원가입</h3>
            <form onSubmit={handleJoin}>
                <div>
                    <input type='text' value={id} onChange={handleId} placeholder='아이디입력' autoFocus />
                    <label>{check}</label>
                </div>
                <div>
                    <input type='password' value={pw} onChange={(e) => setPw(e.target.value)} placeholder='암호입력' />
                </div>
                <div>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='이름입력' />
                </div>
                <div>
                    <input type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder='나이입력' />
                </div>
                <div>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='이메일입력' />
                </div>
                <div>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default Join;