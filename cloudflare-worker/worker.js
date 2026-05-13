/**
 * RoadLearn Groq Proxy — Cloudflare Worker
 *
 * Secret à configurer dans le dashboard Cloudflare (Settings → Variables → Secrets) :
 *   GROQ_API_KEY   → ta clé API Groq (depuis console.groq.com, gratuit)
 *
 * Ce Worker :
 *   1. Accepte uniquement les requêtes depuis kyle97122.github.io (CORS)
 *   2. Vérifie que le Bearer token est un token Google valide
 *   3. Appelle l'API Groq avec la clé secrète stockée côté Cloudflare
 *   4. Retourne la réponse au frontend
 */

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://kyle97122.github.io',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Vérification du token Google ──────────────────────────────────────────
    const auth = request.headers.get('Authorization') || '';
    if (!auth.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Token manquant. Reconnecte-toi avec Google.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const accessToken = auth.slice(7);

    const tokenVerify = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${encodeURIComponent(accessToken)}`
    );

    if (!tokenVerify.ok) {
      return new Response(JSON.stringify({ error: 'Token expiré ou invalide. Reconnecte-toi avec Google.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const tokenInfo = await tokenVerify.json();
    if (!tokenInfo.email) {
      return new Response(JSON.stringify({ error: 'Token Google non valide.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Extraction du prompt depuis le format Gemini envoyé par le frontend ───
    let prompt = '';
    try {
      const body = await request.json();
      prompt = body?.contents?.[0]?.parts?.[0]?.text || '';
    } catch {
      return new Response(JSON.stringify({ error: 'Corps de requête invalide.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt vide.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Appel à l'API Groq ────────────────────────────────────────────────────
    const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a JSON generator. Output raw JSON only — no markdown, no code blocks, no explanation text. Your response must start with [ and end with ]. Never truncate the array.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1500,
        temperature: 0,
      }),
    });

    const result = await groqResp.text();
    return new Response(result, {
      status: groqResp.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
