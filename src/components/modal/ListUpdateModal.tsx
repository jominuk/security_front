import { ListUpdateModalProps } from "@/types/listType";
import React, { FC, useState } from "react";

const ListUpdateModal: FC<ListUpdateModalProps> = ({
  show,
  onClose,
  onSave,
}) => {
  const [password, setPassword] = useState("");
  const [memo, setMemo] = useState("");

  const handleSave = () => {
    onSave(password, memo);
    setPassword(""); // 입력 필드 초기화
    setMemo(""); // 입력 필드 초기화
    onClose(); // 모달 닫기
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">회원 수정</h2>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="새 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-4 resize-vertical max-h-72"
          placeholder="새 메모를 입력하세요"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListUpdateModal;
