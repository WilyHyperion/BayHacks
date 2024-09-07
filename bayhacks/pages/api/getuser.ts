


import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import getuser from "@/lib/getuser";

export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let user = await getuser(req, true);

    if(user){
        user.password = "";
        console.log(user);
        res.status(200).json({ message: "User found", user: user });
    }
    else {
        res.status(404).json({ message: "No user found" });
    }
}