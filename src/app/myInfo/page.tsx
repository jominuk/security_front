"use client";

import { deleteMember, myInfoMember } from "@/api/memberApi";
import { GetMemberType } from "@/types/userType";
import React, { useEffect, useState } from "react";

const page = () => {
  const [info, setInfo] = useState<GetMemberType>();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token") || "";
      const userId = sessionStorage.getItem("userId") || "";

      try {
        const data = await myInfoMember(token, userId);
        setInfo(data);
        console.log(data);
      } catch (error: any) {
        const errorMessage = error.message.replace(/^Error:\s*/, "");
        alert(errorMessage);
      }
    };
    fetchData();
  }, []);
  const deleteMemberHandler = async () => {
    // try {
    //   const result = await deleteMember(token, userId);
    // } catch{
    // }
  };
  return (
    <>
      <button onClick={deleteMemberHandler}>회원 탈퇴</button>
    </>
  );
};

export default page;
