

import { NextApiRequest, NextApiResponse } from "next";
import Prisma from '@/lib/prisma';
import getuser from "@/lib/getuser";

export  default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    let user = await getuser(req, true) as any;
    let id = req.body.id;
    if(user) {
        let classs = await Prisma.test.findFirst({
            where: {
                id: id,
            },
            include: {
                class: true,
            }
            
        });
        res.status(200).json({ message: "Class found", test: classs });
    }
  }