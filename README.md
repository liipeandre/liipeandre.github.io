# Portfólio Pessoal | André Felipe

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/liipeandre)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/liipeandre)

Repositório do meu site pessoal, configurado para hospedagem direta no [GitHub Pages](https://pages.github.com/). Este espaço foi construído para ser um hub central onde concentro meus projetos de hobby, experimentações em Python, laboratórios de infraestrutura e automações.

## 🚀 Funcionalidades

* **Integração com a API do GitHub:** Os projetos na seção de portfólio são carregados e atualizados automaticamente na página direto dos meus repositórios públicos.
* **Projetos Fixados no Topo:** O script identifica e destaca os repositórios "pinnados" (fixados) na primeira página.
* **Paginação Local:** Exibição organizada dos repositórios (6 por página) para facilitar a navegação sem sobrecarregar o visual.
* **Dark Mode Nativo:** O site carrega em tema escuro por padrão, com um botão para o tema claro que salva a preferência do visitante no navegador (`localStorage`).
* **Design Responsivo e Minimalista:** Foco direto no conteúdo e no carregamento rápido, estruturado sem o uso de frameworks pesados.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica da página.
* **CSS3:** Estilização, layout flexível (Grid/Flexbox) e variáveis para o controle dinâmico de temas.
* **JavaScript (Vanilla):** Lógica assíncrona (`fetch`) para consumo da API REST do GitHub, paginação e manipulação do DOM.
* **FontAwesome:** Biblioteca externa para os ícones da interface.

## 📂 Estrutura do Projeto

* `index.html`: Estrutura principal da página contendo a bio e os contêineres dinâmicos.
* `style.css`: Regras visuais, responsividade e paletas de cores (claro/escuro).
* `script.js`: Motor do site, responsável pela busca de repositórios, renderização dos cards na tela e controle do tema.
