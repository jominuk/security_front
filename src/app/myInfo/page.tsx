"use client";

import { deleteMember, myInfoMember } from "@/api/memberApi";
import { GetMemberType } from "@/types/userType";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [info, setInfo] = useState<GetMemberType>();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token") || "";
      const userId = sessionStorage.getItem("userId") || "";

      try {
        const data = await myInfoMember(token, userId);
        setInfo(data);
      } catch (error: any) {
        const errorMessage = error.message.replace(/^Error:\s*/, "");
        alert(errorMessage);
      }
    };
    fetchData();
  }, []);

  const deleteMemberHandler = async () => {
    const token = sessionStorage.getItem("token") || "";
    try {
      const res = await deleteMember(token, info?.id);
      alert(res);
      router.push("/");
    } catch (error: any) {
      const errorMessage = error.message.replace(/^Error:\s*/, "");
      alert(errorMessage);
    }
  };
  return (
    <>
      <button onClick={deleteMemberHandler}>회원 탈퇴</button>
      <div>아이디 : {info?.userId}</div>
      <div>메모 : {info?.memo}</div>
    </>
  );
};

export default page;
