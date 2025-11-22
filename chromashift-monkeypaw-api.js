// chromashift-monkeypaw-api.js
// Monkey Paw System API Integration for ChromaShift Dreamscape

let conversationHistory = [];

export async function getTwistedWish(wishText) {
    const systemPrompt = `You are a logical, malevolent intelligence that grants wishes. Your purpose is to fulfill the user's wish to the letter, but to interpret the wording and intent in a way that produces the most devastating, logically consistent negative outcome. Your responses must adhere to the laws of cause and effect. Do not invent magical, conceptual, or reality-breaking phenomena. The consequence must be a plausible result of the wish being granted within the real world. Your methods: Ironic Reversal, Semantic Literalism, Conservation of Fortune, Pyrrhic Victory, Unforeseen Side-Effects, The Fine Print. IMPORTANT: Your response must ONLY contain the narrative describing the outcome. Do NOT include phrases like "The wish is granted," or describe the paw moving. Go directly into the consequence. The tone should be that of a detached, clinical report of events.`;

    const userMessage = {
        role: "user",
        content: `The user's wish is: "${wishText}". Grant it.`,
    };

    conversationHistory.push(userMessage);
    conversationHistory = conversationHistory.slice(-10);

    try {
        // Ensure WebSim is available
        const websim = window.ensureWebsimAvailable ? window.ensureWebsimAvailable() : null;
        if (!websim || !websim.chat) {
            throw new Error('WebSim API not available for wish processing');
        }

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                ...conversationHistory,
            ],
        });

        const response = completion.content || completion;
        conversationHistory.push(completion);
        return response || "The paw twitches, but nothing happens...";
    } catch (error) {
        console.error('Error getting twisted wish:', error);
        return "A foul energy recoils from the paw...";
    }
}

export async function getFixedWish(wishText) {
    const systemPrompt = `You are an expert supernatural contract lawyer. Your goal is to help a user make a wish to a malevolent entity (a Monkey's Paw) without it backfiring. The user will provide a wish. Your task is to analyze it for any ambiguity, loopholes, or undefined terms that could be exploited. Then, rewrite the wish to be as precise, specific, and legally 'airtight' as possible, while preserving the user's original intent. The output must ONLY be the revised wish text. Do not add any commentary, explanations, or introductory phrases like 'Here is the revised wish:'.`;

    try {
        const websim = window.ensureWebsimAvailable ? window.ensureWebsimAvailable() : null;
        if (!websim || !websim.chat) {
            throw new Error('WebSim API not available for wish fixing');
        }

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: `The wish is: "${wishText}". Analyze it and rewrite it to be safer.`,
                },
            ],
        });

        return completion.content || completion || wishText;
    } catch (error) {
        console.error('Error fixing wish:', error);
        return wishText;
    }
}

export async function getSummary(consequence) {
    const systemPrompt = `You are a helpful summarizer. The user will provide a dark, narrative outcome from a Monkey's Paw wish. Your task is to summarize the outcome and its ironic twist in a single, simple, easy-to-understand sentence. Start with 'In short:'.`;

    try {
        const websim = window.ensureWebsimAvailable ? window.ensureWebsimAvailable() : null;
        if (!websim || !websim.chat) {
            throw new Error('WebSim API not available for summary');
        }

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: `Summarize this: "${consequence.replace(/<br>/g, ' ')}"`,
                },
            ],
        });

        return completion.content || completion || "In short: The wish had unexpected consequences.";
    } catch (error) {
        console.error('Error getting summary:', error);
        return "In short: The wish had unexpected consequences.";
    }
}

export async function generateWishForPlayer() {
    const systemPrompt = `You are a desperate human making a wish to the monkey's paw. Generate a realistic, heartfelt wish that someone might make in a moment of desperation, hope, or need. The wish should be specific enough to have clear consequences but have potential loopholes or ambiguities. Make it emotionally compelling. Examples: "I wish my terminally ill daughter would be healthy again", "I wish I could be successful and wealthy", "I wish my ex-wife would love me again". Return ONLY the wish text, no quotes or extra formatting.`;

    try {
        const websim = window.ensureWebsimAvailable ? window.ensureWebsimAvailable() : null;
        if (!websim || !websim.chat) {
            throw new Error('WebSim API not available for wish generation');
        }

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: "Generate a wish for the monkey's paw.",
                },
            ],
        });

        return completion.content || completion || "I wish for happiness.";
    } catch (error) {
        console.error('Error generating wish:', error);
        return "I wish for a better life.";
    }
}

export async function evaluateConsequence(originalWish, playerConsequence) {
    const systemPrompt = `You are evaluating how well a player performed as a malevolent monkey's paw. Rate their twisted consequence on a scale of 0-100 based on:

1. LOGICAL CONSISTENCY (25 points): Does the consequence logically follow from the wish? No magic or impossible phenomena?
2. MALEVOLENT INTERPRETATION (25 points): How cleverly twisted is the interpretation? Does it technically fulfill the wish while being devastating?
3. EMOTIONAL IMPACT (25 points): How emotionally devastating would this be for the wisher?
4. REALISM (25 points): Could this actually happen in the real world? No supernatural elements beyond the paw itself?

Respond with JSON only:
{
  "score": number (0-100),
  "feedback": "Brief explanation of strengths and areas for improvement",
  "grade": "letter grade A-F"
}`;

    try {
        const websim = window.ensureWebsimAvailable ? window.ensureWebsimAvailable() : null;
        if (!websim || !websim.chat) {
            throw new Error('WebSim API not available for evaluation');
        }

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: `Original wish: "${originalWish}"\n\nPlayer's consequence: "${playerConsequence}"\n\nEvaluate this consequence.`,
                },
            ],
            json: true,
        });

        const response = completion.content || completion;
        return JSON.parse(response);
    } catch (error) {
        console.error('Error evaluating consequence:', error);
        return {
            score: 50,
            feedback: "Unable to evaluate. Try to be more logically malevolent.",
            grade: "C"
        };
    }
}

// Dream-related monkey paw functions
export async function generateDreamWish(wishText) {
    // Generate a dream-contextualized wish with surreal elements
    const systemPrompt = `You are the monkey's paw in a surreal dreamscape. Transform this wish to fit a dream logic where reality is fluid and wish-granting follows surreal rather than malevolent logic. The dream version should preserve the core intent while making it oddly poetic and dream-like. Keep it to 1-2 sentences maximum.`;

    try {
        const websim = window.ensureWebsimAvailable ? window.ensureWebsimAvailable() : null;
        if (!websim || !websim.chat) {
            return `${wishText} (echoed in the dream's whispers)`;
        }

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: `Transform this wish for dream logic: "${wishText}"`,
                },
            ],
        });

        return completion.content || completion || `${wishText} (the dream remembers)`;
    } catch (error) {
        console.error('Error generating dream wish:', error);
        return `${wishText} (echoed in the dream's whispers)`;
    }
}

export async function interpretDreamConsequence(consequence) {
    // Interpret the consequence in dream terms for ChromaShift
    const systemPrompt = `You are interpreting a monkey's paw consequence in the context of a surreal dreamscape. Transform the consequence into something that feels magical but disturbing, fitting the tone of ChromaShift's hyper-surreal aesthetic. Focus on dream-logic interpretations where the consequence creates new surreal scenes or experiences. Keep it vivid and disturbing but grounded in dream imagery.`;

    try {
        const websim = window.ensureWebsimAvailable ? window.ensureWebsimAvailable() : null;
        if (!websim || !websim.chat) {
            return `The dream manifests the consequence: ${consequence}`;
        }

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: `Interpret this consequence in dream terms: "${consequence}"`,
                },
            ],
        });

        return completion.content || completion || `The dream manifests: ${consequence}`;
    } catch (error) {
        console.error('Error interpreting dream consequence:', error);
        return `The dream manifests: ${consequence}`;
    }
}