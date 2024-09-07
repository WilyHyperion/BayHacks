import OpenAI, { ClientOptions } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
const prompt = `
You are a advanced summarizing AI. Given some notes written by a student, create a short outline of the major points`
async function summarize(prompt: string): Promise<string> {
    return (await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: prompt }
        ]
    })).choices[0].message.content || ""
}
export default summarize
