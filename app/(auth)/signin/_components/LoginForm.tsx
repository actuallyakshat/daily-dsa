"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const { loginUser, isLoggedIn } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(username, password);
    } catch (error: any) {
      console.log(error);
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
      <h2 className="text-center text-xl font-bold">Log back into Daily DSA</h2>
      <p className="text-center text-sm text-muted">
        Log back into your account to keep track of your progress.
      </p>
      <form
        className="mt-5 flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Username"
          className="input"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2 text-white"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
