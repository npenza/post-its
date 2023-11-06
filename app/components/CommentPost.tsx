import React from "react";

import Image from "next/image";

interface CommentPostProps {
  message: string;
  name: string;
  avatar: string;
}

// This component displays a comment on a post
export default function CommentPost({
  message,
  name,
  avatar,
}: CommentPostProps) {
  return (
    <div className="bg-neutral-700 my-4 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        {/* Author's image */}
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        {/* Author's name */}
        <h3 className="font-bold text-white">{name}</h3>
      </div>
      {/* Comment / Message */}
      <div className="my-2">
        <p className="break-all text-white">{message}</p>
      </div>
    </div>
  );
}
