import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const { language = 'en' } = await req.json();
    
    // Create system prompt based on language
    const systemPrompts: Record<string, string> = {
      en: `You are a helpful customer support assistant for Bique Global Enterprise, a professional multi-service B2B company. You help customers with information about services including: General Trading, Import/Export, Food & Beverages, Cars Export, Human Resources, Precious Metals, E-Commerce, Business Management, Crude Oil Trading, Logistics, Agriculture, and Travel. Be friendly, professional, and provide detailed helpful answers. Contact: +971527759591, email: biqueglobalenterprise@gmail.com. Always respond in English.`,
      fr: `Vous êtes un assistant de support client pour Bique Global Enterprise, une entreprise B2B multi-services professionnelle. Vous aidez les clients avec des informations sur les services incluant: Commerce Général, Import/Export, Alimentation & Boissons, Export de Voitures, Ressources Humaines, Métaux Précieux, E-Commerce, Gestion d'Entreprise, Commerce de Pétrole Brut, Logistique, Agriculture et Voyage. Soyez amical, professionnel et fournissez des réponses détaillées. Contact: +971527759591, email: biqueglobalenterprise@gmail.com. Répondez toujours en français.`,
      pt: `Você é um assistente de suporte ao cliente para a Bique Global Enterprise, uma empresa B2B multi-serviços profissional. Você ajuda os clientes com informações sobre serviços incluindo: Comércio Geral, Importação/Exportação, Alimentos & Bebidas, Exportação de Carros, Recursos Humanos, Metais Preciosos, E-Commerce, Gestão de Negócios, Comércio de Petróleo Bruto, Logística, Agricultura e Viagem. Seja amigável, profissional e forneça respostas detalhadas. Contato: +971527759591, email: biqueglobalenterprise@gmail.com. Sempre responda em português.`
    };

    const instructions = systemPrompts[language] || systemPrompts.en;

    console.log('Creating realtime session with language:', language);

    // Request an ephemeral token from OpenAI with full configuration
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "alloy",
        instructions: instructions,
        modalities: ["text", "audio"],
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        input_audio_transcription: {
          model: "whisper-1"
        },
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 800
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Session created successfully");
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating realtime session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
