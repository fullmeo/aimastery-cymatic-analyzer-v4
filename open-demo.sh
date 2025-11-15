#!/bin/bash
# Script d'ouverture rapide pour test-demo.html
# Usage: ./open-demo.sh

echo "🚀 Opening AIMastery V4 Demo..."
echo ""

# Detect OS and open accordingly
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "📱 Detected macOS"
    open test-demo.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "🐧 Detected Linux"
    xdg-open test-demo.html
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows Git Bash
    echo "🪟 Detected Windows"
    start test-demo.html
else
    echo "❓ Unknown OS. Please open test-demo.html manually."
fi

echo ""
echo "✅ Demo should open in your default browser!"
echo ""
echo "💡 What you can test:"
echo "   • Run Core Tests - Test frequency conversion & scoring"
echo "   • Cymatic Analysis - Try different frequencies (80-4000 Hz)"
echo "   • Sacred Frequencies - Test 432Hz, 528Hz, 741Hz"
echo ""
echo "📚 See TESTING.md for more details"
