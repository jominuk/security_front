import { ListType } from "@/app/list/page";

// 게시글 등록
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

// 게시글 목록
export async function getList(
  token: string,
  userId: string
): Promise<ListType[]> {
  const response = await fetch(
    `http://localhost:8080/list/get?userId=${userId}`,
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
