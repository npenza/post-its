import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "./Logged";
import Image from "next/image";

// Navbar which uses server session to conditionally render sign in/out button
export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex flex-row justify-between items-center py-8">
      <Link href={"/"}>
        <Image src={"/logo.png"} width={110} height={100} alt="post-it logo" />
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || ""} />}
      </ul>
    </nav>
  );
}
