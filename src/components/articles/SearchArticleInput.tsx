"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {toast} from 'react-toastify'

const SearchArticleInput = () => {
    const router=useRouter()

  const [searchText, setSearchText] = useState("");

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/articles/search?searchText=${searchText}`)
  };

  return (
      <form onSubmit={formHandler} className="my-5 w-full md:w-2/3 m-auto">
      <input
        className="w-full border-none rounded p-3 text-xl text-gray-900"
        type="search"
        placeholder="search for article"
        name=""
        id=""
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  )
}
export default SearchArticleInput