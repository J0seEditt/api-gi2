# api-gi2

[![CI/CD Pipeline](https://github.com/J0seEditt/api-gi2/actions/workflows/workflow.yaml/badge.svg?branch=master)](https://github.com/J0seEditt/api-gi2/actions)
[![Docker Image](https://img.shields.io/docker/v/leozinfake/api-gi2?label=dockerhub)](https://hub.docker.com/r/leozinfake/api-gi2)
[![Docker Pulls](https://img.shields.io/docker/pulls/leozinfake/api-gi2)](https://hub.docker.com/r/leozinfake/api-gi2)

Projeto desenvolvido para apresentar os 10 carros mais vendidos do Brasil.

---

## 🚀 Funcionalidades e Diferenciais

- Exibição dos 10 carros mais vendidos
- Consumo de dados através de uma API
- Informações sobre nome e marca
- Preço dos veículos
- Descrição
- Cores disponíveis

> **Metodologia:** Desenvolvido utilizando a estratégia GitFlow.

---

## 🐳 Docker Hub

A imagem oficial desta aplicação está hospedada e disponível no Docker Hub:
👉 [Acessar repositório no Docker Hub](https://hub.docker.com/r/leozinfake/api-gi2)

---

## 🛠️ Pré-requisitos e Instalação

### 1. Pré-requisitos

- Ter o **Node.js** instalado na sua máquina (o Node.js já inclui o gerenciador de pacotes NPM por padrão).

### 2. Instalação das Dependências

No terminal, navegue até a raiz do projeto e execute os comandos abaixo para inicializar o ambiente e instalar o framework web e o módulo de segurança de rotas:

```bash
# Inicializa o projeto Node.js criando o arquivo package.json
npm init -y

# Instala o Express (servidor) e o CORS (permissão de acesso)
npm install express cors
```
---

## 🖥️ Provisionamento de Infraestrutura com Vagrant

Este projeto utiliza **Vagrant e VirtualBox** para criar e configurar automaticamente duas máquinas virtuais Ubuntu 22.04, permitindo executar e testar a API em uma rede privada.

### 1. Pré-requisitos

Para executar a infraestrutura, é necessário instalar:

- Vagrant
- Oracle VirtualBox
- Git

### 3. Iniciar a infraestrutura

Abra o terminal na pasta do projeto, onde está localizado o `Vagrantfile`, e execute:

```bash
vagrant up
```

O Vagrant criará e configurará as duas máquinas virtuais automaticamente.

Para verificar o estado das máquinas:

```bash
vagrant status
```

### 4. Provisionamento automático da VM2

Durante o provisionamento, o script `scripts/provisionar-vm2.sh`:

1. Instala o Node.js e as ferramentas necessárias.
2. Sincroniza a pasta do projeto com `/vagrant_data`.
3. Copia os arquivos da aplicação para `/opt/api-gc2`.
4. Instala as dependências utilizando `npm ci`.
5. Configura o serviço `api-gc2` com systemd para iniciar automaticamente.

Para executar novamente o provisionamento:

```bash
vagrant provision vm2
```

### 5. Verificar a API na VM2

Acesse a máquina servidora:

```bash
vagrant ssh vm2
```

Verifique se a aplicação está em execução:

```bash
systemctl is-active api-gc2
```

O resultado esperado é `active`.

Para testar a API:

```bash
curl -i http://localhost:8080/serve
```

Para sair da VM2:

```bash
exit
```

### 6. Testar a rota GET dentro da VM1

Acesse a VM1:

```bash
vagrant ssh vm1
```

Dentro da VM1, execute:

```bash
curl -i http://192.168.56.11:8080/serve
```

O comando envia uma requisição HTTP GET para a API executada na VM2.

O resultado esperado é:

```text
HTTP/1.1 200 OK
```

A resposta também apresenta um JSON com os dados dos veículos.

Esse teste comprova a comunicação entre as duas máquinas virtuais pela rede privada.

### 7. Desligar a infraestrutura

Para sair da VM1:

```bash
exit
```

Para desligar as máquinas virtuais:

```bash
vagrant halt
```

Para reiniciar:

```bash
vagrant reload
```

### 8. Arquivos utilizados

- `Vagrantfile` — configuração das máquinas virtuais.
- `scripts/provisionar-vm2.sh` — script de provisionamento automático.


👥 Autores
Jose Edilson Da Silva Filho
Leonardo Felix
