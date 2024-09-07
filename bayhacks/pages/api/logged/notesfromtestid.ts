

import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    let testid = req.body.id;
    let notes = prisma.notes.findMany({
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
}