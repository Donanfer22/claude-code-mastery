import { supabase } from './supabase.js'

// Initial Hardcoded Data (Fallback)
export const CLAUDE_COURSE_INITIAL = [
  { id: 1, section_id: 1, title: "1. Introdução - Por que Este Curso Existe", icon: "fas fa-door-open", description: "Boas-vindas e visão geral do que será abordado no curso." },
  { id: 2, section_id: 1, title: "2. Glossário — Conceitos Essentialis", icon: "fas fa-book", description: "Todo o vocabulário necessário para dominar ferramentas de IA e terminal." },
  { id: 3, section_id: 1, title: "3. O Cenário Atual: IA Escrevendo Software", icon: "fas fa-chart-line", description: "Como a IA mudou o jogo do desenvolvimento em 2024/2025." },
  { id: 4, section_id: 2, title: "4. O Que É o Claude Code", icon: "fas fa-robot", description: "Definição, instalação e primeiros passos com a ferramenta." },
  { id: 5, section_id: 2, title: "5. O Loop Agêntico", icon: "fas fa-sync", description: "O ciclo de pensamento e ação do Claude." },
  { id: 6, section_id: 2, title: "6. O Ecossistema Claude", icon: "fas fa-network-wired", description: "Onde cada peça se encaixa." },
  { id: 7, section_id: 3, title: "7. Instalação e Configuração", icon: "fas fa-tools", description: "Configurando o ambiente de elite." },
  { id: 8, section_id: 3, title: "8. Git e GitHub", icon: "fab fa-github", description: "Versionamento automático com IA." },
  { id: 9, section_id: 4, title: "9. CLAUDE.md — Engenharia de Contexto", icon: "fas fa-file-alt", description: "O manual de instruções do seu projeto." },
  { id: 10, section_id: 4, title: "10. Memória (Curto & Longo Prazo)", icon: "fas fa-memory", description: "Como a IA retém informações." },
  { id: 11, section_id: 5, title: "11. Os Três Modos de Operação", icon: "fas fa-sliders-h", description: "Modo Chat, Edit e Command." },
  { id: 12, section_id: 5, title: "12. Skills — Receitas do Claude", icon: "fas fa-hat-wizard", description: "Criando habilidades customizadas." },
  { id: 13, section_id: 5, title: "13. MCP — Model Context Protocol", icon: "fas fa-plug", description: "Conectando o Claude a fontes externas." },
  { id: 14, section_id: 5, title: "14. Sub-Agentes", icon: "fas fa-users-cog", description: "Trabalho em paralelo entre instâncias de IA." },
  { id: 15, section_id: 6, title: "15. Hooks — Automações", icon: "fas fa-anchor", description: "Gatilhos automáticos." },
  { id: 16, section_id: 6, title: "16. Plugins", icon: "fas fa-puzzle-piece", description: "Extensões instaláveis." },
  { id: 17, section_id: 6, title: "17. SSH — Acesso Remoto", icon: "fas fa-server", description: "Deep dive em segurança remota." },
  { id: 18, section_id: 6, title: "18. Segurança e Permissões", icon: "fas fa-shield-alt", description: "O que o Claude pode ou não fazer." },
  { id: 19, section_id: 6, title: "19. Configurando VPS", icon: "fas fa-cloud", description: "Claude Code rodando na nuvem." },
  { id: 20, section_id: 6, title: "20. n8n — Workflow Visual", icon: "fas fa-project-diagram", description: "Integrando Claude com n8n." },
  { id: 21, section_id: 6, title: "21. Ecossistema LangChain", icon: "fas fa-link", description: "LangGraph, LangSmith e Langfuse." },
  { id: 22, section_id: 7, title: "22. Loop de Dev Autônomo", icon: "fas fa-infinity", description: "O futuro do desenvolvimento." },
  { id: 23, section_id: 7, title: "23. Repositório Prático", icon: "fas fa-code", description: "IA Vendedora com LangGraph." },
  { id: 24, section_id: 7, title: "24. Dicas de Economia", icon: "fas fa-wallet", description: "Opus vs Sonnet: Custo-benefício." },
  { id: 25, section_id: 7, title: "25. Referências e Links", icon: "fas fa-external-link-alt", description: "Onde continuar estudando." },
  { id: 26, section_id: 7, title: "26. Conclusão", icon: "fas fa-flag-checkered", description: "Próximos passos na sua jornada." },
  
  // -- SEÇÃO PLUGINS CLAUDE CODE (Placeholder IDs 101+) --
  { id: 101, section_id: 101, title: "P1. Plugin: n8n-to-langgraph", icon: "fas fa-puzzle-piece", description: "Configuração e uso do plugin de automação." },
  { id: 102, section_id: 101, title: "P2. Plugin: chatwoot-skills", icon: "fas fa-puzzle-piece", description: "Habilidades para atendimento via IA." },
  { id: 103, section_id: 101, title: "P3. Plugin: fazer-ai-tools", icon: "fas fa-puzzle-piece", description: "Coleção de hooks e utilitários." },
  { id: 104, section_id: 101, title: "P4. Plugin: LangChain Skills", icon: "fas fa-puzzle-piece", description: "Integração oficial com LangChain." },
  { id: 105, section_id: 101, title: "P5. Plugin: Ralph Loop", icon: "fas fa-puzzle-piece", description: "Loop autônomo elite para Claude Code." },
  { id: 106, section_id: 101, title: "P6. Plugin: n8n-skills", icon: "fas fa-puzzle-piece", description: "7 skills para construir workflows n8n." },
  { id: 107, section_id: 102, title: "P7. Skills.sh: O \"NPM\" dos Agentes de IA", icon: "fas fa-box", description: "O marketplace definitivo de habilidades para agentes." },
  { id: 108, section_id: 102, title: "P8. Skill: Auditor de Código", icon: "fas fa-bolt", description: "Habilidade para revisão técnica automática." },
  { id: 109, section_id: 102, title: "P9. Skill: IA Vendedora", icon: "fas fa-bolt", description: "Configurando skills de conversão e CRM." }
];

export const CLAUDE_SECTIONS_INITIAL = [
  { id: 1, title: "Fundamentos", order: 1, main_category: "course" },
  { id: 2, title: "O Novo Motor", order: 2, main_category: "course" },
  { id: 3, title: "Mãos na Massa", order: 3, main_category: "course" },
  { id: 4, title: "Engenharia de Memória", order: 4, main_category: "course" },
  { id: 5, title: "Operação Avançada", order: 5, main_category: "course" },
  { id: 6, title: "Automação Elite", order: 6, main_category: "course" },
  { id: 7, title: "Aceleradores de Carreira", order: 7, main_category: "course" },
  { id: 101, title: "Bibliotecas de Plugins", order: 101, main_category: "plugins" },
  { id: 102, title: "Skills Automáticas", order: 102, main_category: "plugins" }
];

// Cache for course data
let courseCache = {
    sections: [],
    modules: [],
    loaded: false
};

export async function getCourseData() {
    if (courseCache.loaded) return courseCache;

    try {
        const { data: sections, error: secError } = await supabase
            .from('course_sections')
            .select('*')
            .order('order', { ascending: true });

        const { data: modules, error: modError } = await supabase
            .from('modules')
            .select('id, section_id, title, icon, description, order')
            .order('order', { ascending: true });

        if (secError || modError || !sections || sections.length === 0) {
            console.warn('Using initial local course data');
            return {
                sections: CLAUDE_SECTIONS_INITIAL,
                modules: CLAUDE_COURSE_INITIAL
            };
        }

        courseCache = { sections, modules, loaded: true };
        return courseCache;
    } catch (err) {
        console.error('Failed to fetch course data:', err);
        return {
            sections: CLAUDE_SECTIONS_INITIAL,
            modules: CLAUDE_COURSE_INITIAL
        };
    }
}

export async function getModuleFull(id) {
    try {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            // If not in DB, it might be one of the initial modules with no HTML yet
            const initial = CLAUDE_COURSE_INITIAL.find(m => m.id === id);
            return { ...initial, html: '' };
        }
        return data;
    } catch (err) {
        return null;
    }
}

export async function getModuleContent(id) {
  const mod = await getModuleFull(id);
  return mod?.html || '';
}

export async function saveModuleContent(id, html, metadata = {}) {
  try {
    const { error } = await supabase
        .from('modules')
        .upsert({ 
            id, 
            html, 
            ...metadata,
            updatedAt: new Date().toISOString() 
        });

    if (error) throw error;
    courseCache.loaded = false; // Invalidate cache
    return true;
  } catch (err) {
    console.error('Save failed:', err);
    return false;
  }
}

export async function addSection(title, main_category = 'course', icon = 'fas fa-folder') {
    try {
        const { data: maxOrder } = await supabase.from('course_sections').select('order').order('order', { ascending: false }).limit(1);
        const nextOrder = (maxOrder?.[0]?.order || 0) + 1;

        const { data, error } = await supabase
            .from('course_sections')
            .insert([{ title, main_category, icon, order: nextOrder }])
            .select();

        if (error) throw error;
        courseCache.loaded = false;
        return data[0];
    } catch (err) {
        console.error('Add section failed:', err);
        return null;
    }
}

export async function addModule(section_id, title, description = '', icon = 'fas fa-file-alt') {
    try {
        const { data: maxOrder } = await supabase.from('modules').select('order').eq('section_id', section_id).order('order', { ascending: false }).limit(1);
        const nextOrder = (maxOrder?.[0]?.order || 0) + 1;

        const { data, error } = await supabase
            .from('modules')
            .insert([{ section_id, title, description, icon, order: nextOrder, html: '' }])
            .select();

        if (error) throw error;
        courseCache.loaded = false;
        return data[0];
    } catch (err) {
        console.error('Add module failed:', err);
        return null;
    }
}

export async function getModulesWithContent() {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('id')
      .not('html', 'eq', '')
      .not('html', 'is', null);

    if (error) throw error;
    return new Set(data.map(item => item.id));
  } catch (err) {
    return new Set();
  }
}

// Admin function to migrate initial data to DB
export async function migrateToSupabase() {
    try {
        // 1. Insert sections
        for (const section of CLAUDE_SECTIONS_INITIAL) {
            await supabase.from('course_sections').upsert(section);
        }
        // 2. Insert modules (without overwriting HTML if it exists)
        for (const mod of CLAUDE_COURSE_INITIAL) {
            const { data: existing } = await supabase.from('modules').select('html').eq('id', mod.id).single();
            await supabase.from('modules').upsert({
                ...mod,
                html: existing?.html || ''
            });
        }
        return true;
    } catch (err) {
        console.error('Migration failed:', err);
        return false;
    }
}

// Deprecated or Aliases for compatibility
export const CLAUDE_COURSE = CLAUDE_COURSE_INITIAL;
export async function migrateFromLocalStorage() {}
