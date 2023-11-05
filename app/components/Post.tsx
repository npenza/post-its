"use client";

import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";

interface PostProps {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments: any;
  singlePost: boolean;
  userId: string;
  currentUser: any;
}

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comments,
  singlePost,
  userId,
  currentUser,
}: PostProps) {
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
        <FollowButton userId={userId} currentUser={currentUser} />
      </div>
      <div className="my-8">
        <p className="break-all text-white">{postTitle}</p>
      </div>
      {!singlePost && (
        <div className="flex cursor-pointer items-center -ml-2">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-200 hover:bg-neutral-600 rounded-lg p-2 transition-none ease-in duration-100">
              {comments?.length}{" "}
              {comments?.length == 1 ? "Comment" : "Comments"}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
