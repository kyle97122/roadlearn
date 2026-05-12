/**
 * RoadLearn Gemini Proxy — Cloudflare Worker
 *
 * Secrets à configurer dans le dashboard Cloudflare (Settings → Variables → Secrets) :
 *   GEMINI_API_KEY   → ta clé API Gemini (depuis aistudio.google.com)
 *
 * Ce Worker :
 *   1. Accepte uniquement les requêtes depuis kyle97122.github.io (CORS)
 *   2. Vérifie que le Bearer token est un token Google valide
 *   3. Appelle l'API Gemini avec la clé secrète stockée côté Cloudflare
 *   4. Retourne la réponse au frontend
 */

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://kyle97122.github.io',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Réponse au preflight CORS
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

    // Valider le token auprès de Google
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

    // ── Appel à l'API Gemini ──────────────────────────────────────────────────
    const body = await request.text();
    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }
    );

    const result = await geminiResp.text();
    return new Response(result, {
      status: geminiResp.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
