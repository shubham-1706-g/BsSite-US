// Enhanced Site Animations & Interactions
document.addEventListener("DOMContentLoaded", () => {
    // Page Transition Animations
    const initPageTransitions = () => {
        // Add page load animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);

        // Handle all internal links for smooth transitions
        const internalLinks = document.querySelectorAll('a[href^="pages/"], a[href^="../"], a[href^="./"], a[href^="#"], a[href="index.html"]');
        
        internalLinks.forEach(link => {
            // Skip anchor links for smooth scrolling
            if (link.getAttribute('href').startsWith('#')) return;
            
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only animate if it's a different page
                if (!href.includes('#') && href !== window.location.pathname) {
                    e.preventDefault();
                    
                    // Add exit animation
                    document.body.style.opacity = '0';
                    document.body.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
    };

    // Smooth Scrolling for Anchor Links
    const initSmoothScrolling = () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Add highlight animation to target element
                    targetElement.style.transition = 'all 0.3s ease';
                    targetElement.style.transform = 'scale(1.02)';
                    
                    setTimeout(() => {
                        targetElement.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        });
    };

    // Enhanced Button Animations
    const initButtonAnimations = () => {
        const buttons = document.querySelectorAll('.btn, .service-card, .sector-card, .value-card');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
            
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(-1px) scale(0.98)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-2px)';
            });
        });
    };

    // Scroll-triggered Animations
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('animate-in');
                    
                    // Add staggered animation for child elements
                    const children = element.querySelectorAll('.service-card, .sector-card, .value-card, .stat-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe sections and cards
        const elementsToAnimate = document.querySelectorAll('.section, .about-row, .service-card, .sector-card, .value-card');
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-ready');
            animateOnScroll.observe(el);
        });
    };

    // Enhanced Carousel Animations
    const initCarouselAnimations = () => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            // Let CSS animation handle the hero content entrance
            // Remove any conflicting inline styles
            heroContent.style.opacity = '';
            heroContent.style.transform = '';
            heroContent.style.transition = '';
        }

        // Enhanced carousel dots animation
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    left: 50%;
                    top: 50%;
                    width: 20px;
                    height: 20px;
                    margin-left: -10px;
                    margin-top: -10px;
                `;
                
                dot.style.position = 'relative';
                dot.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
    };

    // Parallax Effect for Hero Sections (disabled on mobile)
    const initParallaxEffect = () => {
        // Skip parallax on mobile devices for better performance
        if (window.innerWidth <= 768) return;
        
        const heroSections = document.querySelectorAll('.hero');
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            heroSections.forEach(hero => {
                const rate = scrolled * -0.3; // Reduced intensity
                hero.style.transform = `translateY(${rate}px)`;
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize all animations (skip heavy animations if user prefers reduced motion)
    initPageTransitions();
    initSmoothScrolling();
    initButtonAnimations();
    
    if (!prefersReducedMotion) {
        initScrollAnimations();
        initCarouselAnimations();
        initParallaxEffect();
    } else {
        // Add immediate visibility for reduced motion users
        document.querySelectorAll('.animate-ready').forEach(el => {
            el.classList.add('animate-in');
        });
    }
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const sideNav = document.querySelector(".side-nav");
    const navOverlay = document.querySelector(".nav-overlay");
    const sideNavDropdowns = document.querySelectorAll(".side-nav-dropdown");
    const navbar = document.getElementById('smart-navbar');
    let lastScrollTop = 0;
    let isScrolling = false;
    let timeoutId = null;

    // Smart Navbar Visibility (consolidated)
    const handleNavbarVisibility = () => {
        const scrollTop = window.pageYOffset;
        const isScrollingDown = lastScrollTop < scrollTop;
        const isAtTop = scrollTop < 10;
        const isAtBottom = window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 100;

        // Clear existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Show navbar at top and bottom of page
        if (isAtTop || isAtBottom) {
            navbar.classList.remove('navbar--hidden');
        } else if (!isAtTop && !isAtBottom && isScrollingDown && scrollTop > 80) {
            navbar.classList.add('navbar--hidden');
        } else {
            navbar.classList.remove('navbar--hidden');
        }

        // Set timeout to show navbar after 3 seconds of no scrolling
        timeoutId = setTimeout(() => {
            navbar.classList.remove('navbar--hidden');
        }, 3000);

        lastScrollTop = scrollTop;
        isScrolling = false;
    };

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleNavbarVisibility();
            });
            isScrolling = true;
        }
    });

    // Mobile Navigation
    const toggleMobileNav = () => {
        sideNav.classList.toggle("active");
        navOverlay.classList.toggle("active");
        document.body.style.overflow = sideNav.classList.contains("active") ? "hidden" : "";
    };

    mobileNavToggle.addEventListener("click", toggleMobileNav);
    navOverlay.addEventListener("click", toggleMobileNav);

    // Side Navigation Dropdowns
    sideNavDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector(".side-nav-item");

        trigger.addEventListener("click", () => {
            const isActive = dropdown.classList.contains("active");

            // Close other dropdowns
            sideNavDropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove("active");
                }
            });

            dropdown.classList.toggle("active");

            // Rotate chevron icon
            const icon = trigger.querySelector(".fas.fa-chevron-down");
            if (icon) {
                icon.style.transform = isActive ? "rotate(0deg)" : "rotate(180deg)";
            }
        });
    });

    // Handle keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sideNav.classList.contains("active")) {
            toggleMobileNav();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1024 && sideNav.classList.contains("active")) {
                toggleMobileNav();
            }
        }, 250);
    });

    // Handle touch events for better mobile experience
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 100;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance < 0 && !sideNav.classList.contains("active")) {
                // Swipe left - open nav
                toggleMobileNav();
            } else if (swipeDistance > 0 && sideNav.classList.contains("active")) {
                // Swipe right - close nav
                toggleMobileNav();
            }
        }
    };

    // Prevent body scroll when side nav is open on iOS
    sideNav.addEventListener("touchmove", (e) => {
        if (sideNav.scrollHeight <= sideNav.clientHeight) {
            e.preventDefault();
        }
    }, { passive: false });

    // Handle smooth scrolling for anchor links (consolidated)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile nav if open
                    if (sideNav.classList.contains("active")) {
                        toggleMobileNav();
                    }

                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Carousel JS
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

    if (!carousel || !slides.length || !dots.length) return;

    // Clone first and last slides for infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Add clones to carousel
    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, slides[0]);

    let currentSlide = 1; // Start from first real slide (after clone)
    let autoSlideInterval;
    let isDragging = false;
    let startX;
    let currentX;
    let slideWidth;
    const totalSlides = slides.length;

    // Initialize and update slide dimensions
    const updateSlideWidth = () => {
        slideWidth = carousel.offsetWidth;
        // Position carousel at first real slide without transition
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    // Initial setup
    updateSlideWidth();

    // Update carousel position with proper dot indication
    const updateCarousel = (transition = true) => {
        carousel.style.transition = transition ? 'transform 0.3s ease-out' : 'none';
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots - account for cloned slides
        const realIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    };

    // Handle infinite loop transitions
    const handleTransitionEnd = () => {
        if (currentSlide === 0) {
            // If we're at the first clone, jump to the last real slide
            carousel.style.transition = 'none';
            currentSlide = totalSlides;
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        } else if (currentSlide === totalSlides + 1) {
            // If we're at the last clone, jump to the first real slide
            carousel.style.transition = 'none';
            currentSlide = 1;
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    };

    // Auto slide functionality
    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            currentSlide++;
            updateCarousel();
        }, 3000);
    };

    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    };

    // Click navigation
    const handleClick = (e) => {
        if (!isDragging) {
            const rect = carousel.getBoundingClientRect();
            const clickX = e.clientX - rect.left;

            if (clickX > rect.width / 2) {
                currentSlide++;
            } else {
                currentSlide--;
            }

            updateCarousel();
            stopAutoSlide();
            startAutoSlide();
        }
    };

    // Drag functionality
    const handleDragStart = (e) => {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        currentX = startX;
        carousel.style.transition = 'none';
        stopAutoSlide();
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();
        currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        const drag = -(currentSlide * slideWidth - diff);
        carousel.style.transform = `translateX(${drag}px)`;
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        isDragging = false;
        const diff = currentX - startX;
        const threshold = slideWidth / 3;

        if (Math.abs(diff) > threshold) {
            currentSlide += diff > 0 ? -1 : 1;
        }

        updateCarousel();
        startAutoSlide();
    };

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index + 1; // Account for cloned slide
            updateCarousel();
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Event listeners
    carousel.addEventListener('click', handleClick);
    carousel.addEventListener('transitionend', handleTransitionEnd);

    // Mouse events
    carousel.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    // Touch events
    carousel.addEventListener('touchstart', handleDragStart, { passive: true });
    carousel.addEventListener('touchmove', handleDragMove, { passive: false });
    carousel.addEventListener('touchend', handleDragEnd);

    // Visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // Window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlideWidth();
            updateCarousel(false);
        }, 250);
    });

    // Start the carousel
    setTimeout(() => {
        carousel.style.transition = 'transform 0.3s ease-out';
        startAutoSlide();
    }, 50);
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.section-title, .section-subtitle, .services-container, .stats-grid, .sectors-grid').forEach(element => {
        observer.observe(element);
    });
});