"use client";

import { deleteMember, myInfoMember } from "@/api/memberApi";
import { useJwt } from "@/components/hooks/useJwt";
import { GetMemberType } from "@/types/userType";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const { userId } = useJwt();

  const [info, setInfo] = useState<GetMemberType>();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token") || "";

      if (userId) {
        try {
          const data = await myInfoMember(token, userId);
          setInfo(data);
        } catch (error: any) {
          const errorMessage = error.message.replace(/^Error:\s*/, "");
          alert(errorMessage);
        }
      }
    };
    fetchData();
  }, [userId]);

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

  const handleEdit = () => {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          내 정보
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">
              아이디 : {info?.userId}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              메모 : {info?.memo}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={deleteMemberHandler}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            회원 탈퇴
          </button>
          <button
            onClick={handleEdit}
            className="w-full ml-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            회원 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
