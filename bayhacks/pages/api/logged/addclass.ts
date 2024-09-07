import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '@/lib/prisma';
import getuser from "@/lib/getuser";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let user = await getuser(req);
    if(user) {
        await Prisma.class.create({
            data: {
                name: req.body.name,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });
    }
}