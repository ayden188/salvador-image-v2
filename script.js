 
document.addEventListener('DOMContentLoaded', () => {

    const mesProjets = [
        { id: 1, type: 'video', category: 'video', title: 'Cinematic Fashion', src: 'Screen recording 2026-01-18 02.20.01.webm', poster: 'preview1.jpg' },
        { id: 2, type: 'image', category: 'edito', title: 'Vogue Vision', src: 'salv.Webp' },
        { id: 3, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },
       { id: 4, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },
        { id: 5, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },
        { id: 6, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },
        { id: 7, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },
        { id: 8, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },
        { id: 10, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },
        { id: 11, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },


    ];

    function chargerPortfolio() {
    const grille = document.querySelector('.portfolio-masonry');
    if (!grille) return;

    grille.innerHTML = ""; 

    mesProjets.forEach((projet, index) => {
        const card = document.createElement('div');
        card.className = `portfolio-card ${index >= 15 ? 'hidden' : 'show'}`;
        card.setAttribute('data-category', projet.category);

        let mediaHTML = "";
        if (projet.type === 'video') {
            mediaHTML = `
                <div class="video-wrapper">
                    <video muted loop playsinline preload="none" poster="${projet.poster}">
                        <source src="${projet.src}" type="video/mp4">
                    </video>
                </div>`;
        } else {
            mediaHTML = `<img src="${projet.src}" alt="${projet.title}" loading="lazy">`;
        }

        card.innerHTML = `
            ${mediaHTML}
            <div class="card-infos">
                <span>${projet.category.toUpperCase()}</span>
                <h3>${projet.title}</h3>
            </div>
        `;
        grille.appendChild(card);
    });

    activerHoverVideo();
}

    chargerPortfolio();
    
const btnLoadMore = document.querySelector('.btn-load');

if (btnLoadMore) {
    btnLoadMore.addEventListener('click', () => {
        const projetsCaches = document.querySelectorAll('.portfolio-card.hidden');
        
        projetsCaches.forEach((projet, index) => {
            setTimeout(() => {
                projet.classList.remove('hidden');
                projet.classList.add('show');
            }, index * 50); 
        });
        btnLoadMore.style.display = 'none';
    });
}


function activerHoverVideo() {
    const videoCards = document.querySelectorAll('.portfolio-card');

    videoCards.forEach(card => {
        const video = card.querySelector('video');
        
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(error => {
                    console.warn("Lecture bloquée par le navigateur :", error);
                });
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; 
            });
        }
    });
}
    const filterContainer = document.querySelector('.portfolio-filters');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;
            const allCards = document.querySelectorAll('.portfolio-card');

            allCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => card.classList.replace('hide', 'show'), 10);
                } else {
                    card.classList.replace('show', 'hide');
                    setTimeout(() => card.style.display = "none", 500); // Attend la fin de l'anim
                }
            });
        });
    }

    const menu = document.querySelector('.nav-links');
    window.toggleMenu = function() { 
        if(menu) menu.classList.toggle('active');
    };

    function updateTime() {
        const footerTime = document.getElementById('footer-time');
        const options = { timeZone: 'Africa/Lome', hour: '2-digit', minute: '2-digit', hour12: false };
        const now = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
        if (footerTime) footerTime.innerHTML = `LOMÉ, TG — ${now} GMT`;
    }
    setInterval(updateTime, 1000);
    updateTime();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); 
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.portfolio-card, .separator-container').forEach(el => observer.observe(el));
});
