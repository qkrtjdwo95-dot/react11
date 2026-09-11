// 파일명 : reducers 폴더에 loggedSlice.jsx


import {createSlice} from "@reduxjs/toolkit"
import { NoStyleItemContext } from "antd/es/form/context";

// 공유 할 상태변수 초기값 설정 ex) 로그인유무, 토큰 값 
const getInitialState = () => {
    //저장소에 TOKEN키 값을 가진 토큰을 읽음 
    const token = sessionStorage.getItem("TOKEN");
    // 토큰이 있다면 true, 없다면 false를 chk에 보관함
    let chk = false;
    if(token != null){
        chk = true;
    }
    //읽은 토큰값과 hk값을 반환함
    return{
        isLogin : chk,
        token : token,
    }
}

export const loggedSlice = createSlice({
    name: "logged",
    initialState : getInitialState(),

    // 여기가 위에 정의한 상태변수를 바꿀 수 있게 구현하기
    reducers : { 
        login: (state, action) => {
            state.token = action.payload.token;
            state.isLogin = true; 
            sessionStorage.setItem("TOKEN" , action.payload.token);
        },
        logout: (state) => {
            state.token = null; 
            state.isLogin = false; 
            sessionStorage.removeItem("TOKEN");
        }
    }
})

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;

     