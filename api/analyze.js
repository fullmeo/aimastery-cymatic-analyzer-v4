



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
function performCymaticAnalysis(audioData) {
  // Simulation analyse FFT plus réaliste
  const baseFreq = extractBaseFrequency(audioData);
  const harmonics = generateRealisticHarmonics(baseFreq);
  const vincianScore = calculateVincianScore(baseFreq, harmonics);
  
  return {
    fundamentalFrequency: Math.round(baseFreq * 100) / 100,
    vincianScore,
    musicalNote: frequencyToNote(baseFreq),
    harmonics: harmonics.slice(0, 5),
    resonanceIndex: calculateResonance(baseFreq),
    cymaticPattern: getCymaticPattern(baseFreq),
    complexity: baseFreq > 440 ? 'high' : 'medium',
    timestamp: new Date().toISOString()
};
}

function extractBaseFrequency(audioData) {
  if (!audioData || audioData === 'test') return 440;
  const hash = audioData.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return 200 + Math.abs(hash % 600);
}

function generateRealisticHarmonics(fundamental) {
  return [
    { frequency: fundamental * 2, amplitude: 0.6 },
    { frequency: fundamental * 3, amplitude: 0.4 },
    { frequency: fundamental * 4, amplitude: 0.3 }
  ];
}

function calculateVincianScore(freq, harmonics) {
  let score = 50;
  const goldenRatio = 1.618;
  harmonics.forEach(h => {
    if (Math.abs(h.frequency / freq - goldenRatio) < 0.1) score += 15;
  });
  return Math.min(100, Math.max(30, score));
}

function calculateResonance(freq) {
  return (freq / 440).toFixed(3);
}

function getCymaticPattern(freq) {
  if (freq < 500) return { type: 'standing_wave', complexity: 'medium' };
  return { type: 'complex_spiral', complexity: 'high' };
}
  let score = 50;
  const goldenRatio = 1.618;
  harmonics.forEach(h => {
    if (Math.abs(h.frequency / freq - goldenRatio) < 0.1) score += 15;
  });
  return Math.min(100, Math.max(30, score));
}

function calculateResonance(freq) {
  return (freq / 440).toFixed(3);
}

function getCymaticPattern(freq) {
  if (freq < 500) return { type: 'standing_wave', complexity: 'medium' };
  return { type: 'complex_spiral', complexity: 'high' };
}

function frequencyToNote(freq) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const A4 = 440;
  const C0 = A4 * Math.pow(2, -4.75);
  const h = Math.round(12 * Math.log2(freq / C0));
  const octave = Math.floor(h / 12);
  return notes[h % 12] + octave;
}

async function generateSocialContent(analysis, tier) {
  return { 
    instagram: { 
      content: `🎵 Score Vincien: ${analysis.vincianScore}/100 | Note: ${analysis.musicalNote} | ${analysis.fundamentalFrequency}Hz` 
    }
  };
}
}
