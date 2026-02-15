const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function fixBug() {
    const payloadStr = process.env.CLIENT_PAYLOAD;
    if (!payloadStr) {
        console.error("No payload provided in CLIENT_PAYLOAD env variable");
        process.exit(1);
    }

    const payload = JSON.parse(payloadStr);
    const { error_message, stack_trace, file_path } = payload;

    console.log(`Analyzing error: ${error_message}`);
    console.log(`Target file: ${file_path}`);

    const absolutePath = path.resolve(process.cwd(), file_path);
    if (!fs.existsSync(absolutePath)) {
        console.error(`File NOT found: ${absolutePath}`);
        process.exit(1);
    }

    const fileContent = fs.readFileSync(absolutePath, "utf-8");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
I have a Next.js application that crashed with the following error:

Error Message: ${error_message}
Stack Trace: ${stack_trace}

The error seems to be in the file: ${file_path}

Here is the current content of that file:

\`\`\`
${fileContent}
\`\`\`

Please provide the FULL content of the file with the bug fixed. 
Return ONLY the code, no markdown wrappers, no explanations. 
If you cannot fix it, return the original code.
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let fixedCode = response.text();

        // Clean up potential markdown blocks if Gemini ignored the instruction
        fixedCode = fixedCode.replace(/^```[a-z]*\n/i, "").replace(/\n```$/m, "");

        if (fixedCode && fixedCode.trim().length > 0) {
            fs.writeFileSync(absolutePath, fixedCode);
            console.log(`Successfully applied fix to ${file_path}`);
        } else {
            console.log("Gemini returned empty fix. No changes applied.");
        }
    } catch (error) {
        console.error("Error communicating with Gemini:", error);
        process.exit(1);
    }
}

fixBug();
