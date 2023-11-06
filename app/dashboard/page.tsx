import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";
import Image from "next/image";
import axios from "axios";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <h1 className="text-2xl text-white text-center font-bold">
        Welcome Back {session?.user?.name}
      </h1>
      {/* Header */}
      <div className="w-[100%] h-48 bg-gray-500 animate-pulse rounded-md relative flex items-center justify-center">
        <Image
          src={session?.user?.image || ""}
          width={130}
          height={130}
          alt="Profile picture"
          className="rounded-full "
        />
      </div>
      <MyPosts />
    </main>
  );
}
