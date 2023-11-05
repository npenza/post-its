import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      // Get current user
      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          following: {
            select: {
              followingId: true,
            },
          },
        },
      });

      if (!prismaUser) {
        return res.status(404).json({ error: "User not found" });
      }
      // Fetch posts from users in the "following" array
      const data = await prisma.post.findMany({
        where: {
          userId: {
            in: prismaUser.following.map((f) => f.followingId),
          },
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (data.length === 0) {
        // Return an empty response with a 200 status code
        return res.status(200).json([]);
      }

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Error while fetching posts." });
    }
  }
}
