document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Toggle Mobile Menu
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate Hamburger
        const bars = document.querySelectorAll('.bar');
        bars[0].classList.toggle('rotate-45');
        bars[1].classList.toggle('opacity-0');
        bars[2].classList.toggle('rotate--45');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentGallery = [];
    let currentIndex = 0;

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const mainImg = item.querySelector('img');
            const hiddenImgs = item.querySelectorAll('.hidden-images img');
            
            currentGallery = [];
            if (mainImg) currentGallery.push(mainImg.src);
            hiddenImgs.forEach(img => currentGallery.push(img.src));

            if (currentGallery.length > 0) {
                currentIndex = 0;
                showLightbox();
            }
        });
    });

    function showLightbox() {
        console.log('Opening lightbox with gallery:', currentGallery);
        lightboxImg.src = currentGallery[currentIndex];
        lightbox.style.display = 'flex';
        
        // Ensure nav buttons are visible if there are multiple images
        if (currentGallery.length > 1) {
            prevBtn.style.setProperty('display', 'block', 'important');
            nextBtn.style.setProperty('display', 'block', 'important');
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentGallery.length;
        lightboxImg.src = currentGallery[currentIndex];
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        lightboxImg.src = currentGallery[currentIndex];
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Simple Form Submission
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(quoteForm);
            const name = formData.get('name');
            
            // In a real static site, you might use Formspree or Netlify Forms
            alert(`Thank you, ${name}! Your request has been sent. We will contact you soon.`);
            quoteForm.reset();
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
