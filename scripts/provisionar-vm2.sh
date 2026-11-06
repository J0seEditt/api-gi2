
#!/bin/bash
set -e

echo "=== Preparando servidor ==="

# Atualiza a lista de pacotes
apt-get update

# Instala ferramentas necessárias
apt-get install -y curl ca-certificates rsync

# Instala Node.js 26, caso necessário
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_26.x \
    -o /tmp/nodesource_setup.sh

  bash /tmp/nodesource_setup.sh
  apt-get install -y nodejs
fi

# Cria diretório nativo do Linux
mkdir -p /opt/api-gc2

# Copia o projeto sem node_modules
rsync -a --delete \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=.vagrant \
  /vagrant_data/ /opt/api-gc2/

# Permite que o usuário vagrant gerencie a aplicação
chown -R vagrant:vagrant /opt/api-gc2

# Instala dependências fora da pasta compartilhada
cd /opt/api-gc2
sudo -u vagrant npm ci

# Cria serviço para iniciar a API automaticamente
cat > /etc/systemd/system/api-gc2.service <<'EOF'
[Unit]
Description=API GC2 Node.js
After=network.target

[Service]
Type=simple
User=vagrant
WorkingDirectory=/opt/api-gc2
ExecStart=/usr/bin/node /opt/api-gc2/serve.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

# Ativa e inicia o serviço
systemctl daemon-reload
systemctl enable api-gc2
systemctl restart api-gc2

echo "=== Provisionamento concluído ==="
