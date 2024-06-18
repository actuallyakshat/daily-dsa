"use client";
import React from "react";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const { setUser, isLoggedIn, registerUser, loginUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and contain at least one uppercase letter",
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await registerUser(username, password);
      if (response) {
        const response = await loginUser(username, password);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      router.replace("/ticker");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="w-full max-w-md rounded-lg border px-8 pb-10 pt-6 shadow-md">
      <h2 className="text-center text-xl font-bold">Sign up with Daily DSA</h2>
      <p className="text-center text-sm text-muted">
        Get started today to track your progress and remain consistent.
      </p>
      <form
        className="mt-5 flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Username"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-white"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
