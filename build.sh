#!/bin/bash
set -euo pipefail

echo "📦 Instalando dependências de produção..."
npm ci --only=production

echo "🗜️  Gerando lambda.zip..."
zip -r lambda.zip src/ node_modules/

echo "✅ lambda.zip criado na raiz do projeto."
echo "   Agora rode: cd terraform && terraform apply"
