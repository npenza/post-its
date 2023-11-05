import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    // If user is not signed in
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign in to follow a user." });
    }

    // Get current user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    //get user to be followed
    const followingUserID = req.body.id;
    const prismaFollowingUser = await prisma.user.findUnique({
      where: { id: followingUserID },
    });

    if (!prismaFollowingUser) {
      res.status(403).json({ err: "User not found." });
    }

    // TODO: Check user isn't already following

    // Check user ins't trying to follow themself
    if (prismaUser?.id === prismaFollowingUser?.id) {
      res.status(403).json({ err: "You cannot follow yourself." });
    }

    // Create connection
    try {
      const result = await prisma.follows.create({
        data: {
          followerId: prismaUser?.id,
          followingId: prismaFollowingUser?.id,
        },
      });

      res.status(201).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post." });
    }
  }
}
