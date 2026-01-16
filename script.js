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