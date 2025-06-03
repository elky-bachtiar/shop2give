import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { openai } from "npm:@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "npm:ai";
import { Pica } from "npm:@picahq/ai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const campaigns = [
  {
    title: "With Love for the Gittner Family",
    description: "The Gittner family is facing a medical emergency and needs support from our community.",
    goal: 10000,
    raised: 43565,
    location: "United States"
  },
  {
    title: "Royal Mission School – Sifra Bachtiar",
    description: "17-year-old Sifra seeks support for her education at the Royal Mission School.",
    goal: 7000,
    raised: 4500,
    location: "Netherlands"
  },
  {
    title: "Hope for Hannah's Heart",
    description: "Help support Hannah's critical heart surgery and recovery journey.",
    goal: 25000,
    raised: 18750,
    location: "Canada"
  }
];

const campaignExamples = campaigns.map(campaign => ({
  title: campaign.title,
  description: campaign.description,
  goal: campaign.goal,
  raised: campaign.raised,
  location: campaign.location
}));

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    const picaSecretKey = Deno.env.get("PICA_SECRET_KEY");

    if (!openaiApiKey) throw new Error("OPENAI_API_KEY is not set");
    if (!picaSecretKey) throw new Error("PICA_SECRET_KEY is not set");

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is required");
    }

    const pica = new Pica(picaSecretKey, {
      connectors: ["*"],
      identity: "campaign_assistant",
      identityType: "assistant",
      context: {
        role: "You are a helpful campaign creation assistant for Shop2Give, a faith-driven crowdfunding platform.",
        examples: campaignExamples,
        guidelines: `
          - Help users create compelling campaign descriptions
          - Suggest appropriate fundraising goals based on similar campaigns
          - Provide tips for campaign success
          - Keep responses focused on campaign creation and fundraising
          - Always maintain a supportive and encouraging tone
          - Reference similar successful campaigns when relevant
        `
      }
    });

    const systemPrompt = await pica.generateSystemPrompt();

    const result = streamText({
      model: openai("gpt-4.1"),
      system: systemPrompt,
      tools: { ...pica.oneTool },
      messages: convertToCoreMessages(messages),
      maxSteps: 10
    });

    return result.toDataStreamResponse({ headers: corsHeaders });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message || "Internal Server Error"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});