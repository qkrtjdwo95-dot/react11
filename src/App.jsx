import { Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Board from "./pages/Board"
import Login from "./pages/Login"
import Join from "./pages/Join"
import BoardWrite from "./pages/BoardWrite"
import BoardContent from "./pages/BoardContent"
import Footer from "./pages/Footer"
import { Button } from "antd"



const App = () => {

  return (
    <div>
      <Link to="/"><Button type="primary">홈</Button></Link>
      <Link to="/board"><Button type="primary">게시판</Button></Link>
      <Link to="/login"><Button type="primary">로그인</Button></Link>
      <Link to="/join"><Button type="primary">회원가입</Button></Link>



      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/content" element={<BoardContent />} />

      </Routes>


      <Footer title="테스트"></Footer>
    </div>
  )
}

export default App
