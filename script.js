// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Animation des compteurs
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 secondes
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Navigation smooth
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Menu mobile amélioré
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navigation = document.querySelector('.navigation');
        
        if (menuToggle && navigation) {
            menuToggle.addEventListener('click', function() {
                navigation.classList.toggle('active');
                menuToggle.classList.toggle('active');
                
                // Empêcher le scroll du body quand le menu est ouvert
                if (navigation.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Fermer le menu quand on clique sur un lien
            const navLinks = navigation.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navigation.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Fermer le menu en cliquant à l'extérieur
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navigation.contains(e.target)) {
                    navigation.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    // Header avec effet de scroll
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Ajouter/supprimer la classe scrolled
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Effet de masquage/affichage du header au scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll vers le bas - masquer le header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll vers le haut - afficher le header
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Animation au scroll améliorée
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animation en cascade pour les éléments enfants
                    const children = entry.target.querySelectorAll('.property-card, .service-card, .contact-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observer les éléments à animer
        const elementsToAnimate = document.querySelectorAll('.properties-grid, .services-grid, .contact-content');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Validation du formulaire améliorée
    function initFormValidation() {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            const inputs = form.querySelectorAll('input, textarea');
            
            // Animation des labels
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
            });
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                // Simulation d'envoi avec animation
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                submitBtn.style.background = 'var(--primary-color)';
                submitBtn.style.color = 'var(--white)';
                
                setTimeout(() => {
                    // Créer une notification de succès
                    const notification = document.createElement('div');
                    notification.className = 'success-notification';
                    notification.innerHTML = `
                        <div class="notification-content">
                            <span>✅</span>
                            <p>Message envoyé avec succès ! Nous vous contacterons bientôt.</p>
                        </div>
                    `;
                    document.body.appendChild(notification);
                    
                    // Afficher la notification
                    setTimeout(() => {
                        notification.classList.add('show');
                    }, 100);
                    
                    // Masquer la notification après 3 secondes
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            notification.remove();
                        }, 300);
                    }, 3000);
                    
                    // Réinitialiser le bouton
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    this.reset();
                }, 2000);
            });
        }
    }
    
    // Effet de parallaxe amélioré
    function initParallax() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Animation des cartes de propriétés améliorée
    function initPropertyCards() {
        const propertyCards = document.querySelectorAll('.property-card');
        
        propertyCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Animation des boutons améliorée
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.cta-button, .property-btn, .submit-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Créer un effet de ripple amélioré
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Initialiser toutes les fonctions
    function init() {
        // Attendre un peu avant de démarrer les animations
        setTimeout(() => {
            animateCounters();
        }, 500);
        
        initSmoothScroll();
        initMobileMenu();
        initHeaderScroll();
        initScrollAnimations();
        initFormValidation();
        initParallax();
        initPropertyCards();
        initButtonAnimations();
    }
    
    // Démarrer l'application
    init();
    
    // Ajouter des styles CSS pour les animations améliorées
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .success-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10000;
        }
        
        .success-notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-content span {
            font-size: 1.2rem;
        }
        
        .form-group.focused input,
        .form-group.focused textarea {
            border-color: var(--secondary-color);
            box-shadow: 0 0 0 3px rgba(227, 176, 75, 0.1);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Animation d'apparition pour les cartes */
        .property-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .property-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}); 