import { ListType } from "@/app/list/page";

export async function postList(
  token: string,
  title: string,
  content: string,
  userId: string
) {
  const response = await fetch("http://localhost:8080/list/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, userId }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export async function getList(token: string): Promise<ListType[]> {
  const response = await fetch("http://localhost:8080/list/get", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  // 응답이 성공적이면 JSON 데이터를 파싱하여 반환
  const data = await response.json();
  return data;
}
