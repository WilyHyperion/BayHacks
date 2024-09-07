import { NextApiRequest, NextApiResponse } from "next";
import Prisma from '@/lib/prisma';
import getuser from "@/lib/getuser";

export  default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    let user = await getuser(req);
    if(user) {
        let text = req.body.text;
        let note = await Prisma.notes.create({
            data: {
                title: req.body.title,
                content: text,
                author: {
                    connect: {
                        id: user.id
                    }
                },
                Class : {
                    connect: {
                        Id: req.body.classId
                    }
                }

            }
        });
        res.status(200).json({ message: "Note created", id : note.id });
    }
    else {
        res.status(404).json({ message: "No user found" });
    } 
    
  }