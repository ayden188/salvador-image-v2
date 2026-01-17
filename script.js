const section = document.querySelector('.horizontal-scroll-section');
const gallery = document.querySelector('.parallax-gallery');
const items = document.querySelectorAll('.photo-item');

const observer= new IntersectionObserver((entries) =>{
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('apper')
    }
  });
},{threshold:0.1})
document.querySelectorAll('.images img').forEach(img => observer.observe(img));




const separator = document.querySelector('.separator-container');
const observerSeparator = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            separator.classList.add('active');
        }
    });
}, { threshold: 0.5 }); 

observerSeparator.observe(separator);

window.addEventListener('scroll', () => {
    const offsetTop = section.offsetTop;
    const scrollDistance = window.pageYOffset - offsetTop;
    const sectionHeight = section.offsetHeight - window.innerHeight;
    let progress = scrollDistance / sectionHeight;

    progress = Math.max(0, Math.min(1, progress));

    const moveX = progress * (gallery.offsetWidth - window.innerWidth + 200);
    gallery.style.transform = `translateX(-${moveX}px)`;

    items.forEach(item => {
        const speed = item.getAttribute('data-speed');
        const x = (scrollDistance * speed);
        item.querySelector('img').style.transform = `translateX(${x * 0.2}px)`;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const hoverSpots = document.querySelectorAll('.hover-spot');
    const mouseFollower = document.getElementById('mouse-follower-image');

    hoverSpots.forEach(spot => {
        spot.addEventListener('mouseenter', () => {
            const imageUrl = spot.getAttribute('data-img');
            mouseFollower.style.backgroundImage = `url('${imageUrl}')`;
            mouseFollower.style.opacity = 1;
        });

        spot.addEventListener('mouseleave', () => {
            mouseFollower.style.opacity = 0;
        });
    });

    document.addEventListener('mousemove', (e) => {
        mouseFollower.style.left = `${e.clientX}px`;
        mouseFollower.style.top = `${e.clientY}px`;
    });
});


const trail = document.querySelector('.interactive-transition-section');

const images = [
  'mode.jpeg',
  'salv.Webp',
  'pexels-alex-andrews-271121-1203803.WebP',
];

// throttle : pour éviter de créer 100 images par seconde (meilleure performance)
let lastMouseX = 0;
let lastMouseY = 0;

window.addEventListener("mousemove", (e) => {
  // On ne crée une image que si la souris a bougé d'au moins 50px
  const distance = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
  
  if (distance > 50) {
    createImage(e.clientX, e.clientY);
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }
});

function createImage(x, y) {
  const img = document.createElement('img');
  const RandomIMG = images[Math.floor(Math.random() * images.length)];
  
  img.src = RandomIMG;
  img.classList.add('trail-image'); // Utilisez une classe CSS pour le style de base
  
  // Positionnement (Centrer l'image sur le curseur)
  img.style.left = x + "px";
  img.style.top = y + "px"; // Correction : c'était "x" dans votre code

  trail.appendChild(img); // Correction : on ajoute l'élément img, pas la string "img"

  // Animation fluide avec Web Animations API (plus performant que setInterval)
  const animation = img.animate([
    { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
    { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });

  animation.onfinish = () => img.remove();
}