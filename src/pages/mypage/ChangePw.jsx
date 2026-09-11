import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ChangePw = () => {

   

    //토큰받기
    const { token } = useSelector((state) => state.logged);

    // 상태변수
    const [oldpw, setOldpw] = useState('');
    const [newpw, setNewpw] = useState('');
    const [confirmpw, setConfirmpw] = useState('');
    //함수
   
    //토큰에서 값을 가져오는거 (현재 비밀번호가 일치하는지를 알려면 현재 비밀번호를 알아야하니깐)
    const handleData = async () => {
         /*
        // 요청할 백엔드 url
        const url = ``;
        //전송할 토큰을 headers에 포함시킬 auth키는 변경될 수 있음
        const headers = { "Authorization" : `Bearer ${token}` };
        const { data } = await axios.get(url, { headers: headers });
        console.log(data);
        setCurrentpw(data.result.pw);
        */
    }

    const handleUpdate = async(e) => {
        e.preventDefault();

        //유효성 검사
        if(oldpw == '' || oldpw == null){
            alert("암호를 입력해주세요!");
            return;
        }
        if(newpw == '' || newpw == null){
            alert("변경하실 비밀번호를 입력해주세요!");
            return;
        }
        if(newpw != confirmpw){
            alert("비밀번호가 일치하지 않습니다!");
            return;
        }
        alert("변경되었습니다!")
    }
    //이펙트
    useEffect(() => {
        handleData();
    }, [token]);

    //화면 표시
    return (
        <div>
            <form onSubmit={handleUpdate}>
                <div>
                    현재 비밀번호 : <input type="password" value={oldpw} 
                                    onChange={(e) => setOldpw(e.target.value)} /> <br />
                    변경할 비밀번호 : <input type="password" value={newpw} 
                                    onChange={(e) => setNewpw(e.target.value)} /> <br />
                    비밀번호 확인 : <input type="password" value={confirmpw} 
                                    onChange={(e) => setConfirmpw(e.target.value)} /> <br />
                </div>
                <div>
                    <button type='submit'>확인</button>
                    <button >취소</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePw;