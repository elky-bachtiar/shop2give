import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface CategoryKeywords {
  [key: string]: string[];
}

const categoryKeywords: CategoryKeywords = {
  medical: ['surgery', 'treatment', 'hospital', 'cancer', 'medical', 'health', 'operation', 'therapy'],
  education: ['school', 'tuition', 'university', 'student', 'education', 'scholarship', 'learning', 'study'],
  mission: ['mission', 'church', 'ministry', 'faith', 'bible', 'christian', 'missionary', 'gospel'],
  community: ['community', 'neighborhood', 'local', 'family', 'support', 'help', 'assistance'],
  emergency: ['emergency', 'urgent', 'crisis', 'disaster', 'immediate', 'help']
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const tokens = text.toLowerCase().split(/\s+/);
    let maxMatches = 0;
    let suggestedCategory = null;
    let matchedKeywords: string[] = [];

    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      const matches = keywords.filter(keyword => 
        tokens.some(token => token.includes(keyword))
      );

      if (matches.length > maxMatches) {
        maxMatches = matches.length;
        suggestedCategory = category;
        matchedKeywords = matches;
      }
    });

    if (!suggestedCategory || maxMatches === 0) {
      return new Response(
        JSON.stringify(null),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const confidence = Math.min((maxMatches / 3) * 100, 100);

    return new Response(
      JSON.stringify({
        category: suggestedCategory,
        confidence,
        keywords: matchedKeywords
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});