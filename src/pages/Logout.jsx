import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducers/loggedSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 화면이 로딩되면 1회 실행
    useEffect(() => {
        if (window.confirm('로그아웃 할까요?')) {
            dispatch(logout());
            navigate("/");
        }
        else {
            navigate(-1);
        }
    }, []);

    return (
        <div>

        </div>
    );
}

export default Logout;