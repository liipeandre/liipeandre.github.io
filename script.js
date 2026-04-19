// === CONFIGURAÇÕES ===
// Coloque aqui o nome exato dos repositórios que você quer "Pinnar" no topo
const projetosPinnados = [
	'ann-performance-analysis',
	'coryn-web-scraper',
	'pacman',
	'fifteen',
	'badge-generator',
	'portproxy'
]; 

// Variáveis globais para controlar a paginação
let allRepos = [];
let currentPage = 1;
const reposPerPage = 6;

document.addEventListener('DOMContentLoaded', () => {
// === LÓGICA DO TEMA (CLARO/ESCURO) ===
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    
    // Puxa o tema salvo no navegador. Se não existir, define 'dark' como padrão
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Aplica o estado inicial correto
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun'); // Mostra o sol para alternar para o claro
    } else {
        document.documentElement.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon'); // Mostra a lua
    }

    // Ação do botão
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // === LÓGICA DOS BOTÕES DE PAGINAÇÃO ===
    document.getElementById('btn-prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderRepos();
        }
    });

    document.getElementById('btn-next').addEventListener('click', () => {
        const totalPages = Math.ceil(allRepos.length / reposPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderRepos();
        }
    });

    fetchGitHubProjects();
});

// === BUSCA OS DADOS DA API ===
async function fetchGitHubProjects() {
    const username = 'liipeandre'; 
    const repoContainer = document.getElementById('github-repos');

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Falha ao conectar com o GitHub.');
        }

        const repos = await response.json();

        // Filtra para remover os forks
        const meusRepos = repos.filter(repo => !repo.fork);

        if (meusRepos.length === 0) {
            repoContainer.innerHTML = '<p>Nenhum repositório público encontrado.</p>';
            return;
        }

        // === SEPARA OS PINNADOS DOS DEMAIS ===
        const pinned = meusRepos.filter(repo => projetosPinnados.includes(repo.name));
        const outros = meusRepos.filter(repo => !projetosPinnados.includes(repo.name));

        // Junta tudo: Pinnados primeiro, seguidos pelos outros mais recentes
        allRepos = [...pinned, ...outros];

        document.getElementById('paginacao-controles').style.display = 'flex';
        renderRepos();

    } catch (error) {
        repoContainer.innerHTML = `<p>Não foi possível carregar os projetos no momento.</p>`;
        console.error("Erro na API do GitHub:", error);
    }
}

// === DESENHA OS PROJETOS NA TELA ===
function renderRepos() {
    const repoContainer = document.getElementById('github-repos');
    repoContainer.innerHTML = ''; 

    const startIndex = (currentPage - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;
    const currentRepos = allRepos.slice(startIndex, endIndex);

    currentRepos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'projeto-card';
        
        const languageTag = repo.language ? `<span class="tag">${repo.language}</span>` : '';
        
        // Verifica se é um projeto pinnado para adicionar o ícone de alfinete
        const isPinned = projetosPinnados.includes(repo.name);
        const pinIcon = isPinned ? '<i class="fa-solid fa-thumbtack" style="color: var(--accent-color); margin-right: 8px;" title="Projeto Fixado"></i>' : '';
        
        card.innerHTML = `
            <h3>${pinIcon}${repo.name}</h3>
            <p>${repo.description || 'Sem descrição disponível.'}</p>
            <div class="repo-meta">
                ${languageTag}
            </div>
            <a href="${repo.html_url}" target="_blank" class="btn">Ver Repositório</a>
        `;
        
        repoContainer.appendChild(card);
    });

    updatePaginationControls();
}

// === ATUALIZA O ESTADO DOS BOTÕES ===
function updatePaginationControls() {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageInfo = document.getElementById('page-info');

    const totalPages = Math.ceil(allRepos.length / reposPerPage);

    pageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;

    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages || totalPages === 0;
}
