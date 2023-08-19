import { useContext } from "react";
import TopBar from "./components/topbar/TopBar";
import { Home } from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Settings from "./pages/settings/settings";
import Single from "./pages/single/single";
import Write from "./pages/write/write";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <BrowserRouter>
    <TopBar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={user ?  <Home/> : <Register/>}/>
      <Route path="/login" element={user ?  <Home/> : <Login/>}/>
      <Route path="/write" element={user ?  <Write/> : <Register/>}/>
      <Route path="/settings" element={user ?  <Settings/> : <Register/>}/>
      <Route path="/post/:postId" element={<Single/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
