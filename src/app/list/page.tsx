"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/modal/Modal";
import { getList, postList } from "@/api/listApi";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useJwt } from "@/components/hooks/useJwt";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

export type ListType = {
  id: number;
  title: string;
  content: string;
  createDate: string;
};

const Page: React.FC = () => {
  const router = useRouter();
  const userRole = useJwt();

  const [listItems, setListItems] = useState<ListType[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token") || "";
      try {
        const data = await getList(token);
        setListItems(data);
      } catch (error: any) {
        const errorMessage = error.message.replace(/^Error:\s*/, "");
        alert(errorMessage);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (title: string, content: string) => {
    const token = sessionStorage.getItem("token") || "";
    try {
      await postList(token, title, content);
      alert("게시글이 등록 되었습니다.");
      window.location.reload();
    } catch (error: any) {
      const errorMessage = error.message.replace(/^Error:\s*/, "");
      alert(errorMessage);
    }
  };

  const myInfoHandler = () => {
    router.push("/myInfo");
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Member List</h1>

      <button onClick={myInfoHandler}>내 정보</button>

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
          Add New Item
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
              Created on: {new Date(item.createDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Page;
