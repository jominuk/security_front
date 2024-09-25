"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GetAdminMemberType } from "@/types/userType";
import { getAdminMember } from "@/api/adminApi";
import FormattedDateTime from "@/components/utils/DateFormatter";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

const Page = () => {
  const [users, setUsers] = useState<GetAdminMemberType[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");

  const currentPageFromUrl = pageParam ? parseInt(pageParam) : 1;
  const pageSizeFromUrl = pageSizeParam ? parseInt(pageSizeParam) : 10;

  const [currentPage, setCurrentPage] = useState<number>(currentPageFromUrl);
  const [pageSize, setPageSize] = useState<number>(pageSizeFromUrl);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token") || "";

      try {
        const data = await getAdminMember(token, pageSize, currentPage - 1);
        setUsers(data.content);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        const errorMessage = error.message.replace(/^Error:\s*/, "");
        alert(errorMessage);
      }
    };

    fetchData();
  }, [pageSize, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/admin/memberList?pageSize=${pageSize}&page=${page}`);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    router.push(`/admin/memberList?pageSize=${size}&page=1`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Member List</h1>

      <div className="mb-4 flex justify-between">
        <Dropdown
          options={[10, 30, 50]}
          selectedLimit={pageSize}
          onChange={handlePageSizeChange}
        />

        <button
          className="ml-4 bg-btn-primary hover:bg-btn-hover text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => router.push("/list")}
        >
          게시글 목록
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">회원 활성 여부</th>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">User ID</th>
              <th className="px-4 py-2 border-b">Memo</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Updated At</th>
              <th className="px-4 py-2 border-b">Deactivated At</th>
              <th className="px-4 py-2 border-b">Role</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border-b">
                    {user.active ? <div>활성</div> : <div>비활성</div>}
                  </td>
                  <td className="px-4 py-2 border-b">{user.id}</td>
                  <td className="px-4 py-2 border-b">{user.userId}</td>
                  <td className="px-4 py-2 border-b">{user.memo}</td>
                  <td className="px-4 py-2 border-b">
                    <FormattedDateTime dateTimeString={user.createdAt} />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <FormattedDateTime dateTimeString={user.updatedAt} />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <FormattedDateTime dateTimeString={user.deactivatedAt} />
                  </td>
                  <td className="px-4 py-2 border-b">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 border-b" colSpan={8}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
