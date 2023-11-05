import React from "react";

import Image from "next/image";

interface CommentPostProps {
  message: string;
  name: string;
  avatar: string;
}

export default function CommentPost({
  message,
  name,
  avatar,
}: CommentPostProps) {
  return (
    <div className="bg-neutral-700 my-4 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-white">{name}</h3>
      </div>
      <div className="my-2">
        <p className="break-all text-white">{message}</p>
      </div>
    </div>
  );
}
