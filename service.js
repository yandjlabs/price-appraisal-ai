import Groq from "groq-sdk";
import "dotenv/config";

const client = new Groq({
	apiKey: process.env.GROQ_API_KEY,
});

export async function getAIResponse(imageUrl) {
	const chatCompletion = await client.chat.completions.create({
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: "What's in this image?",
					},
					{
						type: "image_url",
						image_url: {
							url: imageUrl,
						},
					},
				],
			},
		],
		model: "meta-llama/llama-4-maverick-17b-128e-instruct",
		temperature: 1,
		max_completion_tokens: 1024,
		top_p: 1,
		stream: false,
		stop: null,
	});

	console.log(chatCompletion.choices[0].message.content);
}
