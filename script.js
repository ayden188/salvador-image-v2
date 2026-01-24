/**
 * SALVADOR STUDIO - SCRIPT GLOBAL COMPLET
 * Version Unifiée : Portfolio, Filtres, Parallax, Trail, Time & Animations.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. DONNÉES DU PORTFOLIO
       ========================================== */
    const mesProjets = [
        { id: 1, type: 'video', category: 'video', title: 'Cinematic Fashion', src: 'Screen recording 2026-01-18 02.20.01.webm', poster: 'preview1.jpg' },
        { id: 2, type: 'image', category: 'edito', title: 'Vogue Vision', src: 'salv.Webp' },
        { id: 3, type: 'image', category: 'mode', title: 'Urban Soul', src: 'mode.jpeg' },
        { id: 4, type: 'image', category: 'mode', title: 'Street Style', src: 'mode.jpeg' },
        { id: 5, type: 'image', category: 'mode', title: 'Collection 2026', src: 'mode.jpeg' },
        { id: 6, type: 'image', category: 'edito', title: 'Studio Session', src: 'mode.jpeg' },
        { id: 7, type: 'image', category: 'mode', title: 'Summer Vibe', src: 'mode.jpeg' },
        { id: 8, type: 'video', category: 'video', title: 'Night Life', src: 'Screen recording 2026-01-18 02.20.01.webm', poster: 'preview1.jpg' },
        { id: 9, type: 'image', category: 'mode', title: 'Minimalist', src: 'mode.jpeg' },
        { id: 10, type: 'image', category: 'edito', title: 'Black & White', src: 'mode.jpeg' },
        { id: 11, type: 'image', category: 'mode', title: 'Autumn Look', src: 'mode.jpeg' },
        { id: 12, type: 'image', category: 'mode', title: 'Runway', src: 'mode.jpeg' }
    ];

    /* ==========================================
       2. MOTEUR ET GÉNÉRATION DU PORTFOLIO
       ========================================== */
    function chargerPortfolio() {
        const grille = document.querySelector('.portfolio-masonry');
        if (!grille) return;

        grille.innerHTML = ""; // Nettoyage de sécurité

        mesProjets.forEach((projet, index) => {
            const card = document.createElement('div');
            // Cache les projets après le 15ème pour le Load More
            card.className = `portfolio-card ${index >= 15 ? 'hidden' : 'show'}`;
            card.setAttribute('data-category', projet.category);

            let mediaHTML = "";
            if (projet.type === 'video') {
                mediaHTML = `
                    <div class="video-wrapper">
                        <div class="video-badge">VIDEO</div>
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
        refreshAnimations(); // Active l'observer sur les nouvelles cartes
    }

    // Gestion de la lecture vidéo au survol (Play/Pause)
    function activerHoverVideo() {
        document.querySelectorAll('.portfolio-card').forEach(card => {
            const video = card.querySelector('video');
            if (video) {
                card.addEventListener('mouseenter', () => video.play().catch(() => {}));
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0; 
                });
            }
        });
    }

    /* ==========================================
       3. FILTRES ET BOUTON "LOAD MORE"
       ========================================== */
    const filterContainer = document.querySelector('.portfolio-filters');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            // UI : Bouton actif
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;
            const allCards = document.querySelectorAll('.portfolio-card');

            allCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.classList.remove('hide');
                        card.classList.add('show');
                    }, 10);
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                    setTimeout(() => card.style.display = "none", 500);
                }
            });
        });
    }

    const btnLoadMore = document.querySelector('.btn-load');
    if (btnLoadMore) {
        btnLoadMore.addEventListener('click', () => {
            const projetsCaches = document.querySelectorAll('.portfolio-card.hidden');
            projetsCaches.forEach((projet, index) => {
                setTimeout(() => {
                    projet.classList.replace('hidden', 'show');
                    mainObserver.observe(projet); // On observe pour l'animation
                }, index * 80); 
            });
            btnLoadMore.style.display = 'none';
        });
    }

    const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('apper'); 
                entry.target.classList.add('active');
                mainObserver.unobserve(entry.target); // Une seule fois
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    function refreshAnimations() {
        const targets = document.querySelectorAll('.images img, .portfolio-card, .separator-container ,.separator-text');
        targets.forEach(el => mainObserver.observe(el));
    }
    const sectionHorizontal = document.querySelector('.horizontal-scroll-section');
    const galleryHorizontal = document.querySelector('.parallax-gallery');
    const photoItems = document.querySelectorAll('.photo-item');

    if (sectionHorizontal && galleryHorizontal) {
        window.addEventListener('scroll', () => {
            const offsetTop = sectionHorizontal.offsetTop;
            const scrollDistance = window.pageYOffset - offsetTop;
            const sectionHeight = sectionHorizontal.offsetHeight - window.innerHeight;
            
            if (scrollDistance >= 0 && scrollDistance <= sectionHeight) {
                let progress = scrollDistance / sectionHeight;
                // Calcul du mouvement X
                const moveX = progress * (galleryHorizontal.offsetWidth - window.innerWidth + 200);
                galleryHorizontal.style.transform = `translateX(-${moveX}px)`;

                // Effet de vitesse sur les images individuelles
                photoItems.forEach(item => {
                    const speed = item.getAttribute('data-speed') || 0.1;
                    const img = item.querySelector('img');
                    if(img) img.style.transform = `translateX(${scrollDistance * speed * 0.2}px)`;
                });
            }
        });
    }

    /* ==========================================
       6. TRAIL INTERACTIF (MOUSE MOVE)
       ========================================== */
    const trailSection = document.querySelector('.interactive-transition-section');
    const imagesList = ['mode.jpeg', 'salv.Webp'];
    let lastX = 0, lastY = 0;

    if (trailSection) {
        window.addEventListener("mousemove", (e) => {
            const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
            if (dist > 100) { // Crée une image tous les 100px parcourus
                createTrailImage(e.clientX, e.clientY);
                lastX = e.clientX; 
                lastY = e.clientY;
            }
        });
    }

    function createTrailImage(x, y) {
        const img = document.createElement('img');
        img.src = imagesList[Math.floor(Math.random() * imagesList.length)];
        img.classList.add('trail-image');
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        trailSection.appendChild(img);

        const anim = img.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' }
        ], { duration: 1000, easing: 'ease-out' });

        anim.onfinish = () => img.remove();
    }

    /* ==========================================
       7. UTILITAIRES (HEURE LOMÉ & MENU)
       ========================================== */
    function updateTime() {
        const timeElements = document.querySelectorAll('#footer-time, .sub1');
        const options = { timeZone: 'Africa/Lome', hour: '2-digit', minute: '2-digit', hour12: false };
        const now = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
        
        timeElements.forEach(el => {
            if (el) el.innerHTML = `LOMÉ, TG — ${now} GMT`;
        });
    }

    const navLinks = document.querySelector('.nav-links');
    window.toggleMenu = () => {
        if (navLinks) navLinks.classList.toggle('active');
    };

        const heroSection = document.querySelector('.hero-content');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('loaded');
        }, 100);
    };
const targets = document.querySelectorAll('.images img, .portfolio-card, .service-row, .reveal-img-container, .phi-item');
targets.forEach(el => mainObserver.observe(el));

    chargerPortfolio();     
    refreshAnimations();   
    updateTime();           
    setInterval(updateTime, 1000); 




function reinitScripts() {
    initHero();           
    chargerPortfolio();   // Tes projets
    refreshAnimations();  // Ton Intersection Observer
    updateTime();         // L'heure de Lomé
    setActiveLink();      // Ta classe .active
}

barba.init({
    transitions: [{
        name: 'opacity-transition',
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.in"
            });
        },
        enter(data) {
            window.scrollTo(0, 0);
                        reinitScripts();

            return gsap.from(data.next.container, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }]
});
document.addEventListener('DOMContentLoaded', () => {
    reinitScripts();
});
});