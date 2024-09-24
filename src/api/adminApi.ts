import { AdminMemberResponse } from "@/types/userType";

export async function getAdminMember(
  token: string,
  pageSize: number,
  page: number
): Promise<AdminMemberResponse> {
  const response = await fetch(
    `http://localhost:8080/admin/member?pageSize=${pageSize}&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const data: AdminMemberResponse = await response.json();
  return data;
}
