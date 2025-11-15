# 🚀 Guide Rapide - Ouvrir test-demo.html

## Option 1: Ouverture Simple (Recommandé ⭐)

### Sur Windows:
```cmd
# Ouvrir l'explorateur de fichiers
explorer .

# Puis double-cliquez sur "test-demo.html"
```

### Sur macOS:
```bash
# Ouvrir le Finder
open .

# Puis double-cliquez sur "test-demo.html"
```

### Sur Linux:
```bash
# Ouvrir le gestionnaire de fichiers
xdg-open .

# Puis double-cliquez sur "test-demo.html"
```

---

## Option 2: Ligne de Commande

### Windows:
```cmd
start test-demo.html
```

### macOS:
```bash
open test-demo.html
```

### Linux:
```bash
xdg-open test-demo.html
```

---

## Option 3: Depuis GitHub (Si pas encore cloné)

```bash
# 1. Clonez le repository
git clone https://github.com/fullmeo/aimastery-cymatic-analyzer-v4.git

# 2. Entrez dans le dossier
cd aimastery-cymatic-analyzer-v4

# 3. Checkout la bonne branche
git checkout claude/analysis-011CV5dEmzRqYpTqyrPAgtpp

# 4. Ouvrez le fichier (selon votre OS)
# Windows:
start test-demo.html

# macOS:
open test-demo.html

# Linux:
xdg-open test-demo.html
```

---

## ✨ Fonctionnalités de la Démo

### Test 1: Fonctions Core
Cliquez sur "Run Core Tests" pour voir:
- ✅ Conversion Fréquence → Note (440Hz → A4)
- ✅ Calcul du Score Vincien
- ✅ Validation des bibliothèques

### Test 2: Analyse Cymatique
Entrez une fréquence (80-4000 Hz) et testez:
- Score Vincien personnalisé
- Détection des harmoniques
- Génération de contenu Instagram

**Fréquences à essayer:**
- 432 Hz → Score ~84/100 (fréquence sacrée)
- 528 Hz → Score ~89/100 (Solfeggio)
- 440 Hz → Score ~75/100 (LA standard)
- 50 Hz → Score ~40/100 (trop bas, pénalisé)

### Test 3: Fréquences Sacrées
Boutons prédéfinis pour:
- 432 Hz (Verdi's A)
- 528 Hz (Solfeggio DNA)
- 440 Hz (Standard)
- 741 Hz (Solfeggio Awakening)

---

## 🎯 Ce qui est testé

La démo utilise les **mêmes algorithmes** que l'API de production:
- ✅ Algorithme de scoring Vincien
- ✅ Détection de fréquences sacrées
- ✅ Analyse harmonique
- ✅ Génération de contenu

**Différence:** Données simulées au lieu de vrais fichiers audio

---

## 🐛 En cas de problème

### Le fichier ne s'ouvre pas
1. Vérifiez que vous êtes dans le bon dossier
2. Vérifiez que le fichier existe: `ls -la test-demo.html`
3. Essayez de l'ouvrir dans un navigateur manuellement

### Erreurs JavaScript
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs
3. Assurez-vous d'avoir un navigateur moderne (Chrome, Firefox, Safari récent)

### Rien ne se passe
1. Cliquez sur les boutons "Run Core Tests" ou "Run Analysis"
2. Vérifiez que JavaScript est activé dans votre navigateur

---

## 📱 Autres fichiers à tester

```bash
# Landing page complète
open public/index.html

# Page de succès de paiement
open public/success.html

# Page d'annulation de paiement
open public/cancel.html
```

---

## 💡 Astuce Pro

Vous pouvez aussi **glisser-déposer** le fichier `test-demo.html`
directement dans votre navigateur (Chrome, Firefox, Safari, Edge).

---

**Besoin d'aide ?** Consultez `TESTING.md` pour plus de détails.
