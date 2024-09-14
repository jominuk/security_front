// 회원가입
export interface JoinMemberType {
  userId: string;
  password: string;
  memo?: string;
}

// 로그인
export interface LoginMemberType {
  userId: string;
  password: string;
  accessToken: string;
  refreshToken?: string;
}

// 내 정보
export interface GetMemberType {
  id: number;
  userId: string;
  accessToken: string;
  memo?: string;
}
