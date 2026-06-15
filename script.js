/* ============================================================
   DADOS DOS FILMES
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
  'o-iluminado': {
    title: 'O Iluminado',
    year: 1980,
    rating: '8.4',
    genre: 'Terror',
    duration: '2h 26min',
    director: 'Stanley Kubrick',
    embedUrl: 'https://www.youtube.com/embed/S014oGZiSdI?autoplay=1',
    description:
      'Jack Torrance aceita um emprego de zelador no isolado Hotel Overlook durante o inverno. Enquanto a neve corta qualquer acesso ao mundo exterior, Jack começa a enlouquecer sob a influência de forças sobrenaturais que habitam o hotel.',
  },
  'vingadores-ultimato': {
    title: 'Vingadores: Ultimato',
    year: 2019,
    rating: '8.4',
    genre: 'Ação',
    duration: '3h 01min',
    director: 'Anthony e Joe Russo',
    embedUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c?autoplay=1',
    description:
      'Após os eventos devastadores de Guerra Infinita, os heróis sobreviventes se unem em uma missão desesperada para reverter os efeitos do estalo de Thanos e restaurar o universo, viajando pelo tempo e enfrentando seus passados.',
  },
  'interestelar': {
    title: 'Interestelar',
    year: 2014,
    rating: '8.7',
    genre: 'Ficção Científica',
    duration: '2h 49min',
    director: 'Christopher Nolan',
    embedUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1',
    description:
      'Com a Terra se tornando inabitável, um grupo de astronautas viaja através de um buraco de minhoca recém-descoberto em busca de um novo lar para a humanidade, explorando os limites da física, do tempo e do amor.',
  },
  'o-poderoso-chefao': {
    title: 'O Poderoso Chefão',
    year: 1972,
    rating: '9.2',
    genre: 'Drama',
    duration: '2h 55min',
    director: 'Francis Ford Coppola',
    embedUrl: 'https://www.youtube.com/embed/sY1S34973zA?autoplay=1',
    description:
      'A saga épica da família Corleone, uma das mais poderosas famílias da máfia americana. Quando o patriarca Vito Corleone é baleado, seu filho mais novo Michael é arrastado para o mundo do crime organizado em uma jornada de poder e tragédia.',
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
      <span>&#127775; ${movie.rating} / 10</span>
      <span>&#127916; Dir. ${movie.director}</span>
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
  .card:nth-child(4) { animation-delay: 0.20s; }
  .card:nth-child(5) { animation-delay: 0.25s; }
  .card:nth-child(6) { animation-delay: 0.30s; }
`;
document.head.appendChild(style);
