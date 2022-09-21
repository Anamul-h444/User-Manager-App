import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import UserProfilePage from "../pages/UserProfilePage";

function PagesRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/UserProfilePage" element={<UserProfilePage />} />
      <Route path="/RegistrationPage" element={<RegistrationPage />} />
      <Route path="/LoginPage" element={<LoginPage />} />
    </Routes>
  );
}

export default PagesRouter;
