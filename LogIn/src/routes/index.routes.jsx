import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import AdminPage from "../pages/adminPage";



export default function Approuter() {
  return (
    <Routes>
        <Route exact path="/" element={<Login />}  />
        <Route path="/home" element={<Home />}  />
        <Route path="/adminPage" element={<AdminPage/>}  />
    </Routes>
  );
}
