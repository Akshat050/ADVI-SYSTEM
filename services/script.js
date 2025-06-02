// Initialize Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        effect: 'fade',
        speed: 1000,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionStart: function() {
                // Reset animations for the new slide
                const activeSlide = this.slides[this.activeIndex];
                const elements = activeSlide.querySelectorAll('.quote-icon, .testimonial-content p, .author-image, .author-info');
                
                elements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = null;
                });
            }
        }
    });

    // Profile Image Popup
    const authorImages = document.querySelectorAll('.author-image');
    authorImages.forEach(image => {
        image.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const authorName = this.nextElementSibling.querySelector('h4').textContent;
            const authorTitle = this.nextElementSibling.querySelector('p').textContent;
            
            // Create popup
            const popup = document.createElement('div');
            popup.className = 'profile-popup';
            popup.innerHTML = `
                <div class="popup-content">
                    <button class="close-popup">&times;</button>
                    <div class="popup-image">
                        <img src="${imgSrc}" alt="${authorName}">
                    </div>
                    <div class="popup-info">
                        <h3>${authorName}</h3>
                        <p>${authorTitle}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            // Add animation class
            setTimeout(() => popup.classList.add('active'), 10);
            
            // Close popup
            popup.querySelector('.close-popup').addEventListener('click', () => {
                popup.classList.remove('active');
                setTimeout(() => popup.remove(), 300);
            });
            
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.classList.remove('active');
                    setTimeout(() => popup.remove(), 300);
                }
            });
        });
    });
}); 