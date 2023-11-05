import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    // If the user is not signed in
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign in to follow a user." });
    }

    // Return the current user's information along with the users they are following
    try {
      const result = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          following: true, // Include the following relationship
        },
      });

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error, could not fetch current user." });
    }
  }
}
