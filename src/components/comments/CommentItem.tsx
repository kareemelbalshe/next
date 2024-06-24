"use client";
import { CommentWithUser } from "@/utils/type";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateComment from "./UpdateComment";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}
const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const router= useRouter();

  const commentDeleteHandler = async () => {
    try {
      if(confirm("Are you sure you want to delete this comment?")){
        await axios.delete("http://localhost:3000/api/comments/" + comment.id);
        router.refresh();
      }
      }
    catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
    
  };
  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-800 mb-2">{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center">
          <FaEdit
            onClick={() => setOpen(true)}
            className="text-green-600 text-xl cursor-pointer me-3"
          />
          <FaTrash onClick={commentDeleteHandler} className="text-red-600 text-xl cursor-pointer" />
        </div>
      )}
      {open && (
        <UpdateComment
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;
