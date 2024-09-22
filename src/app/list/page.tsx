"use client";

import React, { useState, useEffect } from "react";
import ListPostCreateModal from "@/components/modal/ListPostCreateModal";
import { getList, postList } from "@/api/listApi";
import { useRouter } from "next/navigation";
import { useJwt } from "@/components/hooks/useJwt";

export type ListType = {
  id: number;
  title: string;
  content: string;
  createDate: string;
};

const Page: React.FC = () => {
  const router = useRouter();
  const { userRole, userId } = useJwt();

  const [listItems, setListItems] = useState<ListType[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const token = sessionStorage.getItem("token") || "";
    if (userId) {
      try {
        const data = await getList(token, userId);
        setListItems(data);
      } catch (error: any) {
        const errorMessage = error.message.replace(/^Error:\s*/, "");
        alert(errorMessage);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleSave = async (title: string, content: string) => {
    const token = sessionStorage.getItem("token") || "";
    try {
      await postList(token, title, content, userId);
      fetchData();
    } catch (error: any) {
      const errorMessage = error.message.replace(/^Error:\s*/, "");
      alert(errorMessage);
    }
  };

  const myInfoHandler = () => {
    router.push("/myInfo");
  };

  const logoutHandler = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Member List</h1>

      <div className="flex justify-between mb-6 space-x-4">
        <button
          onClick={myInfoHandler}
          className="bg-btn-primary text-white rounded-lg shadow-lg hover:bg-btn-hover transition px-4 py-2"
        >
          내 정보
        </button>
        <button
          onClick={logoutHandler}
          className="bg-btn-primary text-white rounded-lg shadow-lg hover:bg-btn-hover transition px-4 py-2"
        >
          로그아웃
        </button>
      </div>

      {userRole === "ADMIN" && (
        <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition">
          관리자 버튼
        </button>
      )}

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          게시글 작성
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h2>
            <p className="text-gray-700 mb-4">{item.content}</p>
            <p className="text-gray-500 text-sm">
              Created on: {new Date(item.createDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <ListPostCreateModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Page;
