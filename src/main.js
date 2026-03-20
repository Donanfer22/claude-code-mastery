import './style.css'
import avatarImg from './assets/avatar.png'
import postAiImg from './assets/post-ai.png'
import { CLAUDE_COURSE, getModuleContent, saveModuleContent, getModulesWithContent, migrateFromLocalStorage } from './course-data.js'

const app = document.querySelector('#app');
let currentQuill = null;
let isEditing = false;
let modulesWithContent = new Set();

function renderFeed() {
  return `
    <header class="top-header">
      <div class="search-bar">
        <i class="fas fa-search" style="color: #64748b;"></i>
        <input type="text" placeholder="Pesquisar na comunidade...">
      </div>
      <div class="header-actions">
        <div class="action-btn">
          <i class="far fa-bell"></i>
          <span class="notification-badge"></span>
        </div>
        <div class="action-btn"><i class="far fa-comment-dots"></i></div>
        <div class="user-profile">
          <div class="user-avatar" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4);">L</div>
          <span style="font-size: 0.9rem; font-weight: 500;">Lucas Moreira</span>
          <i class="fas fa-chevron-down" style="font-size: 0.7rem; color: #64748b;"></i>
        </div>
      </div>
    </header>

    <section class="dashboard-content">
      <div class="feed-container">
        <div class="feed-header">
          <h2 class="feed-title font-outfit">Feed da Comunidade</h2>
          <div class="feed-filter" style="display: flex; gap: 1rem; align-items: center;">
            <button class="action-btn" style="padding: 0.5rem 1.25rem; background: var(--accent-primary); color: white; border-radius: 10px; font-size: 0.85rem; font-weight: 600; border: none; cursor: pointer; transition: var(--transition-smooth); box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);">
              Nova publicação
            </button>
          </div>
        </div>

        <div class="post-card">
          <div class="post-author">
            <img src="${avatarImg}" alt="Avatar" class="author-avatar" onerror="this.src='https://ui-avatars.com/api/?name=Lucas+Moreira&background=8b5cf6&color=fff'">
            <div class="author-info">
              <h4>Lucas Moreira</h4>
              <p>Top Creator • Há 2 horas</p>
            </div>
          </div>
          <div class="post-content">
            <h3>Curso Claude Code Pro - Módulos Liberados! 🚀</h3>
            <p>Pessoal, acabei de organizar os 26 módulos do curso de Claude Code Pro baseado no cronograma oficial. Os primeiros módulos já estão com conteúdo completo, incluindo o glossário essencial!</p>
            <div class="post-media" style="margin-top: 1.5rem;">
               <img src="${postAiImg}" alt="Banner Claude" style="border-radius: 12px; width: 100%; height: 280px; object-fit: cover;">
            </div>
          </div>
          <div class="post-actions">
            <div class="post-action"><i class="far fa-heart"></i> 24</div>
            <div class="post-action"><i class="far fa-comment"></i> 8</div>
            <div class="post-action"><i class="far fa-share-square"></i></div>
          </div>
        </div>
      </div>

      <div class="widgets-container">
        <div class="widget">
          <h3 class="widget-title">Eventos ao Vivo <i class="fas fa-broadcast-tower" style="color: #ef4444; font-size: 0.9rem;"></i></h3>
          <div class="event-item">
            <div class="event-date"><span>24</span> MAR</div>
            <div class="event-info"><h5>Q&A Semanal: Automações</h5><p>20:00 • Via Zoom</p></div>
          </div>
          <div class="event-item">
            <div class="event-date"><span>28</span> MAR</div>
            <div class="event-info"><h5>Workshop LangGraph</h5><p>19:00 • Via Youtube</p></div>
          </div>
        </div>

        <div class="widget">
          <h3 class="widget-title">Leaderboard Semanal <i class="fas fa-trophy" style="color: #f59e0b; font-size: 0.9rem;"></i></h3>
          <div class="ranking-item">
            <div class="rank-number">1</div>
            <img src="https://ui-avatars.com/api/?name=Lucas+Moreira&background=8b5cf6&color=fff" class="rank-avatar">
            <div class="rank-name">Lucas Moreira</div>
            <div class="rank-xp">2.4k XP</div>
          </div>
          <div class="ranking-item">
            <div class="rank-number">2</div>
            <img src="https://ui-avatars.com/api/?name=Amanda+Silva&background=f59e0b&color=fff" class="rank-avatar">
            <div class="rank-name">Amanda Silva</div>
            <div class="rank-xp">1.8k XP</div>
          </div>
          <div class="ranking-item">
            <div class="rank-number">3</div>
            <img src="https://ui-avatars.com/api/?name=Rafael+Gomes&background=06b6d4&color=fff" class="rank-avatar">
            <div class="rank-name">Rafael Gomes</div>
            <div class="rank-xp">1.5k XP</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderClaudeCourse(activeModuleId = 1, savedContent = '') {
  const activeModule = CLAUDE_COURSE.find(m => m.id === activeModuleId);
  const groups = [
    { title: "Fundamentos", range: [1, 3] },
    { title: "O Novo Motor", range: [4, 6] },
    { title: "Mãos na Massa", range: [7, 8] },
    { title: "Engenharia de Memória", range: [9, 10] },
    { title: "Operação Avançada", range: [11, 14] },
    { title: "Automação Elite", range: [15, 18] },
    { title: "Infra e Workflows", range: [19, 21] },
    { title: "Aceleradores de Carreira", range: [22, 26] }
  ];

  isEditing = false;
  
  return `
    <header class="top-header">
      <div class="search-bar">
        <i class="fas fa-search" style="color: #64748b;"></i>
        <input type="text" placeholder="Pesquisar no curso...">
      </div>
      <div class="header-actions">
        <div class="user-profile">
          <div class="user-avatar" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4);">L</div>
          <span style="font-size: 0.9rem; font-weight: 500;">Lucas Moreira</span>
        </div>
      </div>
    </header>

    <div style="display: flex; flex: 1; overflow: hidden;">
      <aside class="course-sidebar">
        <h3 class="font-outfit" style="margin-bottom: 2rem; font-size: 1.1rem; color: var(--text-primary); padding-left: 1rem;">Módulos do Curso</h3>
        <div class="course-nav">
          ${groups.map(group => `
            <div class="course-group">
              <div class="course-group-title">${group.title}</div>
              ${CLAUDE_COURSE.filter(m => m.id >= group.range[0] && m.id <= group.range[1]).map(mod => `
                <div class="course-nav-item ${mod.id === activeModuleId ? 'active' : ''}" data-id="${mod.id}">
                  <i class="${mod.icon || 'fas fa-chevron-right'}"></i>
                  <div style="flex: 1;">
                    <div style="font-size: 0.85rem; font-weight: 600;">${mod.title}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted); opacity: 0.8;">${mod.description || 'Conteúdo do módulo'}</div>
                  </div>
                  ${modulesWithContent.has(mod.id) ? '<i class="fas fa-check-circle" style="font-size: 0.6rem; color: #22c55e;"></i>' : ''}
                  ${mod.id === activeModuleId ? '<i class="fas fa-play" style="font-size: 0.6rem; color: var(--accent-primary);"></i>' : ''}
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </aside>

      <section class="dashboard-content" style="grid-template-columns: 1fr; flex: 1; padding: 2rem; overflow-y: auto;">
        <div class="course-card" style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 20px; padding: clamp(1.5rem, 5vw, 3.5rem); animation: fadeIn 0.4s ease-out; max-width: 900px; margin: 0 auto; width: 100%;">
          <div style="margin-bottom: 2.5rem;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;">
               <span style="background: rgba(139, 92, 246, 0.1); color: var(--accent-primary); padding: 0.35rem 0.85rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(139, 92, 246, 0.2);">MOD ${activeModule.id}</span>
               <div style="height: 1px; flex: 1; background: var(--border-color);"></div>
               
               <div class="editor-toolbar-actions" data-module-id="${activeModule.id}">
                 <button class="editor-btn" id="btn-edit" title="Editar conteúdo">
                   <i class="fas fa-pen"></i> Editar
                 </button>
                 <button class="editor-btn editor-btn-save" id="btn-save" style="display: none;" title="Salvar conteúdo">
                   <i class="fas fa-save"></i> Salvar
                 </button>
                 <button class="editor-btn editor-btn-cancel" id="btn-cancel" style="display: none;" title="Cancelar edição">
                   <i class="fas fa-times"></i>
                 </button>
                 <button class="editor-btn editor-btn-img" id="btn-add-img" style="display: none;" title="Adicionar imagem">
                   <i class="fas fa-image"></i> Imagem
                 </button>
               </div>
            </div>
            <h1 class="font-outfit" style="font-size: clamp(1.75rem, 4vw, 2.5rem); line-height: 1.2;">${activeModule.title}</h1>
          </div>
          
          <div id="content-view" class="course-body" style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
            ${savedContent || `
               <div style="text-align: center; padding: 5rem 2rem; background: rgba(255,255,255,0.02); border-radius: 24px; border: 2px dashed var(--border-color);">
                  <div style="width: 80px; height: 80px; background: var(--bg-tertiary); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                    <i class="fas fa-paste" style="font-size: 2rem; color: var(--accent-secondary);"></i>
                  </div>
                  <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Nenhum conteúdo ainda</h3>
                  <p style="max-width: 400px; margin: 0 auto; color: var(--text-muted);">Clique em <strong>"Editar"</strong> para abrir o editor e colar o conteúdo do PDF aqui.</p>
               </div>
            `}
          </div>

          <div id="content-editor-wrapper" style="display: none;">
            <div id="quill-editor" class="quill-container"></div>
          </div>
          
          <div style="margin-top: 5rem; padding-top: 2.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; gap: 1rem;">
             <button class="nav-btn-prev" data-id="${activeModule.id - 1}" ${activeModule.id === 1 ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''} style="background: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.85rem 1.75rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 12px; font-weight: 600; transition: var(--transition-smooth);">
                 <i class="fas fa-arrow-left"></i> Anterior
             </button>
             <button class="nav-btn-next" data-id="${activeModule.id + 1}" ${activeModule.id === CLAUDE_COURSE.length ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''} style="background: var(--accent-primary); border: none; color: white; padding: 0.85rem 2rem; border-radius: 12px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 12px; transition: var(--transition-smooth); box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.4);">
                 Próxima Aula <i class="fas fa-arrow-right"></i>
             </button>
          </div>
        </div>
      </section>
    </div>
  `;
}

async function loadAndRenderCourse(moduleId, mainContent) {
  modulesWithContent = await getModulesWithContent();
  const savedContent = await getModuleContent(moduleId);
  mainContent.innerHTML = renderClaudeCourse(moduleId, savedContent);
}

function initEditor(moduleId) {
  const editorEl = document.querySelector('#quill-editor');
  if (!editorEl || currentQuill) return;

  currentQuill = new Quill(editorEl, {
    theme: 'snow',
    placeholder: 'Cole o conteúdo do PDF aqui...\n\nDica: Use Ctrl+V para colar texto e imagens diretamente!',
    modules: {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
      ]
    }
  });
}

async function loadEditorContent(moduleId) {
  if (!currentQuill) return;
  const saved = await getModuleContent(moduleId);
  if (saved) {
    currentQuill.root.innerHTML = saved;
  }
}

function destroyEditor() {
  currentQuill = null;
}

function getActiveModuleId() {
  const toolbar = document.querySelector('.editor-toolbar-actions');
  return toolbar ? parseInt(toolbar.dataset.moduleId) : 1;
}

async function toggleEditMode(moduleId) {
  const viewEl = document.getElementById('content-view');
  const editorWrapper = document.getElementById('content-editor-wrapper');
  const btnEdit = document.getElementById('btn-edit');
  const btnSave = document.getElementById('btn-save');
  const btnCancel = document.getElementById('btn-cancel');
  const btnImg = document.getElementById('btn-add-img');

  if (!isEditing) {
    isEditing = true;
    viewEl.style.display = 'none';
    editorWrapper.style.display = 'block';
    btnEdit.style.display = 'none';
    btnSave.style.display = 'inline-flex';
    btnCancel.style.display = 'inline-flex';
    btnImg.style.display = 'inline-flex';
    initEditor(moduleId);
    await loadEditorContent(moduleId);
  } else {
    isEditing = false;
    destroyEditor();
    viewEl.style.display = 'block';
    editorWrapper.style.display = 'none';
    btnEdit.style.display = 'inline-flex';
    btnSave.style.display = 'none';
    btnCancel.style.display = 'none';
    btnImg.style.display = 'none';
  }
}

async function saveContent(moduleId, mainContent) {
  if (!currentQuill) return;
  const html = currentQuill.root.innerHTML;
  
  const content = (html === '<p><br></p>' || html.trim() === '') ? '' : html;
  
  const saved = await saveModuleContent(moduleId, content);
  
  if (saved) {
    isEditing = false;
    destroyEditor();
    await loadAndRenderCourse(moduleId, mainContent);
    showToast('Conteúdo salvo com sucesso! ✅');
  } else {
    showToast('❌ Erro ao salvar. Tente novamente.', 'error');
  }
}

function addImageToEditor() {
  if (!currentQuill) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true;
  input.onchange = () => {
    for (const file of input.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const range = currentQuill.getSelection(true);
        currentQuill.insertEmbed(range.index, 'image', e.target.result);
        currentQuill.setSelection(range.index + 1);
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  if (type === 'error') {
    toast.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    toast.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.4)';
  }
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

async function init() {
  // Migrate localStorage data if it exists (one-time)
  await migrateFromLocalStorage();
  modulesWithContent = await getModulesWithContent();

  const mainContent = document.createElement('div');
  mainContent.className = 'main-wrapper';
  mainContent.innerHTML = renderFeed();

  app.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-icon">
          <i class="fas fa-brain" style="color: white; font-size: 1.2rem;"></i>
        </div>
        <span class="logo-text font-outfit">NeuralStream</span>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section">
          <p class="nav-label">Plataforma</p>
          <a href="#" class="nav-item active" id="nav-feed"><i class="fas fa-home"></i> Feed</a>
          <a href="#" class="nav-item"><i class="fas fa-calendar-alt"></i> Eventos</a>
        </div>

        <div class="nav-section">
          <p class="nav-label">Cursos Premium</p>
          <a href="#" class="nav-item" id="nav-claude"><i class="fas fa-robot"></i> Claude Code Pro</a>
          <a href="#" class="nav-item"><i class="fas fa-project-diagram"></i> N8N Masterclass</a>
        </div>
      </nav>
    </aside>
  `;
  
  app.appendChild(mainContent);

  app.addEventListener('click', async (e) => {
    if (e.target.closest('#nav-feed')) {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      document.getElementById('nav-feed').classList.add('active');
      destroyEditor();
      isEditing = false;
      mainContent.innerHTML = renderFeed();
    }

    if (e.target.closest('#nav-claude')) {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      document.getElementById('nav-claude').classList.add('active');
      destroyEditor();
      isEditing = false;
      await loadAndRenderCourse(1, mainContent);
    }

    const courseNavItem = e.target.closest('.course-nav-item');
    if (courseNavItem) {
      const id = parseInt(courseNavItem.dataset.id);
      destroyEditor();
      isEditing = false;
      await loadAndRenderCourse(id, mainContent);
    }

    const nextBtn = e.target.closest('.nav-btn-next');
    if (nextBtn && !nextBtn.disabled) {
      const id = parseInt(nextBtn.dataset.id);
      destroyEditor();
      isEditing = false;
      await loadAndRenderCourse(id, mainContent);
    }

    const prevBtn = e.target.closest('.nav-btn-prev');
    if (prevBtn && !prevBtn.disabled) {
      const id = parseInt(prevBtn.dataset.id);
      destroyEditor();
      isEditing = false;
      await loadAndRenderCourse(id, mainContent);
    }

    if (e.target.closest('#btn-edit')) {
      const modId = getActiveModuleId();
      await toggleEditMode(modId);
    }

    if (e.target.closest('#btn-save')) {
      const modId = getActiveModuleId();
      await saveContent(modId, mainContent);
    }

    if (e.target.closest('#btn-cancel')) {
      const modId = getActiveModuleId();
      await toggleEditMode(modId);
    }

    if (e.target.closest('#btn-add-img')) {
      addImageToEditor();
    }
  });
}

init();
