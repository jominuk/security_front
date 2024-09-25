"use client";

import { loginMember } from "@/api/memberApi";
import { LoginMemberType } from "@/types/userType";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginMemberType>({
    userId: "",
    password: "",
    accessToken: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await loginMember(formData);

      sessionStorage.setItem("token", result.accessToken);
      sessionStorage.setItem("refreshToken", result.refreshToken || "");

      alert("로그인 성공!");
      router.push("/list");
    } catch (error: any) {
      let errorMessage = "로그인에 실패했습니다.";
      if (error.message) {
        try {
          const parsedError = JSON.parse(error.message);
          errorMessage = parsedError.error || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                사용자 ID
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="사용자 ID"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-btn-primary hover:bg-btn-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => router.push("/join")}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
