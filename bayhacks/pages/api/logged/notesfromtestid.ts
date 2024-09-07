

import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let testid = req.body.id;
    let notes =await  prisma.notes.findMany({
        where: {
            Class: {
                tests: {
                    some: {
                        id: testid
                    }
                }
            }
        }
    });
    console.log(notes);
    res.status(200).json({message: "Notes found", notes: notes});
}