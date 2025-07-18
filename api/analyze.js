module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { audioData = 'test', userId = 'anonymous', tier = 'free' } = req.body || {};

    console.log('Analyzing audio for user:', userId);

    const freq = extractBaseFrequency(audioData);
    const vincianScore = calculateVincianScore(freq);
    
    const analysis = {
      fundamentalFrequency: Math.round(freq * 100) / 100,
      vincianScore,
      musicalNote: frequencyToNote(freq),
      harmonics: generateHarmonics(freq),
      cymaticPattern: getCymaticPattern(freq),
      complexity: freq > 440 ? 'high' : 'medium',
      timestamp: new Date().toISOString()
    };

    const content = {
      instagram: {
        story: `Score Vincien: ${vincianScore}/100 - Note: ${analysis.musicalNote}`,
        hashtags: ['#cymatic', '#vincian', '#aimastery']
      }
    };

    res.json({
      success: true,
      analysis,
      content,
      metadata: { generatedAt: new Date().toISOString(), version: '4.0.0', tier }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
};

function extractBaseFrequency(audioData) {
  if (!audioData || audioData === 'test') return 440;
  const hash = audioData.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return 200 + Math.abs(hash % 600);
}

function calculateVincianScore(freq) {
  let score = 50;
  const sacredFreqs = [432, 528, 741, 852];
  if (sacredFreqs.some(f => Math.abs(freq - f) < 10)) score += 20;
  return Math.min(100, Math.max(30, score));
}

function generateHarmonics(fundamental) {
  return [
    { frequency: Math.round(fundamental * 2), amplitude: 0.6 },
    { frequency: Math.round(fundamental * 3), amplitude: 0.4 }
  ];
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
