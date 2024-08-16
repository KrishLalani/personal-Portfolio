document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const contactForm = document.getElementById('contact-form');
    const scrollToTopBtn = document.getElementById("scrollToTop");
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Highlight active section in navigation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-primary');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-primary');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Typewriter effect
    const typewriter = document.querySelector('.typewriter');
    const text = "Backend Devloper & Data Analyst";
    let i = 0;

    function typeEffect() {
        if (i < text.length) {
            typewriter.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeEffect, 100);
        }
    }

    typeEffect();

    // Scroll to top button
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    };

    scrollToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Animate on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    document.querySelectorAll('section > *').forEach(el => {
        scrollObserver.observe(el);
    });
});


// Certificate section
const viewMoreBtn = document.getElementById('viewMoreBtn');
const certificateGrid = document.getElementById('certificateGrid');
const allCertificates = [
    { img: 'path/to/certificate1.jpg', title: 'Web Development', description: 'Advanced JavaScript - Udemy' },
    { img: 'path/to/certificate2.jpg', title: 'Data Analysis', description: 'Python for Data Science - Coursera' },
    { img: 'path/to/certificate3.jpg', title: 'Machine Learning', description: 'Introduction to ML - Stanford Online' },
    // Add more certificates as needed
];

let currentlyShown = 0;

function loadMoreCertificates() {
    for (let i = currentlyShown; i < currentlyShown + 3 && i < allCertificates.length; i++) {
        const cert = allCertificates[i];
        const certElement = document.createElement('div');
        certElement.className = 'bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300';
        certElement.innerHTML = `
            <img src="${cert.img}" alt="${cert.title}" class="w-full h-48 object-cover mb-4 rounded">
            <h3 class="text-xl font-semibold mb-2 text-primary">${cert.title}</h3>
            <p>${cert.description}</p>
        `;
        certificateGrid.appendChild(certElement);
    }
    currentlyShown += 3;
    if (currentlyShown >= allCertificates.length) {
        viewMoreBtn.style.display = 'none';
    }
}

viewMoreBtn.addEventListener('click', loadMoreCertificates);
loadMoreCertificates(); // Load initial certificates

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    htmlElement.classList.toggle('light');
});




document.addEventListener('DOMContentLoaded', () => {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const certificateGrid = document.getElementById('certificateGrid');
    const allCertificates = [
        // Add all certificate objects here
        { img: 'path/to/certificate1.jpg', title: 'Web Development', description: 'Advanced JavaScript - Udemy' },
        // ... more certificates
    ];
    
    let currentlyShown = 3;

    viewMoreBtn.addEventListener('click', () => {
        for (let i = currentlyShown; i < currentlyShown + 3 && i < allCertificates.length; i++) {
            const cert = allCertificates[i];
            const certElement = document.createElement('div');
            certElement.className = 'bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300';
            certElement.innerHTML = `
                <img src="${cert.img}" alt="${cert.title}" class="w-full h-48 object-cover mb-4 rounded">
                <h3 class="text-xl font-semibold mb-2 text-primary">${cert.title}</h3>
                <p>${cert.description}</p>
            `;
            certificateGrid.appendChild(certElement);
        }
        currentlyShown += 3;
        if (currentlyShown >= allCertificates.length) {
            viewMoreBtn.style.display = 'none';
        }
    });
});


particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
            },
            retina_detect: true
        });
        let slideIndex = 0;
        showSlides();
    
        function showSlides() {
            let slides = document.querySelectorAll(".slide");
            slides.forEach(slide => slide.style.display = "none");
    
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 3000); // Change image every 3 seconds
        }