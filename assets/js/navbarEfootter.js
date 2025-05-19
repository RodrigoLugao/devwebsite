// Função para carregar HTML e inserir no DOM
function loadComponent(url, targetId) {
    return fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(targetId).innerHTML = data;
      });
  }
  
  // Carrega o navbar e o footer e aguarda ambos
  Promise.all([
    loadComponent('navbar.html', 'navbar'),
    loadComponent('footer.html', 'footer')
  ]).then(() => {
    // Após os fetchs, executa o resto do código
    // Verificar qual página estamos
    const paginaAtual = document.location.pathname.split('/').pop();
  
    console.log('Página Atual:', paginaAtual);
    
    // Procurar os links no navbar carregado
    const activeLinks = document.querySelectorAll(`[data-page]`);
    
    console.log('Links encontrados:', activeLinks);
    
    // Adicionar classe 'active' ao link correspondente
    activeLinks.forEach((link) => {
      if (link.dataset.page === paginaAtual) {
        link.classList.add('active');
        link.children[0].href = "#";
      }
    });
  });