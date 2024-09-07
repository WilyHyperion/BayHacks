

import { NextApiRequest, NextApiResponse } from "next";
import Prisma from '@/lib/prisma';
import getuser from "@/lib/getuser";

export  default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    let user = await getuser(req, true);
    let id = req.body.id;
    if(user) {
        let classobj = (user as any).classes.find((c: any) => c.id == id);
        console.log(classobj);
        res.status(200).json({ message: "Class found", class: classobj });
    }
  }