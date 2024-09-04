export interface memberType {
  userId: string;
  password: string;
  memo?: string;
}

export async function postMember(formData: memberType): Promise<void> {
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

export interface MemberType {
  userId: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
}

export async function loginMember(formData: MemberType): Promise<MemberType> {
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
