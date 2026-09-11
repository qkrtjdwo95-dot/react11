import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Changeinfo = () => {

    //토큰받기
    const { token } = useSelector((state) => state.logged);

    // 상태 변수
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    // 함수

    const handleData = async () => {
        // 요청할 백엔드 url
        const url = `/api/member/selectone.json`;
        //전송할 토큰을 headers에 포함시킬 auth키는 변경될 수 있음
        const headers = { "Authorization": `Bearer ${token}` };
        const { data } = await axios.get(url, { headers: headers });
        console.log(data);
        setName(data.result.name);
        setAge(data.result.age);
        setEmail(data.result.email);
    }

    const handleUpdate = async(e) =>{
        e.preventDefault();
        // 변경할 url정보
        const url = `/api/member/update.json`;
        // 토큰 전송
        const headers = { "Authorization" : `Bearer ${token}` };
        // 변경할 내용
        const body = {
            "name": name,
            "age": age,
            "email" : email
        }
        const {data} = await axios.put(url, body, { headers: headers });
        console.log(data);
         if(data.status === 200) {
            alert('정보가 변경되었습니다.');
        }
    }

    //이펙트
    useEffect(() => {
        handleData();
    }, [token]);


    return (
        <div>
            <h3>정보 변경</h3>

            <form onSubmit={handleUpdate}>
            <div>
                이름 : <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                나이 : <input type="number" value={age} onChange={(e) => setAge(e.target.value)} /> <br />
                이메일 :<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <button>확인</button>
            <button>취소</button>
            </form>
        </div>

    );
};

export default Changeinfo;