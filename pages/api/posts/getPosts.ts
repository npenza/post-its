import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // Fetch all posts
    try {
      const data = await prisma.post.findMany({
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
      res.status(403).json({ err: "Error while fetching posts." });
    }
  }
}
