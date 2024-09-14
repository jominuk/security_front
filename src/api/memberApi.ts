import { JoinMemberType, LoginMemberType } from "@/types/userType";

// 회원가입
export async function postMember(formData: JoinMemberType): Promise<void> {
  const response = await fetch("http://localhost:8080/member/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

// 로그인
export async function loginMember(
  formData: LoginMemberType
): Promise<LoginMemberType> {
  const response = await fetch("http://localhost:8080/member/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const data = await response.json();

  return { ...data };
}

// 회원 탈퇴
export async function deleteMember(token: string, id: number): Promise<void> {
  const response = await fetch(`http://localhost:8080/member/delete/id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
