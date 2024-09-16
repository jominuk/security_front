import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

export const useJwt = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        setUserId(decodedToken.userId || null);
        setUserRole(decodedToken.role || null);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return { userId: userId || "", userRole: userRole || "" };
};
