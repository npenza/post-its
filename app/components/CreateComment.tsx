"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

// Component which allows you to post a comment
export default function CreateComment({ postId }: { postId: string }) {
  
  // Query Client
  const queryClient = useQueryClient();

  // Use State for writing the comment
  const [comment, setComment] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // Toast ID for notification
  let toastPostId: string;

  // Submit comment event
  const submitComment = async (e: React.FormEvent) => {
    // Prevent page refresh
    e.preventDefault();

    // Set toast to loading
    toastPostId = toast.loading("Creating your comment", { id: toastPostId });

    // Disable adding an extra comment while uploading
    setIsDisabled(true);

    // Send to API
    mutate(comment);

    // Enable comment button again
    setIsDisabled(false);
  };

  // Create a post via API
  const { mutate } = useMutation(
    async (comment: string) => await axios.post("/api/posts/addComment", { postId, comment }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Show the error API message
          toast.error(error?.response?.data.message, { id: toastPostId });
        }
      },
      onSuccess: (data) => {
        // Show success message
        toast.success("Post has been made!", { id: toastPostId });

        // Invalidate the cache for "posts" query
        queryClient.invalidateQueries(postId);

        // Clear comment
        setComment("");
      },
    },
  );

  return (
    // Form comment/section
    <form onSubmit={submitComment} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        {/* Comment Message */}
        <textarea
          name="title"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment"
          className="p-4 text-lg rounded-md my-3 bg-gray-200"
        ></textarea>
      </div>
      {/* Submit button / char limit area */}
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            comment.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${comment.length}/300`}</p>
        {/* Post button */}
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
