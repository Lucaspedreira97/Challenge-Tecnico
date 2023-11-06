import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/LogIn";



export default function Approuter() {
  return (
    <Routes>
        <Route exact path="/" element={<Login />}  />
    </Routes>
  );
}
