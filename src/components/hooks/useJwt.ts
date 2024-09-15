import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

export const useJwt = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        setUserRole(decodedToken.role || null);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return userRole;
};
