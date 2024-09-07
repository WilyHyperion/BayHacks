import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '@/lib/prisma';
import getuser from "@/lib/getuser";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let user = await getuser(req);
    if(user) {
        let classobj = await Prisma.class.findFirst({
            where: {
                AND: [
                    {Id: req.body.classid},
                    {userId: user.id}
                ]
            }
        });
        console.log(req.body);
        await Prisma.test.create({
            data: {
                name: req.body.name,
                testDate: req.body.testDate,
                class: {
                    connect: {
                        Id: classobj?.Id
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                },
                    
            }
        });
    }
    res.status(200).json({message: "Test added"});
}