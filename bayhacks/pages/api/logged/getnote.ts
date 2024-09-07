import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getuser from "@/lib/getuser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = await getuser(req);
  let id = req.body.id;
  console.log("user", user);
  if (user) {
    console.log(req.body);
    console.log(user);
    let note = await Prisma.notes.findMany({
      where: {
        AND: [
          { id: id },
          {
            OR: [
              {
                authorId: user.id,
              },
              {
                shared: {
                  some: {
                    id: user.id,
                  },
                },
              },
            ],
          },
        ],
      },
    });
    console.log(note);
    res.status(200).json({ message: "Notes found", notes: note[0] });
  }
}
