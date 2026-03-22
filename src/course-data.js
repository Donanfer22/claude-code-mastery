import { supabase } from './supabase.js'

// Initial Hardcoded Data (Fallback)
export const CLAUDE_COURSE_INITIAL = [
  { id: 1, section_id: 1, title: "1. Introdução — Por Que Este Curso Existe", icon: "fas fa-door-open", description: "Boas-vindas e visão geral do que será abordado no curso.", order: 1 },
  { id: 2, section_id: 1, title: "2. Glossário — Conceitos Essenciais Para Acompanhar", icon: "fas fa-book", description: "Todo o vocabulário necessário para dominar ferramentas de IA e terminal.", order: 2 },
  { id: 3, section_id: 1, title: "3. O Cenário Atual: IA Escrevendo Software", icon: "fas fa-chart-line", description: "Como a IA mudou o jogo do desenvolvimento em 2024/2025.", order: 3 },
  { id: 4, section_id: 2, title: "4. O Que É o Claude Code", icon: "fas fa-robot", description: "Definição, instalação e primeiros passos com a ferramenta.", order: 4 },
  { id: 5, section_id: 2, title: "5. O Loop Agêntico — Como o Claude Code Pensa e Age", icon: "fas fa-sync", description: "O ciclo de pensamento e ação do Claude.", order: 5 },
  { id: 6, section_id: 2, title: "6. O Ecossistema Claude — Onde Cada Peça Se Encaixa", icon: "fas fa-network-wired", description: "Onde cada peça se encaixa.", order: 6 },
  { id: 7, section_id: 3, title: "7. Instalação e Configuração do Ambiente", icon: "fas fa-tools", description: "Configurando o ambiente de elite.", order: 7 },
  { id: 8, section_id: 3, title: "8. Git e GitHub — Controle de Versão Para Todos", icon: "fab fa-github", description: "Versionamento automático com IA.", order: 8 },
  { id: 9, section_id: 3, title: "9. CLAUDE.md — Engenharia de Contexto", icon: "fas fa-file-alt", description: "O manual de instruções do seu projeto.", order: 9 },
  { id: 10, section_id: 3, title: "10. Memória — Curto Prazo e Longo Prazo", icon: "fas fa-memory", description: "Como a IA retém informações.", order: 10 },
  { id: 11, section_id: 3, title: "11. Os Três Modos de Operação", icon: "fas fa-sliders-h", description: "Modo Chat, Edit e Command.", order: 11 },
  { id: 12, section_id: 4, title: "12. Skills — As Receitas do Claude Code", icon: "fas fa-hat-wizard", description: "Criando habilidades customizadas.", order: 12 },
  { id: 13, section_id: 4, title: "13. MCP — Model Context Protocol", icon: "fas fa-plug", description: "Conectando o Claude a fontes externas.", order: 13 },
  { id: 14, section_id: 4, title: "14. Sub-Agentes — Trabalho em Paralelo", icon: "fas fa-users-cog", description: "Trabalho em paralelo entre instâncias de IA.", order: 14 },
  { id: 15, section_id: 4, title: "15. Hooks — Automações Determinísticas", icon: "fas fa-anchor", description: "Gatilhos automáticos.", order: 15 },
  { id: 16, section_id: 4, title: "16. Plugins — Extensões Instaláveis", icon: "fas fa-puzzle-piece", description: "Extensões instaláveis.", order: 16 },
  { id: 17, section_id: 5, title: "17. SSH — Acesso Remoto Seguro (Deep Dive)", icon: "fas fa-server", description: "Deep dive em segurança remota.", order: 17 },
  { id: 18, section_id: 5, title: "18. Segurança e Permissões", icon: "fas fa-shield-alt", description: "O que o Claude pode ou não fazer.", order: 18 },
  { id: 19, section_id: 5, title: "19. Configurando uma VPS para Claude Code", icon: "fas fa-cloud", description: "Claude Code rodando na nuvem.", order: 19 },
  { id: 20, section_id: 5, title: "20. n8n — Automação Visual de Workflows", icon: "fas fa-project-diagram", description: "Integrando Claude com n8n.", order: 20 },
  { id: 21, section_id: 5, title: "21. LangChain, LangGraph, LangSmith e Langfuse — O Ecossistema de IA", icon: "fas fa-link", description: "LangGraph, LangSmith e Langfuse.", order: 21 },
  { id: 22, section_id: 5, title: "22. O Loop de Desenvolvimento Autônomo", icon: "fas fa-infinity", description: "O futuro do desenvolvimento.", order: 22 },
  { id: 23, section_id: 5, title: "23. Repositório Prático: IA Vendedora com LangGraph", icon: "fas fa-code", description: "IA Vendedora com LangGraph.", order: 23 },
  { id: 24, section_id: 6, title: "24. Dicas de Economia: Opus vs Sonnet", icon: "fas fa-wallet", description: "Opus vs Sonnet: Custo-benefício.", order: 24 },
  { id: 25, section_id: 6, title: "25. Referências e Links Úteis", icon: "fas fa-external-link-alt", description: "Onde continuar estudando.", order: 25 },
  { id: 26, section_id: 6, title: "26. Conclusão", icon: "fas fa-flag-checkered", description: "Próximos passos na sua jornada.", order: 26 },
  
  // -- SEÇÃO PLUGINS CLAUDE CODE (Placeholder IDs 101+) --
  { id: 101, section_id: 101, title: "P1. Plugin: n8n-to-langgraph", icon: "fas fa-puzzle-piece", description: "Configuração e uso do plugin de automação.", order: 101 },
  { id: 102, section_id: 101, title: "P2. Plugin: chatwoot-skills", icon: "fas fa-puzzle-piece", description: "Habilidades para atendimento via IA.", order: 102 },
  { id: 103, section_id: 101, title: "P3. Plugin: fazer-ai-tools", icon: "fas fa-puzzle-piece", description: "Coleção de hooks e utilitários.", order: 103 },
  { id: 104, section_id: 101, title: "P4. Plugin: LangChain Skills", icon: "fas fa-puzzle-piece", description: "Integração oficial com LangChain.", order: 104 },
  { id: 105, section_id: 101, title: "P5. Plugin: Ralph Loop", icon: "fas fa-puzzle-piece", description: "Loop autônomo elite para Claude Code.", order: 105 },
  { id: 106, section_id: 101, title: "P6. Plugin: n8n-skills", icon: "fas fa-puzzle-piece", description: "7 skills para construir workflows n8n.", order: 106 },
  { id: 107, section_id: 102, title: "P7. Skills.sh: O \"NPM\" dos Agentes de IA", icon: "fas fa-box", description: "O marketplace definitivo de habilidades para agentes.", order: 107 },
  { id: 108, section_id: 102, title: "P8. Skill: Auditor de Código", icon: "fas fa-bolt", description: "Habilidade para revisão técnica automática.", order: 108 },
  { id: 109, section_id: 102, title: "P9. Skill: IA Vendedora", icon: "fas fa-bolt", description: "Configurando skills de conversão e CRM.", order: 109 }
];

export const CLAUDE_SECTIONS_INITIAL = [
  { id: 1, title: "Parte I - Fundamentos e Glossário", order: 1, main_category: "course" },
  { id: 2, title: "Parte II — Claude Code: Conceito e Ecossistema", order: 2, main_category: "course" },
  { id: 3, title: "Parte III — Configuração e Estrutura", order: 3, main_category: "course" },
  { id: 4, title: "Parte IV — Extensibilidade e Integrações", order: 4, main_category: "course" },
  { id: 5, title: "Parte V — Segurança, Infraestrutura e Prática", order: 5, main_category: "course" },
  { id: 6, title: "Parte VI — Dicas e Links Úteis", order: 6, main_category: "course" },
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

export async function deleteModule(id) {
    try {
        const { error } = await supabase
            .from('modules')
            .delete()
            .eq('id', id);

        if (error) throw error;
        courseCache.loaded = false;
        return true;
    } catch (err) {
        console.error('Delete module failed:', err);
        return false;
    }
}

export async function updateModuleOrder(moduleId, newOrder, newSectionId = null) {
    try {
        const updateData = { order: newOrder };
        if (newSectionId !== null) updateData.section_id = newSectionId;

        const { error } = await supabase
            .from('modules')
            .update(updateData)
            .eq('id', moduleId);

        if (error) throw error;
        courseCache.loaded = false;
        return true;
    } catch (err) {
        console.error('Update order failed:', err);
        return false;
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
