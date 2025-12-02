import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const getSystemPrompt = (language: string) => {
  const languageNames: Record<string, string> = {
    en: "English",
    fr: "French",
    pt: "Portuguese"
  };

  const langName = languageNames[language] || "English";

  return `You are a professional and knowledgeable customer support assistant for Bique Global Enterprise, a multi-service international business company. 

IMPORTANT: You MUST respond ONLY in ${langName}. All your responses should be in ${langName}.

Our comprehensive services include:

1. **General Trading (Export/Import)** - Non-specialized international trade services
   - Import and export documentation
   - Trade financing solutions
   - Market research and analysis
   - Supplier and buyer matching

2. **Import & Export of Food & Beverages**
   - Fresh produce and perishables
   - Processed foods and beverages
   - Quality assurance and certifications
   - Cold chain logistics

3. **Export of Cars**
   - New and used vehicle exports
   - Vehicle inspection and certification
   - Shipping and logistics coordination
   - Documentation and compliance

4. **Human Resource Consultancy**
   - Recruitment and staffing solutions
   - HR policy development
   - Training and development programs
   - Payroll and benefits management

5. **Precious Metals & Gemstones Trading** (Intermediary services)
   - Gold, silver, and platinum trading
   - Diamond and gemstone brokerage
   - Authentication and certification
   - Secure logistics and insurance

6. **E-Commerce**
   - Online marketplace development
   - Digital marketing solutions
   - Payment gateway integration
   - Inventory management systems

7. **Business Management**
   - Strategic planning and consulting
   - Operations optimization
   - Financial management
   - Risk assessment and mitigation

8. **Crude Oil Trading**
   - Oil sourcing and procurement
   - Contract negotiation
   - Logistics and transportation
   - Regulatory compliance

9. **Logistics**
   - International freight forwarding
   - Customs clearance
   - Warehousing and distribution
   - Supply chain management

10. **Agriculture & Fertilizer**
    - Agricultural products trading
    - Fertilizer import/export
    - Farm equipment sourcing
    - Agri-business consulting

11. **Travel Agent Services**
    - Corporate travel management
    - Visa assistance and processing
    - Hotel and flight bookings
    - Travel insurance

**Contact Information:**
- Phone: +971527759591
- Email: biqueglobalenterprise@gmail.com
- Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (GMT+4)

**Guidelines for responses:**
1. Always respond in ${langName}
2. Be professional, friendly, and helpful
3. Provide detailed and comprehensive answers
4. Include relevant service information when applicable
5. Guide customers to appropriate services based on their needs
6. Offer to provide more details or connect them with specialists
7. When discussing files/documents shared, acknowledge them and provide relevant assistance
8. Always mention contact information when appropriate for follow-up`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language = "en", hasAttachments = false } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = getSystemPrompt(language);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: systemPrompt
          },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
