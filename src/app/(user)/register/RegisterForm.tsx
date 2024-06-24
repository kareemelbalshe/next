"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.error("username is required");
    if (email === "") return toast.error("email is required");
    if (password === "") return toast.error("password is required");
    console.log({ email, password });
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/users/register", {
        username,
        email,
        password,
      });
      toast.success("Registered successfully");
      router.replace("/");
      setLoading(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <form onSubmit={formHandler} className="flex flex-col">
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="text"
        placeholder="enter your username"
        name=""
        id=""
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
        type="submit"
        className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
      >
        {loading ? <ButtonSpinner/> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
