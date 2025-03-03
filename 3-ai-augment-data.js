import fs from "fs";
import OpenAI from "openai";
import {PHASE_2_MALTS, PHASE_3_AUGMENTED} from "./constants/filenames.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const operatorMessage = `
You are responsible for extracting malt information from a brief description.
- the output should be valid JSON similar to {"color": {"ebc": X, "lovibond": X, "srm": X}, "maxUsage": X}
- do not extract anything beyond specified
- only add color values listed in the description
- maxUsage should be between 0 and 1
- if any value is a range, change de number to {min: Y, max: X}
- if color or maxUsage is not available, use null
- only add color values that are present
- do not format the message
`

async function extractDescriptionInformation(maltDescription) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
            "role": "system",
            "content": [{"type": "text", "text": operatorMessage.trim()}]
        }, {
            "role": "user",
            "content": [{"type": "text", "text": maltDescription}]
        }],
        response_format: {"type": "text"},
        temperature: 1,
        max_completion_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    return JSON.parse(response.choices[0].message.content);
}


const raw = fs.readFileSync(PHASE_2_MALTS);
const malts = JSON.parse(raw);

console.log(malts)

const refreshedData = [];
for await (const malt of malts) {
    console.log('Crawling URL', malt);
    const data = await extractDescriptionInformation(malt.description);
    console.log(data)
    refreshedData.push({
        ...malt,
        ...data,
    });
}

fs.writeFileSync(PHASE_3_AUGMENTED, JSON.stringify(refreshedData, null, 2))