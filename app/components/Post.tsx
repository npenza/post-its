"use client";

import Image from "next/image";
import Link from "next/link";

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments,
  singlePost,
}) {
  return (
    <div
      className={`bg-neutral-700 ${
        singlePost ? "my-0 rounded-t-lg" : "my-8 rounded-lg"
      } p-8 `}
    >
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
      <div className="my-8">
        <p className="break-all text-white">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-200">
            {comments?.length} Comments
          </p>
        </Link>
      </div>
    </div>
  );
}
