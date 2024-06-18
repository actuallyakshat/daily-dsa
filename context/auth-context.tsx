"use client";
import { login, register, verify } from "@/app/(auth)/_actions/actions";
import Loading from "@/app/loading";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface AuthProps {
  user: User | null;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  loading: boolean;
  loginUser: (username: string, password: string) => void;
  registerUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}
const AuthContext = React.createContext<AuthProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        verifyUser(token);
      }
    }
  }, []);

  async function loginUser(username: string, password: string) {
    try {
      if (!username || !password) {
        toast.error("Username and password are required");
        return;
      }
      const response = await login(username, password);
      if (response.success && response.user && response.token) {
        setUser(response?.user);
        setIsLoggedIn(true);
        localStorage.setItem("token", response?.token);
        router.push("/ticker");
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error: any) {
      console.log(error);
      if (error.message == "NEXT_REDIRECT") return;
      toast.error(error.message);
    }
  }

  async function verifyUser(token: string) {
    try {
      const response = await verify(token);
      if (response.success && response.user) {
        setUser(response?.user);
        setIsLoggedIn(true);
        return true;
      } else {
        toast.error(response.message);
        return false;
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      return false;
    }
  }

  async function registerUser(username: string, password: string) {
    try {
      if (!username || !password) {
        toast.error("Username and password are required");
        return false;
      }
      const response = await register(username, password);
      if (response.success && response.success && response.user) {
        setUser(response?.user);
        return true;
      } else {
        toast.error(response.message);
        return false;
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      return false;
    }
  }

  async function logoutUser() {
    try {
      setUser(null);
      setIsLoggedIn(false);
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  React.useEffect(() => {
    try {
      if (user) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        loading,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
