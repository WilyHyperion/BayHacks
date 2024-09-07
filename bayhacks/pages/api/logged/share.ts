import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getuser from "@/lib/getuser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let note = req.body.id;
  let user = await getuser(req);
  if (user) {
    let noteobj = await Prisma.notes.findFirst({
      where: {
        id: note,
        authorId: user.id,
      },
    });
    if (noteobj) {
        console.log(req.body.user, 'name');
        let toshare = await Prisma.user.findFirst({
            where: {
                name: req.body.user,
            },
        });
        console.log(toshare, 'toshare');
        if(!toshare){
            res.status(404).json({ message: "User not found" });
            return;
        }
      await Prisma.notes.update({
        where: {
          id: noteobj.id,
        },
        data: {
          shared: {
            connect: {
                id: toshare.id,
            },
          },
        },
      });
      res.status(200).json({ message: "Note shared" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } else {
    res.status(404).json({ message: "No user found" });
  }
}
