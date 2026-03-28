/**
 * NARAIL E-SPORTS - Premium Gaming Website JavaScript
 * Features: Scroll animations, countdown timer, navbar effects, particles
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initParticles();
    initScrollAnimations();
    initCountdownTimers();
    initCounterAnimation();
    initMobileMenu();
    initFormSubmission();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Floating particles background
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning and animation
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 * 10) + 's';
 + Math.random()        
        // Vary particle sizes
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Vary colors between cyan and purple
        if (Math.random() > 0.5) {
            particle.style.background = 'var(--accent-color)';
            particle.style.boxShadow = '0 0 10px var(--accent-color)';
        }
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Scroll-based reveal animations
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                // Add delay if specified
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('revealed');
                }, delay);
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

/**
 * Countdown timers for tournaments
 */
function initCountdownTimers() {
    // Tournament 1 - 7 days from now
    const tournament1Date = new Date();
    tournament1Date.setDate(tournament1Date.getDate() + 7);
    
    // Tournament 2 - 14 days from now
    const tournament2Date = new Date();
    tournament2Date.setDate(tournament2Date.getDate() + 14);
    
    // Tournament 3 - 21 days from now
    const tournament3Date = new Date();
    tournament3Date.setDate(tournament3Date.getDate() + 21);
    
    updateCountdown('days1', 'hours1', 'minutes1', 'seconds1', tournament1Date);
    updateCountdown('days2', 'hours2', 'minutes2', 'seconds2', tournament2Date);
    updateCountdown('days3', 'hours3', 'minutes3', 'seconds3', tournament3Date);
    
    // Update every second
    setInterval(() => {
        updateCountdown('days1', 'hours1', 'minutes1', 'seconds1', tournament1Date);
        updateCountdown('days2', 'hours2', 'minutes2', 'seconds2', tournament2Date);
        updateCountdown('days3', 'hours3', 'minutes3', 'seconds3', tournament3Date);
    }, 1000);
}

function updateCountdown(daysId, hoursId, minutesId, secondsId, targetDate) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    if (distance < 0) {
        document.getElementById(daysId).textContent = '00';
        document.getElementById(hoursId).textContent = '00';
        document.getElementById(minutesId).textContent = '00';
        document.getElementById(secondsId).textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById(daysId).textContent = String(days).padStart(2, '0');
    document.getElementById(hoursId).textContent = String(hours).padStart(2, '0');
    document.getElementById(minutesId).textContent = String(minutes).padStart(2, '0');
    document.getElementById(secondsId).textContent = String(seconds).padStart(2, '0');
}

/**
 * Counter animation for stats
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Trigger when stats section is visible
    const statsSection = document.querySelector('.hero-stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

/**
 * Form submission handler
 */
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (name && email && message) {
                // Show success message (in real app, send to server)
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            }
        });
    }
}

/**
 * Live viewer count simulation
 */
function simulateLiveViewers() {
    const viewerCount = document.getElementById('viewerCount');
    
    if (viewerCount) {
        let count = 12450;
        
        setInterval(() => {
            // Randomly increase or decrease viewers
            const change = Math.floor(Math.random() * 20) - 8;
            count += change;
            
            // Format with commas
            viewerCount.textContent = count.toLocaleString();
        }, 3000);
    }
}

// Initialize viewer simulation
simulateLiveViewers();

/**
 * Button click ripple effect
 */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Gallery hover effect
 */
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

/**
 * Team card 3D tilt effect
 */
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

/**
 * Play button interaction
 */
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', function() {
        // In a real implementation, this would start the video stream
        this.innerHTML = '<span>⏸</span>';
        this.classList.add('playing');
        
        setTimeout(() => {
            this.innerHTML = '<span>▶</span>';
            this.classList.remove('playing');
        }, 3000);
    });
}

/**
 * Social link hover effects
 */
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const platform = this.getAttribute('data-platform');
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
