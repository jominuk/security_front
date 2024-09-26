"use client";

import React, { useState } from "react";
import { postMember, userIdCheck } from "@/api/memberApi";
import { useRouter } from "next/navigation";
import { JoinMemberType } from "@/types/userType";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<JoinMemberType>({
    userId: "",
    password: "",
    memo: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [idCheck, setIdCheck] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessage(""); // 입력 변경 시 에러 메시지 초기화
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postMember(formData);
      alert("회원가입이 완료되었습니다.");
      router.push("/");
    } catch (error: any) {
      const errorMessage = error.message.replace(/^Error:\s*/, "");
      setErrorMessage(errorMessage);
    }
  };

  const handleIdCheck = async () => {
    try {
      await userIdCheck(formData.userId);
      alert("사용 가능한 ID입니다.");
      setErrorMessage("");
    } catch (error: any) {
      const errorMessage = error.message.replace(/^Error:\s*/, "");
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            간편한 회원가입으로 시작해 보세요!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="userId" className="sr-only">
                사용자 ID
              </label>
              <div className="flex">
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  className="appearance-none rounded-l-lg flex-grow px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="사용자 ID"
                  value={formData.userId}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={handleIdCheck}
                  className="px-4 py-2 text-white rounded-r-lg bg-btn-primary hover:bg-btn-hover focus:outline-none focus:ring-2 duration-200"
                >
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="memo" className="sr-only">
                메모
              </label>
              <textarea
                id="memo"
                name="memo"
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-vertical max-h-72"
                placeholder="메모 (선택사항)"
                value={formData.memo}
                onChange={handleChange}
                style={{ maxHeight: "300px" }}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-btn-primary hover:bg-btn-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
