"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") return toast.error("email is required");
    if (password === "") return toast.error("password is required");
    try {
      setLoading(true);
      await axios.post("https://next-six-fawn.vercel.app/api/users/login", {
        email,
        password,
      });
      router.replace("/"); // redirect to home page
      setLoading(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error)
      setLoading(false);
    }
  };
  return (
    <form onSubmit={formHandler} className="flex flex-col">
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="email"
        placeholder="enter your email"
        name=""
        id=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="password"
        placeholder="enter your password"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
      disabled={loading}
        type="submit"
        className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
      >
        {loading ? <ButtonSpinner/> : "login"}
      </button>
    </form>
  );
};

export default LoginForm;
