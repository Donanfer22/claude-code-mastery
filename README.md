# Mestria Claude Code 🚀

Bem-vindo ao repositório do **Mestria Claude Code** (anteriormente NeuralStream Community), um centro estratégico de treinamento focado em dominar o loop agêntico, automação de elite e engenharia de contexto avançada utilizando o **Claude Code**.

## 📌 Sobre o Projeto

Este projeto é uma plataforma educacional imersiva construída para desenvolvedores. O objetivo é fornecer não apenas o conhecimento teórico, mas um ambiente prático e visual (estilo dashboard/terminal) onde o aluno pode registrar seu progresso, ler documentações ricas e consultar bibliotecas de "Skills" e "Plugins" do Claude.

**Principais Tópicos Abordados na Plataforma:**
* O cenário atual de IA escrevendo software.
* Instalação e Configuração do ambiente de elite.
* Os 3 Modos de Operação (Chat, Edit, Command).
* Integração com GitHub, n8n, Supabase e APIs externas.
* Criação de *Sub-Agentes*, *Hooks* e *Plugins* customizados.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 / CSS3 / JavaScript Vanilla**: Estrutura e interatividade limpas e de alta performance.
* **Vite**: Bundler super rápido para desenvolvimento local e geração do build de produção.
* **Supabase**: Backend-as-a-Service (BaaS) utilizado para o armazenamento (Banco de dados PostgreSQL) do conteúdo das aulas dinamicamente.
* **Quill.js (v2)**: Editor Rich Text para criação e visualização do conteúdo diretamente na interface da plataforma (com suporte a blocos de código formatados).
* **Font Awesome & Google Fonts**: Para a iconografia moderna e tipografia (Inter e Outfit).

---

## ⚙️ Como Executar o Projeto Localmente

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/Donanfer22/claude-code-mastery.git
   cd claude-code-mastery
   ```

2. **Instale as dependências:**
   O projeto utiliza o Vite. Você pode usar npm, yarn ou bun.
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as suas credenciais do Supabase:
   ```env
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173/`.

---

## ✨ Features Especiais

* **Design Premium:** Cores modernas (tema dark), scroll inteligente com barra lateral fixada e estilos baseados no "macOS Terminal" para leitura de código.
* **Formatador de Código Inteligente:** Todo bloco de código colado no editor do painel é automaticamente transformado numa interface customizada com botões de "Copiar" facilitados para o aluno.
* **Sistema de Navegação Fluida:** Transição instantânea entre módulos do curso e plugins com apenas 1 clique.

---

<p align="center">
  Desenvolvido com foco em alta performance e design <b>By Fernando Cerqueira</b>.
</p>
