import { useState, useEffect } from "react";
import { User } from "../types/userType";

export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userObjString = localStorage.getItem("user");
    if (userObjString) {
      try {
        const userObj: User = JSON.parse(userObjString);
        setUser(userObj);
      } catch (error) {
        console.error("Error parsing user object:", error);
        // If there's an error parsing the user object, clear it from localStorage
        localStorage.removeItem("user");
      }
    }
  }, []);

  return user;
}
