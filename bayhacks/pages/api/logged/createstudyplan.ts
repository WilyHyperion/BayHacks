import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI, { ClientOptions } from "openai"
import Prisma from '@/lib/prisma';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
function TimeTill(d: Date) {
    let now = new Date();
    let diff = new Date(d) - now;
    if (diff < 0) {
      return "past"; 
    }
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    let hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    return [days, hours];
  }
  
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let testId = req.body.testId;
    let test = await Prisma.test.findFirst({
        where: {
            id: testId
        }
    });
    let date = test?.testDate;
    let notes = req.body.notes;
    let title = req.body.title;
    console.log(notes);
    let time = TimeTill(date);
    if(time == "past"){
        res.status(400).json({message: "Test has passed"});
        return;
    }
    let timeString = time[0] + " days and " + time[1] + " hours until test";
    const numsplits = Math.max(Math.min(7, parseInt(time[0] as any) + 1), 1);
    let studydays = []
    let notesinput = ""
    for(let i = 0; i < notes.length; i++){
        notesinput += notes[i].title + " " + notes[i].content + " ";
    }
    let topics = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: "You are a advanced summarizing AI. Given some notes written by a student you will create a list of " + numsplits + " topics to study each day. You will respond with just the topics, and split them with a semicolon(;). For example: 'topic1;topic2;topic3'"},
            {role: "user", content: notesinput}
        ] 
    })
    let topicslist = topics?.choices[0]?.message.content?.split(";");
    if(!topicslist){
        res.status(400).json({message: "Invalid notes"});
        return;
    }
    console.log(topicslist);
    for(let i = 0; i < topicslist?.length; i++){
        let guideforday = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {role: "system", content: "You are a advanced summarizing AI. Given a topic, create a short guide for studying it. You will be given notes on the topic, and you will respond with a short guide on how to study it"},
                { role: "user", content: notesinput },
                { role: "user", content: "the topic is " + topicslist[i] }
            ]
            
        })
        let guide = guideforday?.choices[0]?.message.content;
        if(!guide){
            res.status(400).json({message: "Invalid notes"});
            return;
        }
        studydays.push({topic: topicslist[i], guide: guide});
    }
    console.log(studydays);




    res.json({
        time: timeString,
        studyplan: studydays,
        topics: topicslist
    })
}
