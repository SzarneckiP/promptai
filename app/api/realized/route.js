import Prompt from "../../../models/prompt";
import { connectToDB } from "../../../utils/database";

export const PATCH = async (req, { params }) => {
    const { id, prompt, tag, edited, createdOn, realized } = await req.json()
    console.log(params)
    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(id)
        console.log('existingPrompt: ', existingPrompt)

        if (!existingPrompt) return new Response('Prompt not found', { status: 404 })

        existingPrompt._id = id
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        existingPrompt.createdOn = createdOn
        existingPrompt.edited = edited
        existingPrompt.realized = realized

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response('Failed to update prompt', { status: 500 })
    }
}