

import { NextApiRequest, NextApiResponse } from "next";
import Prisma from '@/lib/prisma';
import getuser from "@/lib/getuser";

export  default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    let user = await getuser(req, true);
    let id = req.body.id;
    console.log(id, 'user');
    if(user) {
      let classs = await Prisma.class.findFirst({
        where: {
          Id: id,
        },
        include: {
          tests: true,
          Notes: true
        }
        
      });
      res.status(200).json({ message: "Class found", class: classs });
    }
  }