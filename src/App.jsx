import { Link, Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Board from "./pages/Board"
import Login from "./pages/Login"
import Join from "./pages/Join"
import BoardWrite from "./pages/BoardWrite"
import BoardContent from "./pages/BoardContent"
import Footer from "./pages/Footer"
import { Button } from "antd"
import Logout from "./pages/Logout"
import { useSelector } from "react-redux"
import ItemInsert from "./pages/ItemInsert"
import ItemList from "./pages/ItemList"
import ChangePw from "./pages/Mypage/ChangePw"
import MyPage from "./pages/Mypage"
import Changeinfo from "./pages/Mypage/Changeinfo"
import Chat from "./pages/Chat"
import Board1 from "./pages/Board1"


const App = () => {
  const Navigate = useNavigate();
  const { isLogin, token } = useSelector((state) => state.logged);

  return (
    <div>
      <Link to="/"><Button type="dashed" >홈</Button></Link>
      <Link to="chat"><Button type="dashed" >채팅</Button></Link>

      <Link to="/board1"><Button type="dashed">게시판</Button></Link>

      <Link to="/board"><Button type="dashed">게시판1</Button></Link>
      <Link to="/item/list"><Button type="dashed">물품목록</Button></Link>

      {!isLogin && <Link to="/login"><Button type="dashed">로그인</Button></Link>}
      {isLogin && <Link to="/logout"><Button type="dashed">로그아웃</Button></Link>}
      {!isLogin && <Link to="/join"><Button type="dashed">회원가입</Button></Link>}
      {isLogin && <Link to="/mypage"><Button type="dashed">마이페이지</Button></Link>}
      <Link to="/item/insert"><Button type="dashed">물품등록</Button></Link>
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chat" element={<Chat />} />
        <Route path="board1" element={<Board1 />} />
        <Route path="item/insert" element={<ItemInsert />} />
        <Route path="item/list" element={<ItemList />} />
        <Route path="/board" element={<Board />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={isLogin === true ? <Logout /> : <Navigate to="/login" />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={isLogin === true ? <MyPage /> : <Navigate to="/login" />} >
          <Route path="changeinfo" element={<Changeinfo />} />
          <Route path="changepw" element={<ChangePw />} />
        </Route>
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/content" element={<BoardContent />} />

      </Routes>


      <Footer title="테스트"></Footer>
    </div>
  )
}

export default App