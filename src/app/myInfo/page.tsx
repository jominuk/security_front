"use client";

import { deleteMember } from "@/api/memberApi";
import React from "react";

const page = () => {
  const deleteMemberHandler = async () => {
    const token = sessionStorage.getItem("token") || "";
    const userId = sessionStorage.getItem("userId");

    // try {
    //   const result = await deleteMember(token, userId);

    // } catch{
    2;
    // }
  };
  return (
    <>
      <button onClick={deleteMemberHandler}>회원 탈퇴</button>
    </>
  );
};

export default page;
