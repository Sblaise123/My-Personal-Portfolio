// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active nav link highlighting with 3D effect
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '#e4e6ea';
        link.style.transform = 'translateY(0)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#61dafb';
            link.style.transform = 'translateY(-2px)';
        }
    });
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.hero-content');
    const speed = scrolled * 0.1;
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px) rotateX(${scrolled * 0.01}deg)`;
    }
});

// Interactive cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '6px';
    cursor.style.height = '6px';
    cursor.style.background = 'rgba(97, 218, 251, 0.6)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.animation = 'cursorFade 1s ease-out forwards';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Card tilt effect
document.querySelectorAll('.project-card, .skill-category').forEach(card => {
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
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Navbar hide/show on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero-content .subtitle');
const text = 'Fullstack Engineer';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        subtitle.textContent = text.substring(0, i + 1) + '|';
        i++;
        setTimeout(typeWriter, 150);
    } else {
        subtitle.textContent = text;
    }
}

setTimeout(typeWriter, 2000);

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events for better performance
const throttledScrollHandler = throttle(() => {
    // Parallax and other scroll effects can be added here if needed
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial classes for animations
    const elementsToAnimate = document.querySelectorAll('.hero-content > *');
    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Preload images and optimize performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// Add window resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Handle responsive layout adjustments if needed
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable heavy animations on mobile for performance
        document.querySelector('.particles').style.display = 'none';
    } else {
        document.querySelector('.particles').style.display = 'block';
    }
}, 250));

// Intersection Observer for skill tags animation
const skillTagsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag, .tech-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

// Apply animation to skill and tech tags
document.querySelectorAll('.skill-category, .project-card').forEach(section => {
    const tags = section.querySelectorAll('.skill-tag, .tech-tag');
    tags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';
        tag.style.transition = 'all 0.3s ease';
    });
    skillTagsObserver.observe(section);
});

// Enhanced button interaction effects
document.querySelectorAll('.btn, .contact-links a').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('btn-primary') 
            ? 'translateY(-5px) rotateX(10deg)' 
            : 'translateY(-5px) rotateX(-10deg)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-2px) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = this.classList.contains('btn-primary') 
            ? 'translateY(-5px) rotateX(10deg)' 
            : 'translateY(-5px) rotateX(-10deg)';
    });
});

// Add smooth loading transition
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});