const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { audioData, analysisType = 'social_pack', userId = 'anonymous', tier = 'free' } = req.body;

    // VRAIE analyse cymatique (améliore ça)
    const analysis = performCymaticAnalysis(audioData);
    
    // Générer contenu IA
    const content = await generateSocialMediaPack(analysis, tier);

    res.json({
      success: true,
      analysis,
      content,
      metadata: { generatedAt: new Date().toISOString(), version: '4.0.0' }
    });

  } catch (error) {
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
};

function performCymaticAnalysis(audioData) {
  // À améliorer avec ton algo réel
  const freq = 440 + Math.random() * 400;
  return {
    fundamentalFrequency: freq,
    vincianScore: Math.floor(60 + Math.random() * 40),
    musicalNote: frequencyToNote(freq),
    timestamp: new Date().toISOString()
  };
}

async function generateSocialMediaPack(analysis, tier) {
  const prompt = `Crée du contenu viral pour un score Vincien de ${analysis.vincianScore}/100 et fréquence ${analysis.fundamentalFrequency}Hz. Format: Instagram story + post + hashtags`;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500
  });

  return { instagram: { content: completion.choices[0].message.content } };
}

function frequencyToNote(freq) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const A4 = 440;
  const C0 = A4 * Math.pow(2, -4.75);
  const h = Math.round(12 * Math.log2(freq / C0));
  const octave = Math.floor(h / 12);
  return notes[h % 12] + octave;
}
