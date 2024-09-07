

import { NextApiRequest, NextApiResponse } from 'next';
import summarize from '@/lib/gpt';
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let note = req.body.text;
    let title = req.body.title;
    let summ = await summarize(title + ":" + note);
    res.status(200).json({ message: "Summarized", summary: summ });
}