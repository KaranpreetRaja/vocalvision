import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './pages/home';
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Vision from "./pages/vision";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/dashboard/:uid" element={<Dashboard />} />
            <Route path="/dashboard/:uid/:sessionId" element={<Vision />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App