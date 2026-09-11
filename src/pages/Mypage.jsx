import React from 'react';
import { Link, Outlet} from 'react-router-dom';

const Mypage = () => {
    return (
        <div>

            <Link to="/mypage/changePw"><button>암호변경</button></Link>
            <Link to="/mypage/changeinfo"><button>정보변경</button></Link>
            
            <Outlet />
        </div>
    );
};

export default Mypage;