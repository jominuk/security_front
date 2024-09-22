import React, { FC } from "react";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
};

const ListPostCreateModal: FC<ModalProps> = ({ show, onClose, onSave }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSave = () => {
    onSave(title, content);
    setTitle("");
    setContent("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">게시글 작성</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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

export default ListPostCreateModal;
