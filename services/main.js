document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);

    // Hide loading animation after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        }, 500);
    });

    // Initialize category filtering with enhanced animations
    const categoryButtons = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state with ripple effect
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter services with enhanced animations
            const category = button.dataset.category;
            serviceCards.forEach((card, index) => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) rotateX(0)';
                    }, 50 + index * 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) rotateX(10deg)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize pricing toggle with enhanced animations
    const pricingToggle = document.querySelector('.pricing-toggle input');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');
    const pricePeriods = document.querySelectorAll('.price-period');
    const saveBadges = document.querySelectorAll('.save-badge');
    const pricingCards = document.querySelectorAll('.pricing-card');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', () => {
            const isYearly = pricingToggle.checked;
            
            // Animate pricing cards
            pricingCards.forEach((card, index) => {
                card.style.transform = `scale(${isYearly ? 1.05 : 1}) translateY(-10px)`;
                setTimeout(() => {
                    card.style.transform = isYearly ? 'scale(1.05)' : 'scale(1)';
                }, 300);
            });

            // Toggle prices with fade effect
            monthlyPrices.forEach(price => { price.style.display = isYearly ? 'none' : 'inline'; });
            yearlyPrices.forEach(price => { price.style.display = isYearly ? 'inline' : 'none'; });
            pricePeriods.forEach(period => { period.textContent = isYearly ? 'year' : 'month'; });

            // Animate save badges
            saveBadges.forEach(badge => {
                badge.style.transform = isYearly ? 'scale(1)' : 'scale(0)';
                badge.style.display = isYearly ? 'inline-block' : 'none';
            });
        });
    }

    // Initialize scroll animations with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.transform = 'translateY(0) rotateX(0)';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .pricing-card').forEach(element => {
        observer.observe(element);
    });

    // Initialize service card hover effects with 3D transform
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Initialize pricing card hover effects
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (!card.classList.contains('featured')) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            }
        });
    });

    // Initialize smooth scroll with enhanced behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.services-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Add typing effect to hero text
    const heroTitle = document.querySelector('.services-hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }

    // Show all service cards on initial load
    // serviceCards.forEach(card => {
    //     card.style.display = 'block';
    //     card.style.opacity = '1';
    //     card.style.transform = 'translateY(0) rotateX(0)';
    //     // Make sure all children of service cards are visible
    //     Array.from(card.children).forEach(child => {
    //         child.style.opacity = '1';
    //         child.style.transform = 'none';
    //     });
    // });
}); 