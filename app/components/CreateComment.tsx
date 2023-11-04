"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function CreateComment({ postId }: { postId: string }) {
  const [comment, setComment] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  let toastPostId: string;
  const queryClient = useQueryClient();

  // Submit comment
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading("Creating your comment", { id: toastPostId });
    setIsDisabled(true);
    mutate(comment);
    setIsDisabled(false);
  };

  // Create a post via API
  const { mutate } = useMutation(
    async (comment: string) =>
      await axios.post("/api/posts/addComment", { postId, comment }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
            console.log(error)
          toast.error(error?.response?.data.message, { id: toastPostId });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Post has been made!", { id: toastPostId });
        // Invalidate the cache for "posts" query
        queryClient.invalidateQueries(postId);
        setComment("");
        setIsDisabled(false);
      },
    },
  );

  return (
    <form onSubmit={submitComment} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment"
          className="p-4 text-lg rounded-md my-3 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            comment.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${comment.length}/300`}</p>
        <button
          type="submit"
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        >
          Post
        </button>
      </div>
    </form>
  );
}
