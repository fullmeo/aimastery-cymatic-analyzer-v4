# 🧪 AIMastery Cymatic Analyzer V4 - Testing Guide

## Local Testing Options

### Option 1: Unit Tests (✅ Recommended for Quick Testing)

Run the comprehensive test suite that validates core functionality:

```bash
node test-api.cjs
```

**What it tests:**
- ✅ FFT.js library import
- ✅ OpenAI library import
- ✅ Stripe library import
- ✅ Frequency to note conversion (440Hz → A4, etc.)
- ✅ Vincian score calculation algorithm
- ✅ Hash function for demo data
- ✅ Environment variable checking

**Expected output:**
```
✅ Core libraries: FFT.js, OpenAI, Stripe - All importable
✅ Audio analysis functions: Working correctly
✅ Vincian scoring algorithm: Valid score ranges (30-100)
✅ Frequency to note conversion: Accurate
```

---

### Option 2: Interactive HTML Demo (✅ Recommended for Visual Testing)

Open the interactive demo in your browser:

```bash
# Option A: Open directly in browser
open test-demo.html  # macOS
xdg-open test-demo.html  # Linux
start test-demo.html  # Windows

# Option B: Use a simple HTTP server
python3 -m http.server 8000
# Then visit: http://localhost:8000/test-demo.html
```

**What it tests:**
- 🎵 Core audio analysis functions
- 📊 Cymatic analysis simulation with custom frequencies
- ✨ Sacred frequency testing (432Hz, 528Hz, 741Hz)
- 🎼 Frequency to note conversion
- 📈 Vincian scoring visualization

**Features:**
- Interactive frequency input (80Hz - 4000Hz)
- Preset sacred frequencies for quick testing
- Real-time analysis results
- Tier-based feature simulation (free vs premium)

---

### Option 3: Vercel Development Server (⚠️ Requires Authentication)

For full API testing with the actual serverless functions:

```bash
# 1. Login to Vercel CLI
vercel login

# 2. Start development server
npm run dev

# 3. Visit http://localhost:3000
```

**What it provides:**
- Full API endpoint testing
- Real serverless function execution
- Hot reload on file changes
- Production-like environment

---

## Testing Different Components

### 1. Testing Audio Analysis Logic

```bash
node test-api.cjs
```

This validates:
- FFT-based frequency analysis
- Harmonic detection algorithms
- Vincian scoring (30-100 range)
- Sacred frequency detection (432Hz, 528Hz, etc.)
- Golden ratio harmonic relationships

### 2. Testing Frontend UI

Open `test-demo.html` in your browser to test:
- Landing page design elements
- Interactive demo functionality
- Form validation
- Response display formatting

To test the actual landing page:
```bash
# Serve the public directory
python3 -m http.server 8000 --directory public
# Visit: http://localhost:8000/
```

### 3. Testing API Endpoints

#### Without Vercel CLI (using curl/HTTPie):

**Test Analyze Endpoint (mock):**
```bash
# This won't work without a server, but shows the expected format:
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "audioData": "test_sample_123",
    "userId": "test_user",
    "tier": "free"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "analysis": {
    "fundamentalFrequency": 440,
    "vincianScore": 75,
    "musicalNote": "A4",
    "harmonics": [...],
    "cymaticPattern": {...},
    "complexity": "medium"
  },
  "content": {
    "instagram": {...}
  }
}
```

---

## Environment Variables for Testing

### Required for Full Testing:

Create `.env.local` file:

```bash
# Copy the example
cp .env.example .env.local

# Edit with real values
nano .env.local
```

**Minimum required variables:**

```env
# For OpenAI content generation (premium users)
OPENAI_API_KEY=sk-your-key-here

# For Stripe checkout testing
STRIPE_SECRET_KEY=sk_test_your-key-here
STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here

# For webhook verification
WEBHOOK_SECRET=whsec_your-secret-here

# Environment
NODE_ENV=development
```

### Testing Without API Keys:

The app will work in **fallback mode** without real API keys:
- ✅ Audio analysis still works (FFT-based)
- ✅ Vincian scoring works
- ✅ Template-based content generation
- ❌ AI-generated content (needs OpenAI key)
- ❌ Stripe checkout (needs Stripe keys)

---

## Test Scenarios

### Scenario 1: Free User Analysis
```javascript
{
  "audioData": "demo_test",
  "userId": "free_user_123",
  "tier": "free"
}
```
**Expected:**
- Returns analysis with Vincian score
- Instagram content only (templates)
- No LinkedIn/TikTok/YouTube
- Watermark applied

### Scenario 2: Premium User Analysis
```javascript
{
  "audioData": "demo_premium",
  "userId": "premium_user_456",
  "tier": "social_pack"
}
```
**Expected:**
- Full analysis with score
- AI-generated Instagram, LinkedIn, TikTok content
- YouTube metadata
- No watermark

### Scenario 3: Sacred Frequency (432Hz)
```javascript
{
  "audioData": "432hz_sample",
  "userId": "test_user",
  "tier": "free"
}
```
**Expected:**
- Vincian score: 80-95 (sacred frequency bonus)
- Note: ~A4 (depends on exact frequency)
- 4+ harmonics detected
- High quality rating

### Scenario 4: Rate Limiting
Make 31+ requests from same IP within 1 minute:
```bash
for i in {1..35}; do
  curl -X POST http://localhost:3000/api/analyze \
    -H "Content-Type: application/json" \
    -d '{"audioData":"test"}' &
done
```
**Expected:**
- First 30 requests: Success (200)
- Request 31+: Rate limit error (429)

---

## Testing Checklist

### ✅ Core Functionality
- [ ] FFT.js imports correctly
- [ ] Frequency to note conversion works
- [ ] Vincian scoring produces valid range (30-100)
- [ ] Sacred frequencies get bonus points
- [ ] Harmonic detection works
- [ ] Golden ratio detection works

### ✅ API Endpoints
- [ ] `/api/analyze` returns proper JSON
- [ ] Rate limiting works (30 req/min)
- [ ] CORS headers set correctly
- [ ] Input validation catches bad data
- [ ] Error handling returns proper status codes

### ✅ Frontend
- [ ] Landing page loads and displays correctly
- [ ] Demo section works (test button functional)
- [ ] Success page displays properly
- [ ] Cancel page displays properly
- [ ] Responsive design works on mobile

### ✅ Security
- [ ] CORS restricted to allowed domains
- [ ] Rate limiting active
- [ ] Input validation works
- [ ] Environment variables validated
- [ ] Webhook signature verification works

### ✅ Content Generation
- [ ] Free tier gets template content
- [ ] Premium tier gets AI content (with API key)
- [ ] Fallback works if OpenAI fails
- [ ] Hashtags generated correctly
- [ ] YouTube metadata formatted properly

---

## Known Limitations in Local Testing

### Cannot Test Locally:
1. **Real Vercel serverless deployment** - Needs `vercel dev` with auth
2. **Actual Stripe checkout flow** - Needs real Stripe keys
3. **Webhook events** - Needs publicly accessible URL
4. **Production CORS** - Development uses wildcard
5. **Real audio file processing** - Demo uses simulated data

### Can Test Locally:
1. ✅ All analysis algorithms
2. ✅ Scoring calculations
3. ✅ Content generation templates
4. ✅ Frontend UI/UX
5. ✅ Error handling logic
6. ✅ Rate limiting logic

---

## Deployment Testing

### After deploying to Vercel:

1. **Test Live API:**
```bash
curl -X POST https://your-app.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"audioData":"live_test","userId":"deploy_test"}'
```

2. **Test Landing Page:**
Visit: `https://your-app.vercel.app/`

3. **Test Stripe Checkout:**
- Click "Commencer l'essai gratuit" button
- Should redirect to Stripe checkout (if configured)

4. **Test Webhooks:**
```bash
# Using Stripe CLI
stripe listen --forward-to https://your-app.vercel.app/api/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

---

## Troubleshooting

### Issue: "require is not defined"
**Solution:** Files use ES modules (`"type": "module"` in package.json). API files should be CommonJS for Vercel.

### Issue: Rate limit errors immediately
**Solution:** Clear the in-memory rate limit cache or wait 1 minute.

### Issue: CORS errors in browser
**Solution:** In development, CORS is open. In production, add your domain to `ALLOWED_ORIGINS`.

### Issue: OpenAI errors
**Solution:** Set `OPENAI_API_KEY` in `.env.local` or app will use fallback templates.

### Issue: Stripe checkout fails
**Solution:** Set all Stripe keys in environment variables and create price IDs in Stripe dashboard.

---

## Performance Testing

### Load Testing:
```bash
# Install Apache Bench
apt-get install apache2-utils

# Test with 100 requests, 10 concurrent
ab -n 100 -c 10 -T 'application/json' \
  -p test_api.json \
  http://localhost:3000/api/analyze
```

### Expected Performance:
- Cold start: ~200-500ms (Vercel serverless)
- Warm requests: <100ms (analysis only)
- With OpenAI: +2-5 seconds
- Rate limit: 30 req/min per IP

---

## Next Steps

1. ✅ Run `node test-api.cjs` to validate core functionality
2. ✅ Open `test-demo.html` to test UI interactively
3. ⚠️ Set environment variables for full testing
4. 🚀 Deploy to Vercel for production testing
5. 🔧 Configure Stripe webhooks
6. 📊 Monitor with Vercel Analytics

---

**Last Updated:** 2025-11-13
**Version:** 4.0.0
