# 🎵 AIMastery Cymatic Analyzer V4

[![Version](https://img.shields.io/badge/version-4.0.0-blue.svg)](https://github.com/fullmeo/aimastery-cymatic-analyzer-v4)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/deployment-vercel-black.svg)](https://vercel.com)

> **Analyse cymatique révolutionnaire powered by AI** - Transformez vos compositions audio en contenus viraux pour les réseaux sociaux en 30 secondes.

## 🚀 Fonctionnalités

### ✨ Phase 1 - Social Media Pack (Disponible)
- **Analyse Vincienne** : Algorithmes inspirés de Léonard de Vinci
- **Score cymatique** : Évaluation harmonique de 0 à 100
- **Social Media Pack** : Contenu optimisé pour Instagram, LinkedIn, TikTok, YouTube
- **Génération IA** : OpenAI GPT pour contenus personnalisés
- **Extension VS Code** : Intégration directe dans votre workflow
- **Stripe Integration** : Abonnements et paiements sécurisés

### 🔮 Phase 2 - Holographic Dashboard (Bientôt)
- Visualisations 3D WebGL
- Dashboard interactif temps réel
- Export 4K et compatibilité AR

### 💎 Phase 3 - NFT Premium (Bientôt)
- Génération automatique de NFTs
- Intégration blockchain Solana
- Marketplace intégré

## 🏁 Quick Start

### Prérequis
```bash
Node.js >= 18.0.0
Compte Vercel
Clés API OpenAI et Stripe
```

### Installation
```bash
# Clone le repository
git clone https://github.com/fullmeo/aimastery-cymatic-analyzer-v4.git
cd aimastery-cymatic-analyzer-v4

# Installation des dépendances
npm install

# Configuration des variables d'environnement
cp .env.example .env.local
```

### Configuration
Créez un fichier `.env.local` :
```env
OPENAI_API_KEY=sk-your-openai-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-public
WEBHOOK_SECRET=whsec_your-webhook-secret
```

### Déploiement
```bash
# Développement local
npm run dev

# Déploiement production
vercel --prod
```

## 📁 Structure du Projet

```
aimastery-v4/
├── api/
│   ├── analyze.js          # Endpoint principal d'analyse
│   ├── create-checkout.js  # Création sessions Stripe
│   └── webhook.js          # Webhooks Stripe
├── public/
│   ├── index.html          # Landing page
│   ├── success.html        # Page succès paiement
│   └── cancel.html         # Page annulation
├── extension/
│   └── extension.ts        # Extension VS Code
├── package.json            # Dépendances Node.js
├── vercel.json            # Configuration Vercel
└── README.md              # Documentation
```

## 🔧 API Documentation

### POST /api/analyze
Analyse cymatique principale avec génération de contenu.

**Request:**
```json
{
  "audioData": "base64_audio_data",
  "analysisType": "social_pack",
  "userId": "user_123",
  "tier": "free"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "fundamentalFrequency": 440,
    "musicalNote": "A4",
    "vincianScore": 85,
    "harmonics": [...],
    "cymaticPatterns": {...}
  },
  "content": {
    "instagram": {
      "story": "🎵 Score Vincien 85/100 ! 🔥",
      "post": "Résultats cymatiques fascinants...",
      "hashtags": ["#cymatic", "#vincian", ...]
    },
    "linkedin": {...},
    "tiktok": {...},
    "youtube": {...}
  }
}
```

### POST /api/create-checkout
Création d'une session de paiement Stripe.

**Request:**
```json
{
  "priceId": "price_social_pack_monthly",
  "userId": "user_123",
  "successUrl": "https://scorescout.eu/success",
  "cancelUrl": "https://scorescout.eu/cancel"
}
```

## 💰 Pricing & Tiers

| Tier | Prix | Analyses/mois | Fonctionnalités |
|------|------|---------------|-----------------|
| **Free** | 0€ | 5 | Watermark, fonctionnalités de base |
| **Social Pack** | 9€ | 50 | HD templates, analytics, support prioritaire |
| **Holographic** | 15€ | 100 | + Dashboard 3D, export 4K, AR |
| **NFT Premium** | 25€ | Illimité | + Génération NFT, blockchain, marketplace |

## 🎯 Usage Examples

### Analyse basique
```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    audioData: audioBase64,
    analysisType: 'social_pack',
    userId: 'user_123'
  })
});

const { analysis, content } = await response.json();
console.log(`Score Vincien: ${analysis.vincianScore}/100`);
```

### Extension VS Code
```bash
# Installation
code --install-extension serigne-diagne.cymatic-analyzer

# Usage
1. Ouvrir un fichier audio (.wav, .mp3, .flac)
2. Cmd/Ctrl + Shift + P
3. "AIMastery: Analyze Audio"
4. Résultats dans nouvelle WebView
```

## 🔐 Sécurité

- **Variables d'environnement** : Toutes les clés API sont sécurisées
- **Webhooks Stripe** : Signature verification obligatoire
- **CORS** : Configuration restrictive pour production
- **Rate limiting** : Protection contre les abus
- **User anonymization** : IDs utilisateur tronqués dans les logs

## 🛠️ Développement

### Scripts disponibles
```bash
npm run dev      # Développement local avec hot reload
npm run build    # Build production
npm run start    # Serveur production
npm run deploy   # Déploiement Vercel
```

### Testing local
```bash
# Test endpoint d'analyse
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"audioData":"test","userId":"dev_test"}'

# Test Stripe checkout
curl -X POST http://localhost:3000/api/create-checkout \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_test","userId":"dev_test"}'
```

## 📊 Analytics & Monitoring

### Événements trackés
- `cymatic_analysis_completed` : Analyse terminée
- `checkout_started` : Début processus paiement
- `subscription_activated` : Abonnement activé
- `cta_clicked` : Clics sur boutons CTA

### Métriques clés
- Score Vincien moyen par utilisateur
- Taux de conversion free → premium
- Engagement social media généré
- Retention utilisateurs

## 🚨 Troubleshooting

### Erreurs communes

**❌ "OpenAI API key invalid"**
```bash
# Vérifier la clé API
echo $OPENAI_API_KEY

# Régénérer si nécessaire sur platform.openai.com
```

**❌ "Stripe webhook failed"**
```bash
# Vérifier le secret webhook
stripe listen --forward-to localhost:3000/api/webhook

# Tester avec l'event de test
stripe trigger checkout.session.completed
```

**❌ "Analysis timeout"**
```javascript
// Augmenter le timeout Vercel dans vercel.json
{
  "functions": {
    "api/analyze.js": {
      "maxDuration": 30
    }
  }
}
```

### Performance optimisation

**Réduire la latence :**
- Utiliser `Promise.all()` pour génération parallèle
- Cache les réponses IA fréquentes
- Optimiser la taille des payloads audio

**Économiser les tokens OpenAI :**
- Prompts plus concis
- Fallbacks sans IA pour les erreurs
- Rate limiting par utilisateur

## 🤝 Contributing

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Guidelines
- Code ES6+ moderne
- Tests unitaires pour les nouvelles fonctionnalités
- Documentation JSDoc pour les fonctions publiques
- Respect des patterns existants

## 📈 Roadmap

### ✅ Phase 1 (Terminé)
- [x] Analyse cymatique de base
- [x] Génération social media
- [x] Intégration Stripe
- [x] Extension VS Code
- [x] Landing page

### 🔄 Phase 2 (Q2 2025)
- [ ] Dashboard holographique 3D
- [ ] Export vidéo 4K
- [ ] Compatibilité AR/VR
- [ ] API publique

### 🔮 Phase 3 (Q3 2025)
- [ ] Génération NFT automatique
- [ ] Marketplace intégré
- [ ] Intégration blockchain Solana
- [ ] Système de royalties

## 📝 License

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Author

**Serigne Diagne - AIMastery Team**
- Website: [scorescout.eu](https://scorescout.eu)
- Email: serignetrumpet@gmail.com
- GitHub: [@fullmeo](https://github.com/fullmeo)
- VS Code Publisher: Serigne-Diagne

## 🙏 Acknowledgments

- [Léonard de Vinci](https://en.wikipedia.org/wiki/Leonardo_da_Vinci) pour l'inspiration des algorithmes
- [OpenAI](https://openai.com) pour la génération de contenu
- [Stripe](https://stripe.com) pour le système de paiement
- [Vercel](https://vercel.com) pour l'hosting serverless

---

<div align="center">

**[🚀 Essayer maintenant](https://scorescout.eu)** • **[📖 Documentation](https://docs.scorescout.eu)** • **[💬 Support](mailto:serignetrumpet@gmail.com)**

*Made with ❤️ for Creative Technologists by Serigne Diagne*

</div>
[aimastery_cymatic_v4readme.md](https://github.com/user-attachments/files/20443331/aimastery_cymatic_v4readme.md)
