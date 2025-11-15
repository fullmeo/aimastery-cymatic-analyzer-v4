const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// CORS configuration - restrict to specific domains
const ALLOWED_ORIGINS = [
  'https://scorescout.eu',
  'https://www.scorescout.eu',
  'https://aimastery-cymatic-analyzer-v4.vercel.app',
  ...(process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean),
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
];

module.exports = async (req, res) => {
  // CORS with origin validation
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { priceId, userId, tier = 'social_pack' } = req.body;

    // Input validation
    if (!priceId || typeof priceId !== 'string') {
      return res.status(400).json({ error: 'Invalid priceId' });
    }
    if (!userId || typeof userId !== 'string' || userId.length > 100) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    if (!['social_pack', 'holographic', 'premium'].includes(tier)) {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    console.log(`💳 Creating checkout for user: ${userId.substring(0, 8)}... (tier: ${tier})`);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'https://scorescout.eu/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://scorescout.eu/cancel',
      client_reference_id: userId,
      metadata: { tier, source: 'aimastery_v4' }
    });

    res.json({ success: true, url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Payment session failed' });
  }
};
