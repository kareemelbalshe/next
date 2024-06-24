"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {toast} from 'react-toastify'

interface AddCommentProps {
  articleId: number;
}

const AddComment = ({articleId}:AddCommentProps) => {
  const router =useRouter()
  const [text, setText] = useState("");

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if(text==='')return toast.error('please write a comment')

      try{
        await axios.post(`https://next-six-fawn.vercel.app/api/comments`, {text, articleId})
        router.refresh()
        setText('')
      }
      catch(error:any){
        toast.error(error?.response.data.message)
      }
  };

  return (
      <form onSubmit={formHandler}>
      <input
        className="w-full rounded-lg p-2 text-xl focus:shadow-md"
        type="search"
        placeholder="Add Comment"
        name=""
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit' className='bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-gray-900 transition'>Comment</button>
    </form>
  )
}
export default AddComment