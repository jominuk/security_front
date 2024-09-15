import {
  GetMemberType,
  JoinMemberType,
  LoginMemberType,
} from "@/types/userType";

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

// 내 정보 가져오기
export async function myInfoMember(
  token: string,
  userId: string
): Promise<GetMemberType> {
  const response = await fetch(
    `http://localhost:8080/member/myInfo?userId=${userId}`,
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

// 회원 탈퇴
export async function deleteMember(
  token: string,
  userId: number | undefined
): Promise<string> {
  const response = await fetch(
    `http://localhost:8080/member/delete?id=${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return await response.text();
}
