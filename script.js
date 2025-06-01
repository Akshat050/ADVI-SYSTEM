// Navbar scroll effect
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Animate on scroll
const animateElements = document.querySelectorAll('[data-aos]');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    observer.observe(element);
});

// Contact Form AJAX Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    const feedback = contactForm.querySelector('.form-feedback');
    button.disabled = true;
    button.querySelector('.button-text').textContent = 'Sending...';
    feedback.textContent = '';
    feedback.style.color = '';

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      subject: contactForm.subject.value.trim(),
      message: contactForm.message.value.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        feedback.textContent = data.message || 'Message sent!';
        feedback.style.color = '#27ae60';
        contactForm.reset();
      } else {
        feedback.textContent = data.error || 'Failed to send message.';
        feedback.style.color = '#e74c3c';
      }
    } catch (err) {
      feedback.textContent = 'Network error. Please try again later.';
      feedback.style.color = '#e74c3c';
    }
    button.disabled = false;
    button.querySelector('.button-text').textContent = 'Send Message';
  });
}

// Cookie Consent
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const customizeCookies = document.getElementById('customizeCookies');

// Check if user has already made a choice
if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 1000);
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieConsent.classList.remove('show');
});

customizeCookies.addEventListener('click', () => {
    // Here you would typically show a modal with cookie preferences
    // For now, we'll just accept all cookies
    localStorage.setItem('cookieConsent', 'customized');
    cookieConsent.classList.remove('show');
});

// Hero Section Animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP animations
    const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    // Animate hero content
    heroTimeline
        .to('.hero h1 .line', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        })
        .to('.hero p', {
            opacity: 1,
            y: 0,
            duration: 1
        }, '-=0.5')
        .to('.hero-buttons', {
            opacity: 1,
            y: 0,
            duration: 1
        }, '-=0.5');

    // Parallax effect for shapes
    gsap.to('.shape1', {
        y: '20%',
        x: '10%',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.shape2', {
        y: '-20%',
        x: '-10%',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.shape3', {
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Floating cards animation
    gsap.to('.card1', {
        y: '20px',
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.card2', {
        y: '-20px',
        rotation: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Parallax effect for hero image
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        gsap.to('.parallax-image', {
            rotationY: moveX,
            rotationX: -moveY,
            duration: 1,
            ease: 'power2.out'
        });
    });
});

// Service Cards 3D Tilt Effect
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Scroll Animation for Service Cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

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