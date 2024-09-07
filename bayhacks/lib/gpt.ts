import OpenAI, { ClientOptions } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
const promptsys = `
Sumarize this note 
`
async function summarize(prompt: string): Promise<string> {
    return (await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: promptsys },
            { role: "user", content: prompt }
        ]
    })).choices[0].message.content || ""
}
export default summarize
