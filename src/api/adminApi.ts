import { GetAdminMemberType } from "@/types/userType";

export async function getAdminMember(
  token: string,
  pageSize: number
): Promise<GetAdminMemberType[]> {
  const response = await fetch(
    `http://localhost:8080/admin/member?pageSize=${pageSize}`,
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

  const data = await response.json();
  return data;
}
