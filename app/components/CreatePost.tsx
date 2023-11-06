"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function CreatePost() {
  
  // Query Client
  const queryClient = useQueryClient();

  // Use state for writing the post
  const [title, setTitle] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // Toast ID notification
  let toastPostId: string;

  // Submit post event
  const submitPost = async (e: React.FormEvent) => {
    // Prevent form default
    e.preventDefault();

    // Create toast loading notification
    toastPostId = toast.loading("Creating your post", { id: toastPostId });

    // Disable from posting further comments while sending to API
    setIsDisabled(true);

    // Send to API
    mutate(title);

    // Enable post button
    setIsDisabled(false);
  };

  // Create a post via API
  const { mutate } = useMutation(
    async (title: string) => await axios.post("api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Send Error
          toast.error(error?.response?.data.message, { id: toastPostId });
        }
      },
      onSuccess: (data) => {
        toast.success("Post has been made!", { id: toastPostId });

        // Invalidate the cache for "posts" query
        queryClient.invalidateQueries("posts");

        // Reset post content
        setTitle("");
      },
    },
  );

  return (
    // Create post content
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Whats on your mind"
          className="p-4 text-lg rounded-md my-3 bg-gray-200"
        ></textarea>
      </div>
      {/* Submit button / char limit area */}
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
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
