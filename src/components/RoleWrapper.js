import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const RoleWrapper = () => {
  const [auth] = useAuth();
  const navigate = useNavigate()


  // const [isAdmin,setIsAmdin]

  return <Outlet/>
};

export default RoleWrapper;
