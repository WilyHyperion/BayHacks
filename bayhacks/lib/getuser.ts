
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';

export default async function getuser(req : NextApiRequest, all = false) {
    console.log(req.cookies.token);
    if(all){
     return await Prisma.user.findFirst({
        where: {
            password: req.cookies.token || "",
        },
        include: {
            classes: {
                include: {
                    tests: true,
                    Notes: true
                }
            }, 
            tests: true,
        },
    });   
    }
    let user = await Prisma.user.findFirst({
        where: {
            password: req.cookies.token || "",

        }
    });
    return user;
}