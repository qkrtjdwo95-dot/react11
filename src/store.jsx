// 파일명 : store.jsx

import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./reducers/loggedSlice";

export const store = configureStore({
    // reducers의 loggedSlice 파일을 초기화 하는 시점, 상태값이 만들어지는 시점 
    reducer:{
        logged : loggedReducer
    }
})

export default store