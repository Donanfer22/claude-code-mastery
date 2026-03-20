import './style.css'
import avatarImg from './assets/avatar.png'
import postAiImg from './assets/post-ai.png'
import { CLAUDE_COURSE, getModuleContent, saveModuleContent, getModulesWithContent, migrateFromLocalStorage } from './course-data.js'

const app = document.querySelector('#app');
let currentQuill = null;
let isEditing = false;
let modulesWithContent = new Set();

// Utility to compress images before saving to Supabase
async function compressImage(base64Str, maxWidth = 1200, quality = 0.7) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/webp', quality));
    };
  });
}

function renderHome() {
  return `
    <header class="top-header">
      <div class="search-bar">
        <i class="fas fa-search" style="color: #64748b;"></i>
        <input type="text" placeholder="Pesquisar no curso...">
      </div>
      <div class="header-actions">
        <div class="user-profile">
          <div class="user-avatar" style="background: linear-gradient(135deg, #0ea5e9, #2563eb);">F</div>
          <span style="font-size: 0.9rem; font-weight: 500;">Fernando Cerqueira</span>
          <i class="fas fa-chevron-down" style="font-size: 0.7rem; color: #64748b;"></i>
        </div>
      </div>
    </header>

    <section class="dashboard-content" style="grid-template-columns: 1fr;">
      <div class="home-container" style="max-width: 1000px; margin: 0 auto; width: 100%; animation: fadeIn 0.5s ease-out;">
        
        <!-- Hero Section -->
        <div class="hero-card" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; padding: clamp(1.5rem, 5vw, 3.5rem); border: 1px solid var(--border-color); margin-bottom: 2rem; position: relative; overflow: hidden; display: flex; align-items: center; gap: 3rem; flex-wrap: wrap;">
          <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: var(--accent-primary); filter: blur(100px); opacity: 0.15;"></div>
          <div style="position: relative; z-index: 1; flex: 1; min-width: 300px;">
            <h1 class="font-outfit" style="font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 1rem; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Mestria Claude Code</h1>
            <p style="font-size: 1.15rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
              Bem-vindo ao centro estratégico de treinamento. Aqui você dominará o loop agêntico, automação elite e a engenharia de contexto avançada com o Claude Code.
            </p>
            <div style="display: flex; gap: 1rem;">
              <button onclick="document.getElementById('nav-claude').click()" style="padding: 0.85rem 2rem; background: var(--accent-primary); color: white; border-radius: 12px; font-weight: 600; border: none; cursor: pointer; transition: var(--transition-smooth); box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.4);">
                Começar agora
              </button>
            </div>
          </div>
          <div style="flex: 1; min-width: 300px; position: relative; z-index: 1;">
            <img src="${postAiImg}" alt="Claude AI" style="width: 100%; height: 320px; object-fit: cover; border-radius: 18px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
          <div class="info-card" style="background: var(--bg-secondary); border-radius: 20px; padding: 2rem; border: 1px solid var(--border-color); transition: var(--transition-smooth);">
            <div style="width: 50px; height: 50px; background: rgba(14, 165, 233, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
              <i class="fas fa-bolt" style="color: #0ea5e9; font-size: 1.5rem;"></i>
            </div>
            <h3 class="font-outfit" style="margin-bottom: 0.75rem;">O que é o Claude Code?</h3>
            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">
              Uma ferramenta de linha de comando (CLI) agêntica que entende o seu projeto inteiro. Ele não apenas sugere código, ele executa, testa e refatora de forma autônoma.
            </p>
          </div>

          <div class="info-card" style="background: var(--bg-secondary); border-radius: 20px; padding: 2rem; border: 1px solid var(--border-color); transition: var(--transition-smooth);">
            <div style="width: 50px; height: 50px; background: rgba(139, 92, 246, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
              <i class="fas fa-brain" style="color: var(--accent-primary); font-size: 1.5rem;"></i>
            </div>
            <h3 class="font-outfit" style="margin-bottom: 0.75rem;">Loop Agêntico</h3>
            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">
              Aprenda como configurar o ciclo de pensamento da IA para resolver problemas complexos sem precisar de prompts constantes a cada linha de código.
            </p>
          </div>

          <div class="info-card" style="background: var(--bg-secondary); border-radius: 20px; padding: 2rem; border: 1px solid var(--border-color); transition: var(--transition-smooth);">
            <div style="width: 50px; height: 50px; background: rgba(6, 182, 212, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
              <i class="fas fa-puzzle-piece" style="color: #06b6d4; font-size: 1.5rem;"></i>
            </div>
            <h3 class="font-outfit" style="margin-bottom: 0.75rem;">Plugins e Skills</h3>
            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">
              Expanda as capacidades do seu ambiente com plugins especializados que conectam o Claude a APIs, bancos de dados e ferramentas de produtividade.
            </p>
          </div>
        </div>

        <div style="background: rgba(139, 92, 246, 0.05); border-radius: 24px; padding: 2rem; border: 1px solid rgba(139, 92, 246, 0.2); display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <h4 class="font-outfit" style="margin-bottom: 0.5rem; color: var(--accent-primary);">Inicie sua jornada hoje</h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">
              Este sistema foi desenhado para ser seu companheiro de estudos. Use a barra lateral para navegar pelos módulos e registre seu progresso.
            </p>
          </div>
          <div style="display: flex; gap: 2rem;">
            <div style="text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">26</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Módulos</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">09</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Plugins</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">100%</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Cloud</div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <footer style="margin-top: 5rem; padding: 2rem 0; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 0.85rem;">
          <div>
            &copy; 2025 NeuralStream. Todos os direitos reservados.
          </div>
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <span style="font-weight: 500; color: var(--text-secondary);">By Fernando Cerqueira</span>
            <div style="display: flex; gap: 1rem;">
              <a href="#" style="color: var(--text-muted); transition: var(--transition-smooth);"><i class="fab fa-instagram"></i></a>
              <a href="#" style="color: var(--text-muted); transition: var(--transition-smooth);"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" style="color: var(--text-muted); transition: var(--transition-smooth);"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  `;
}

function renderClaudeCourse(activeModuleId = 1, savedContent = '') {
  const activeModule = CLAUDE_COURSE.find(m => m.id === activeModuleId);
  
  // Decide which modules to show in the sidebar based on where the user is
  const isPluginsSection = activeModuleId >= 100;
  
  let groups = [];
  let sidebarTitle = "";
  
  if (isPluginsSection) {
    sidebarTitle = "Seção de Plugins";
    groups = [
      { title: "Bibliotecas de Plugins", range: [101, 106] },
      { title: "Skills Automáticas", range: [107, 109] }
    ];
  } else {
    sidebarTitle = "Módulos do Curso";
    groups = [
      { title: "Fundamentos", range: [1, 3] },
      { title: "O Novo Motor", range: [4, 6] },
      { title: "Mãos na Massa", range: [7, 8] },
      { title: "Engenharia de Memória", range: [9, 10] },
      { title: "Operação Avançada", range: [11, 14] },
      { title: "Automação Elite", range: [15, 18] },
      { title: "Aceleradores de Carreira", range: [22, 26] }
    ];
  }

  isEditing = false;
  
  return `
    <header class="top-header">
      <div class="search-bar">
        <i class="fas fa-search" style="color: #64748b;"></i>
        <input type="text" placeholder="Pesquisar no curso...">
      </div>
      <div class="header-actions">
        <div class="user-profile">
          <div class="user-avatar" style="background: linear-gradient(135deg, #0ea5e9, #2563eb);">F</div>
          <span style="font-size: 0.9rem; font-weight: 500;">Fernando Cerqueira</span>
        </div>
      </div>
    </header>

    <div style="display: flex; flex: 1; overflow: hidden;">
      <aside class="course-sidebar">
        <h3 class="font-outfit" style="margin-bottom: 2rem; font-size: 1.1rem; color: var(--text-primary); padding-left: 1rem;">${sidebarTitle}</h3>
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
               <span style="background: rgba(16, 185, 129, 0.1); color: var(--accent-primary); padding: 0.35rem 0.85rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.2);">MOD ${activeModule.id}</span>
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
             <button class="nav-btn-prev" data-id="${activeModule.id - 1}" ${activeModule.id === 1 || activeModule.id === 101 ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''} style="background: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.85rem 1.75rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 12px; font-weight: 600; transition: var(--transition-smooth);">
                 <i class="fas fa-arrow-left"></i> Anterior
             </button>
             <button class="nav-btn-next" data-id="${activeModule.id + 1}" ${activeModule.id === 26 || activeModule.id === 109 ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''} style="background: var(--accent-primary); border: none; color: white; padding: 0.85rem 2rem; border-radius: 12px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 12px; transition: var(--transition-smooth); box-shadow: 0 10px 20px -5px var(--accent-glow);">
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
  enhanceCodeBlocks(document.getElementById('content-view'));
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

  // Handle pasted images automatically
  currentQuill.root.addEventListener('paste', async (e) => {
    // Wait for the sync paste to complete then find images if they weren't handled as blobs
    setTimeout(async () => {
      const images = currentQuill.root.querySelectorAll('img[src^="data:image"]');
      for (const img of images) {
        if (img.getAttribute('data-compressed')) continue;
        const compressed = await compressImage(img.src);
        img.src = compressed;
        img.setAttribute('data-compressed', 'true');
      }
    }, 100);
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
  let html = currentQuill.root.innerHTML;
  
  // Auto-format markdown triple backticks to <pre>
  html = html.replace(/<p>\s*```[\s\S]*?<\/p>([\s\S]*?)<p>\s*```\s*<\/p>/gi, function(match, inner) {
      let clean = inner.replace(/<\/p>(\s*)<p>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
      return `<pre>${clean}</pre>`;
  });
  
  // Quick fix for the famous "Resumo Visual" table if it's pasted as plain text paragraphs
  if (html.includes('| Plan Mode |')) {
    html = html.replace(/(<p>[^<]*?\| Plan Mode \|[^<]*?<\/p>)([\s\S]*?)(?=<p>[A-Za-z]+|<h|<div|$)/i, function(match) {
        if(match.includes('<pre>')) return match;
        let clean = match.replace(/<\/p>(\s*)<p>/gi, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
        return `<pre>${clean}</pre>`;
    });
  }
  
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
  input.accept = 'image/webp, image/png, image/jpeg, image/jpg, image/gif, .webp, .png, .jpg, .jpeg, .gif';
  input.multiple = true;
  input.onchange = () => {
    for (const file of input.files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const compressed = await compressImage(e.target.result);
        const range = currentQuill.getSelection(true);
        currentQuill.insertEmbed(range.index, 'image', compressed);
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

function enhanceCodeBlocks(container) {
  if (!container) return;
  const blocks = container.querySelectorAll('pre, .ql-code-block-container');
  blocks.forEach(block => {
    if (block.parentElement.classList.contains('code-block-wrapper')) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    const header = document.createElement('div');
    header.className = 'code-block-header';
    
    const dots = document.createElement('div');
    dots.className = 'code-block-dots';
    dots.innerHTML = '<span></span><span></span><span></span>';
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copiar';
    copyBtn.onclick = () => {
      // For Quill 2.0 container, join the inner line divs. For <pre>, just use innerText.
      const textToCopy = block.tagName === 'PRE' ? block.innerText : Array.from(block.children).map(node => node.innerText || node.textContent).join('\\n');
      navigator.clipboard.writeText(textToCopy);
      copyBtn.innerHTML = '<i class="fas fa-check" style="color: #22c55e;"></i> Copiado!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="far fa-copy"></i> Copiar';
      }, 2000);
    };
    
    header.appendChild(dots);
    header.appendChild(copyBtn);
    
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(header);
    
    block.classList.add('code-block-content');
    wrapper.appendChild(block);
  });
}

async function init() {
  // Migrate localStorage data if it exists (one-time)
  await migrateFromLocalStorage();
  modulesWithContent = await getModulesWithContent();

  const mainContent = document.createElement('div');
  mainContent.className = 'main-wrapper';
  mainContent.innerHTML = renderHome();

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
          <a href="#" class="nav-item active" id="nav-feed"><i class="fas fa-home"></i> Início</a>
        </div>

        <div class="nav-section">
          <p class="nav-label">Cursos Premium</p>
          <a href="#" class="nav-item" id="nav-claude"><i class="fas fa-robot"></i> Claude Code Pro</a>
          <a href="#" class="nav-item" id="nav-plugins"><i class="fas fa-puzzle-piece"></i> Plugins Claude Code</a>
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
      mainContent.innerHTML = renderHome();
    }

    if (e.target.closest('#nav-claude')) {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      document.getElementById('nav-claude').classList.add('active');
      destroyEditor();
      isEditing = false;
      await loadAndRenderCourse(1, mainContent);
    }

    if (e.target.closest('#nav-plugins')) {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      document.getElementById('nav-plugins').classList.add('active');
      destroyEditor();
      isEditing = false;
      await loadAndRenderCourse(101, mainContent);
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
