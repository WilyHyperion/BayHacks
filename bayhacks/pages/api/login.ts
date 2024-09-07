

import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';

import { compareSync } from "bcrypt-ts";
export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let user = await Prisma.user.findFirst({
    where: {
      name: req.body.username,
    }
  });
  if(user){
    if (user.password &&  compareSync( req.body.password + user.salt, user.password)) {
      res.setHeader("Set-Cookie", `token=${user.password}; Path=/;  SameSite=Strict; Max-Age=31536000`);
      res.status(200).json({ message: "Logged in" });
    }
    else {
      res.status(401).json({ message: "Incorrect password" });
    }
  }
  else {
    res.status(404).json({ message: "No user with that username" });
  }
}