"use client";

import Image from "next/image";
import React, { useState } from "react";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    PostId: string;
    UserId: string;
  };
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {

  //Toggle Delete
  const [toggle, setToggle] = useState(false);
  let toastPostId: string;
  const queryClient = useQueryClient();

  // Delete Post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: { id } }),
    {
      onError: (error) => {
        setToggle(false);
        toast.error("Could not delete post", { id: toastPostId });
      },
      onSuccess: (data) => {
        setToggle(false);
        queryClient.invalidateQueries("auth-posts");
        toast.success("Post has been deleted!", { id: toastPostId });
      },
    },
  );

  const deletePost = () => {
    toastPostId = toast.loading("Deleting your post", { id: toastPostId });
    mutate(id);
  };

  return (
    <>
      <div className="bg-white my-8 py-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image width={32} height={32} src={avatar} alt="avatar" />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            onClick={() => setToggle(true)}
            className="text-sm font-bold bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
