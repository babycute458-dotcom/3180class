#!/usr/bin/env bash
# Run on a Mac. Creates/updates an iOS Capacitor shell (no App Store publish).
set -euo pipefail
cd "$(dirname "$0")/.."

npm install
npm run build
npm install --save @capacitor/core @capacitor/ios @capacitor-community/speech-recognition
npm install --save-dev @capacitor/cli

if [[ ! -f capacitor.config.json && ! -f capacitor.config.ts ]]; then
  npx cap init "对练" com.babycute.duilian --web-dir dist
fi

if [[ ! -d ios ]]; then
  npx cap add ios
fi

npx cap sync ios
echo
echo "Next: npx cap open ios  →  connect iPhone  →  Run"
echo "See APP-INSTALL.md for signing / trust steps."
