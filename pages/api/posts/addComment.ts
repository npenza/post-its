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
        .json({ message: "Please sign in to make a post." });
    }

    // Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    const comment = req.body.comment;
    const postId = req.body.postId;

    console.log("comment:", comment);
    console.log("postId:", postId);

    // Get Post
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    // Check comment length
    if (comment.length > 300)
      return res.status(403).json({ message: "Please write a shorter post" });
    if (comment.length == 0)
      return res.status(403).json({ message: "Please write a post" });

    if (!post) {
      return res.status(403).json({ message: "Post does not exist" });
    }

    // Create comment
    try {
      const result = await prisma.comment.create({
        data: {
          message: comment,
          userId: prismaUser.id,
          postId: postId,
        },
      });

      res.status(201).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post." });
    }
  }
}
