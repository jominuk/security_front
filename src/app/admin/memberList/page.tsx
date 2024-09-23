"use client";

import React, { useEffect, useState } from "react";
import { GetAdminMemberType } from "@/types/userType";
import { getAdminMember } from "@/api/adminApi";

const Page = () => {
  const [users, setUsers] = useState<GetAdminMemberType[]>([]);

  console.log(users);

  useEffect(() => {
    const token = sessionStorage.getItem("token") || "";
    getAdminMember(token)
      .then((data) => setUsers(data))
      .catch(async (error: any) => {
        const errorMessage = await error.message.replace(/^Error:\s*/, "");
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Member List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">User ID</th>
              <th className="px-4 py-2 border-b">Memo</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border-b">{user.id}</td>
                  <td className="px-4 py-2 border-b">{user.userId}</td>
                  <td className="px-4 py-2 border-b">{user.memo}</td>
                  <td className="px-4 py-2 border-b">{user.createdAt}</td>
                  <td className="px-4 py-2 border-b">{user.updatedAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 border-b" colSpan={5}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
