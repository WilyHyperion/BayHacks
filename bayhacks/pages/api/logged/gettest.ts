

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
        console.log(req.body);
        let tests = user.tests.find((c: any) => c.id == id);
        console.log(tests);
        res.status(200).json({ message: "Class found", test: tests });
    }
  }