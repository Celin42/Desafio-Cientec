# 📌 Cadastro de Cidadãos (Desafio Cientec)

Esse Projeto é uma aplicação web simples para cadastrar cidadãos brasileiros e buscar registros pelo CPF ou Nome.

---

## 🚀 Tecnologias Utilizadas
- **Node.js** (Backend)
- **HTML, CSS e JavaScript** (frontend)
- **JSON** (Simulação de banco de dados)

## 📂 Estrutura do Projeto
/DesafioCientec
│── /src
    ├── /models # Definição das classes (Cidadão, ValidadorCPF)
    ├── /database # Simulação do banco (JSON)
├── index.js # Ponto de entrada do servidor 
│── /public # Interface
    │── /index.html # Interface HTML, CSS e JS
│── package.json # Configurações do Node.js 
│── README.md # Instruções de uso

## 📌 Como Rodar o Projeto
### 🛠️ **Pré Requisitos**
Antes de começar, você precisará ter o Node.js instalado.
🔗 [Baixe e instale o Node.js](https://nodejs.org/)

### 📦 1. Instale as dependências
Execute no terminal:
npm install

Caso dê um erro de permissão do Powershell ao executar o npm install faça:
Execute o PowerShell como administrador e vá ao diretório do projeto e execute:
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
E libere a restrição digitando:
S

### ▶️ 2. Inicie o servidor
Para rodar a aplicação, use:
node index.js

Se tudo estiver correto você cerá a mensagem:
"Servidor rodando em http://localhost:3000"

## 🌐 Como Usar a Aplicação
### 1️⃣ Acesse no navegador
Após iniciar o servidor, abra seu navegador e acesse:
http://localhost:3000

### 2️⃣ Cadastro de Cidadão
Digite o Nome Completo e o CPF.
O CPF será automaticamente formatado.
Clique em "Cadastrar".
Se for um CPF válido e novo, o cidadão será cadastrado.

### 3️⃣ Buscar Cidadão
Digite o CPF ou Nome no campo de busca.
Clique em "Buscar".
Se o cidadão existir, ele será exibido na tela.

### 4️⃣ Limpar Resultado
Clique em "Limpar Resultado" para resetar a busca.

## 🛠️ Melhorias Implementadas
✅ Máscara automática no CPF (000.000.000-00)
✅ Validação de CPF antes do cadastro
✅ Busca por CPF e Nome
✅ Feedback visual para erros e sucesso
✅ Layout responsivo e estilizado

## 📌 Contato
Caso tenha dúvidas, entre em contato!

📧: marcelo.grossi@ufv.br
📞: (31)98501-7084
