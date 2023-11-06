"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type User = {
  image: string;
};

// Component for when a user is logged in
export default function Logged({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      {/* Log out button via next/auth */}
      <button
        onClick={() => signOut()}
        className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
      {/* User Image */}
        <Image
          width={64}
          height={64}
          src={image ? image : ""}
          alt="User Icon"
          priority
          className="rounded-full"
        />
      </Link>
    </li>
  );
}
