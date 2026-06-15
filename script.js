/* ============================================================
   DADOS DOS FILMES E SÉRIES
   ============================================================ */
const movies = {
  'it-a-coisa': {
    title: 'It: A Coisa',
    year: 2017,
    rating: '7.3',
    genre: 'Terror',
    duration: '2h 15min',
    director: 'Andy Muschietti',
    embedUrl: 'https://www.youtube.com/embed/xKJmEC5ieOk?autoplay=1',
    description:
      'Sete crianças conhecidas como "Os Perdedores" enfrentam seus maiores medos quando são aterrorizadas por Pennywise, uma entidade demoníaca que assume a forma de um palhaço e emerge dos esgotos de Derry, Maine, a cada 27 anos para se alimentar do medo das crianças.',
  },
  'it-capitulo-2': {
    title: 'It: Capítulo 2',
    year: 2019,
    rating: '6.5',
    genre: 'Terror',
    duration: '2h 49min',
    director: 'Andy Muschietti',
    embedUrl: 'https://www.youtube.com/embed/hZeFeYSmBcg?autoplay=1',
    description:
      'Vinte e sete anos depois dos eventos do primeiro filme, Os Perdedores retornam a Derry para enfrentar Pennywise uma última vez e cumprir a promessa feita na infância, desta vez como adultos com traumas e medos ainda mais profundos.',
  },
  'welcome-to-derry': {
    title: 'It: Bem-Vindos a Derry',
    year: 2025,
    rating: 'Pendente',
    genre: 'Série / Terror',
    duration: '1ª Temporada',
    director: 'Andy Muschietti (Produtor)',
    embedUrl: 'https://www.youtube.com/embed/S2pE9m65Z5A?autoplay=1',
    description:
      'Explore as origens do palhaço Pennywise e o passado sombrio da cidade de Derry. Ambientada décadas antes dos filmes originais, esta série revela como o mal se estabeleceu na região e as primeiras vítimas da entidade.',
  },
};

/* ============================================================
   MODAL
   ============================================================ */
const modal       = document.getElementById('movieModal');
const modalIframe = document.getElementById('modalIframe');
const modalDetails = document.getElementById('modalDetails');

function openModal(id) {
  const movie = movies[id];
  if (!movie) return;

  // Injeta o iframe com autoplay
  modalIframe.src = movie.embedUrl;

  // Injeta os detalhes
  modalDetails.innerHTML = `
    <h2>${movie.title}</h2>
    <div class="meta">
      <span>&#127916; ${movie.genre}</span>
      <span>&#128197; ${movie.year}</span>
      <span>&#9200; ${movie.duration}</span>
      <span>&#127775; ${movie.rating}</span>
      <span>&#127916; ${movie.director}</span>
    </div>
    <p>${movie.description}</p>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  // Para o vídeo removendo o src
  setTimeout(() => {
    modalIframe.src = '';
    document.body.style.overflow = '';
  }, 300);
}

// Fechar com tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ============================================================
   FILTROS DE CATEGORIA
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Atualiza botão ativo
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach((card) => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        // Animação de entrada
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeInUp 0.35s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ============================================================
   BUSCA
   ============================================================ */
const searchInput = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();

  // Reseta filtros visuais
  filterBtns.forEach((b) => b.classList.remove('active'));
  document.querySelector('[data-filter="all"]').classList.add('active');

  cards.forEach((card) => {
    const title = card.querySelector('.card__title').textContent.toLowerCase();
    const desc  = card.querySelector('.card__desc').textContent.toLowerCase();

    if (!query || title.includes(query) || desc.includes(query)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') performSearch();
});

// Limpa busca ao apagar o campo
searchInput.addEventListener('input', () => {
  if (searchInput.value === '') {
    cards.forEach((c) => c.classList.remove('hidden'));
  }
});

/* ============================================================
   FAVORITOS
   ============================================================ */
function toggleFavorite(btn) {
  const isFav = btn.classList.toggle('favorited');
  btn.textContent = isFav ? '❤ Favoritado' : '♡ Favoritar';
}

/* ============================================================
   ANIMAÇÃO DE ENTRADA DOS CARDS
   ============================================================ */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card {
    animation: fadeInUp 0.4s ease forwards;
  }
  .card:nth-child(1) { animation-delay: 0.05s; }
  .card:nth-child(2) { animation-delay: 0.10s; }
  .card:nth-child(3) { animation-delay: 0.15s; }
`;
document.head.appendChild(style);
