export const CLAUDE_COURSE = [
  { id: 1, title: "1. Introdução - Por que Este Curso Existe", icon: "fas fa-door-open", description: "Boas-vindas e visão geral do que será abordado no curso." },
  { id: 2, title: "2. Glossário — Conceitos Essenciais", icon: "fas fa-book", description: "Todo o vocabulário necessário para dominar ferramentas de IA e terminal." },
  { id: 3, title: "3. O Cenário Atual: IA Escrevendo Software", icon: "fas fa-chart-line", description: "Como a IA mudou o jogo do desenvolvimento em 2024/2025." },
  { id: 4, title: "4. O Que É o Claude Code", icon: "fas fa-robot", description: "Definição, instalação e primeiros passos com a ferramenta." },
  { id: 5, title: "5. O Loop Agêntico", icon: "fas fa-sync", description: "O ciclo de pensamento e ação do Claude." },
  { id: 6, title: "6. O Ecossistema Claude", icon: "fas fa-network-wired", description: "Onde cada peça se encaixa." },
  { id: 7, title: "7. Instalação e Configuração", icon: "fas fa-tools", description: "Configurando o ambiente de elite." },
  { id: 8, title: "8. Git e GitHub", icon: "fab fa-github", description: "Versionamento automático com IA." },
  { id: 9, title: "9. CLAUDE.md — Engenharia de Contexto", icon: "fas fa-file-alt", description: "O manual de instruções do seu projeto." },
  { id: 10, title: "10. Memória (Curto & Longo Prazo)", icon: "fas fa-memory", description: "Como a IA retém informações." },
  { id: 11, title: "11. Os Três Modos de Operação", icon: "fas fa-sliders-h", description: "Modo Chat, Edit e Command." },
  { id: 12, title: "12. Skills — Receitas do Claude", icon: "fas fa-hat-wizard", description: "Criando habilidades customizadas." },
  { id: 13, title: "13. MCP — Model Context Protocol", icon: "fas fa-plug", description: "Conectando o Claude a fontes externas." },
  { id: 14, title: "14. Sub-Agentes", icon: "fas fa-users-cog", description: "Trabalho em paralelo entre instâncias de IA." },
  { id: 15, title: "15. Hooks — Automações", icon: "fas fa-anchor", description: "Gatilhos automáticos." },
  { id: 16, title: "16. Plugins", icon: "fas fa-puzzle-piece", description: "Extensões instaláveis." },
  { id: 17, title: "17. SSH — Acesso Remoto", icon: "fas fa-server", description: "Deep dive em segurança remota." },
  { id: 18, title: "18. Segurança e Permissões", icon: "fas fa-shield-alt", description: "O que o Claude pode ou não fazer." },
  { id: 19, title: "19. Configurando VPS", icon: "fas fa-cloud", description: "Claude Code rodando na nuvem." },
  { id: 20, title: "20. n8n — Workflow Visual", icon: "fas fa-project-diagram", description: "Integrando Claude com n8n." },
  { id: 21, title: "21. Ecossistema LangChain", icon: "fas fa-link", description: "LangGraph, LangSmith e Langfuse." },
  { id: 22, title: "22. Loop de Dev Autônomo", icon: "fas fa-infinity", description: "O futuro do desenvolvimento." },
  { id: 23, title: "23. Repositório Prático", icon: "fas fa-code", description: "IA Vendedora com LangGraph." },
  { id: 24, title: "24. Dicas de Economia", icon: "fas fa-wallet", description: "Opus vs Sonnet: Custo-benefício." },
  { id: 25, title: "25. Referências e Links", icon: "fas fa-external-link-alt", description: "Onde continuar estudando." },
  { id: 26, title: "26. Conclusão", icon: "fas fa-flag-checkered", description: "Próximos passos na sua jornada." }
];

// ============================================
// IndexedDB Storage (supports hundreds of MB)
// ============================================
const DB_NAME = 'neuralstream_course';
const DB_VERSION = 1;
const STORE_NAME = 'modules';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getModuleContent(id) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result?.html || '');
      req.onerror = () => resolve('');
    });
  } catch {
    return '';
  }
}

export async function saveModuleContent(id, html) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ id, html, updatedAt: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Save failed:', err);
    return false;
  }
}

export async function hasContent(id) {
  const content = await getModuleContent(id);
  return !!content;
}

// Get all module IDs that have content (for sidebar indicators)
export async function getModulesWithContent() {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAllKeys();
      req.onsuccess = () => resolve(new Set(req.result || []));
      req.onerror = () => resolve(new Set());
    });
  } catch {
    return new Set();
  }
}

// Migrate existing localStorage data to IndexedDB (one-time)
export async function migrateFromLocalStorage() {
  try {
    const raw = localStorage.getItem('neuralstream_course_content');
    if (!raw) return;
    
    const data = JSON.parse(raw);
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    for (const [id, html] of Object.entries(data)) {
      if (html) {
        store.put({ id: parseInt(id), html, updatedAt: Date.now() });
      }
    }
    
    await new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        localStorage.removeItem('neuralstream_course_content');
        console.log('✅ Migrated localStorage data to IndexedDB');
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Migration skipped:', err);
  }
}
