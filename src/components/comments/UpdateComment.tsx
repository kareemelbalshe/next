"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface UpdateCommentProps {
    setOpen: Dispatch<SetStateAction<boolean>>
    text : string
    commentId : number
}

const  UpdateComment = ({ setOpen , text , commentId }: UpdateCommentProps) => {
    const [updateText,setUpdateText]=React.useState(text)
    const router = useRouter()
    const formHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(updateText===""){
            return toast.info("Please enter a comment")
        }
        try{
            await axios.put(`https://next-six-fawn.vercel.app/api/comments/${commentId}`,{
                text:updateText
            })
            router.refresh()
            setUpdateText("")
            setOpen(false)
            }
        catch(e:any){
            toast.error(e?.response?.data.message)
        }
    }
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-11/12 lg:w-2/4 rounded-lg p-3">
        <div className="flex justify-end items-start">
            <IoMdCloseCircleOutline className="text-red-600 text-3xl cursor-pointer mb-5" onClick={() => setOpen(false)}/>
        </div>
        <form onSubmit={formHandler}>
            <input type="text"
            value={updateText}
            onChange={(e)=>setUpdateText(e.target.value)}
            placeholder="Edit your comment"
            className="w-full p-2 text-xl rounded-lg mb-2"/>
            <button type="submit" className="bg-green-700 w-full text-white p-1 mt-2 text-xl rounded-lg hover:bg-green-900 transition">
                Edit
            </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;
