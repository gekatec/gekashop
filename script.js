document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');

    function toggleMenu() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', toggleMenu);
    navClose.addEventListener('click', closeMenu);
    navOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Search functionality
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');

    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Hero slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetSlider();
        });
    });

    startSlider();

    // Product filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Category cards filtering
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const targetFilterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            if (targetFilterBtn) {
                targetFilterBtn.click();
                document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        alert(`Merci de votre inscription avec: ${input.value}! Nous vous contacterons bientot.`);
        input.value = '';
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .category-card, .contact-card, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Quick View Modal
    const productsData = {
        1: {
            name: 'Ordinateur Portable HP ProBook',
            category: 'Ordinateurs',
            price: '285 000 FCFA',
            image: 'images/image (1).png',
            desc: 'Ordinateur portable professionnel HP ProBook, parfait pour le travail bureautique et la productivite. Performance fiable avec un design elegant et durable.',
            features: ['Processeur Intel Core i5 de 11eme generation', '8 Go de RAM DDR4 evoluable', 'SSD 256 Go ultra rapide', 'Ecran 14 pouces Full HD anti-reflet', 'Windows 11 Pro preinstalle', 'Autonomie jusqu\'a 8 heures']
        },
        2: {
            name: 'Imprimante Multifonction Canon',
            category: 'Imprimantes',
            price: '65 000 FCFA',
            image: 'images/image (2).png',
            desc: 'Imprimante multifonction Canon avec impression, copie et numerisation. Connexion Wi-Fi integree pour une utilisation facile depuis tous vos appareils.',
            features: ['Impression, copie et scan 3-en-1', 'Resolution d\'impression 4800 x 1200 dpi', 'Connexion Wi-Fi et USB', 'Impression recto-verso automatique', 'Compatible mobile (AirPrint, Mopria)', 'Ecran LCD intuitif']
        },
        3: {
            name: 'Cartouche d\'Incre HP Originale',
            category: 'Consommables',
            price: '15 000 FCFA',
            image: 'images/image (3).png',
            desc: 'Cartouche d\'encre HP originale haute capacite pour des impressions de qualite professionnelle. Compatible avec les imprimantes HP DeskJet et OfficeJet.',
            features: ['Encre originale HP garantie', 'Haute capacite ~480 pages', 'Noir et couleur disponibles', 'Compatible HP DeskJet & OfficeJet', 'Impressions vives et durables', 'Sechage rapide sans bavure']
        },
        4: {
            name: 'Kit Clavier & Souris Sans Fil',
            category: 'Accessoires',
            price: '12 000 FCFA',
            image: 'images/image (4).png',
            desc: 'Kit clavier et souris sans fil ergonomique avec connexion Bluetooth stable. Confort d\'utilisation optimal pour le travail quotidien.',
            features: ['Connexion Bluetooth 5.0 stable', 'Design ergonomique et compact', 'Touches silencieuses et confortables', 'Autonomie jusqu\'a 12 mois', 'Compatible Windows et Mac', 'Recepteur USB inclus']
        },
        5: {
            name: 'Routeur Wi-Fi 6 Double Bande',
            category: 'Reseau',
            price: '45 000 FCFA',
            image: 'images/image (5).png',
            desc: 'Routeur Wi-Fi 6 haute performance avec double bande pour une connexion rapide et stable. Ideal pour les entreprises et les maisons connectees.',
            features: ['Norme Wi-Fi 6 (802.11ax)', 'Double bande 2.4GHz + 5GHz', 'Debit jusqu\'a 3000 Mbps', '4 ports Gigabit Ethernet', 'Securite WPA3 avancee', 'Couverture jusqu\'a 200m2']
        },
        6: {
            name: 'SSD NVMe M.2 1To',
            category: 'Stockage',
            price: '55 000 FCFA',
            image: 'images/image (6).png',
            desc: 'SSD NVMe M.2 ultra rapide avec 1 To de capacite. Vitesse de lecture exceptionnelle pour un demarrage et des chargements eclair.',
            features: ['Capacite 1 To (1000 Go)', 'Vitesse de lecture 3500 Mo/s', 'Vitesse d\'ecriture 3000 Mo/s', 'Interface PCIe Gen3 x4 NVMe', 'Format M.2 2280 compact', 'Garantie 5 ans constructeur']
        },
        7: {
            name: 'Toner Samsung MLT-D111S',
            category: 'Consommables',
            price: '25 000 FCFA',
            image: 'images/image (7).png',
            desc: 'Toner Samsung original haute capacite pour imprimantes laser Samsung. Rendement optimal pour vos impressions professionnelles quotidiennes.',
            features: ['Toner original Samsung', 'Capacite ~1000 pages', 'Compatible serie M2020/M2070', 'Qualite d\'impression superieure', 'Installation facile et rapide', 'Garantie qualite constructeur']
        },
        8: {
            name: 'Moniteur LED 24" Full HD',
            category: 'Accessoires',
            price: '85 000 FCFA',
            image: 'images/image (8).png',
            desc: 'Ecran LED 24 pouces Full HD avec dalle IPS pour des couleurs fideles et un confort visuel optimal. Connexions HDMI et VGA incluses.',
            features: ['Taille 24 pouces (60 cm)', 'Resolution Full HD 1920x1080', 'Dalle IPS angles larges', 'Connectique HDMI + VGA', 'Luminosite 250 cd/m2', 'Pied inclinable ergonomique']
        },
        9: {
            name: 'Imprimante Laser Brother',
            category: 'Imprimantes',
            price: '95 000 FCFA',
            image: 'images/image (9).png',
            desc: 'Imprimante laser monochrome Brother haute vitesse pour un usage professionnel intensif. Recto-verso automatique et connexion reseau Ethernet.',
            features: ['Impression laser monochrome', 'Vitesse 30 pages/minute', 'Recto-verso automatique', 'Reseau Ethernet + USB', 'Premiere page en 8.5 secondes', 'Toner haute capacite disponible']
        },
        10: {
            name: 'Cle USB 3.0 64Go',
            category: 'Stockage',
            price: '5 000 FCFA',
            image: 'images/image (10).png',
            desc: 'Cle USB 3.0 haute vitesse avec 64 Go de stockage. Design compact et fiable pour transporter vos fichiers en toute securite.',
            features: ['Capacite 64 Go', 'Interface USB 3.0 haut debit', 'Lecture jusqu\'a 100 Mo/s', 'Design compact et resistant', 'Compatible USB 2.0 retroactif', 'Plug & Play sans installation']
        },
        11: {
            name: 'Switch Reseau 8 Ports Gigabit',
            category: 'Reseau',
            price: '35 000 FCFA',
            image: 'images/image (11).png',
            desc: 'Switch reseau manageable 8 ports Gigabit Ethernet. Performance enterprise dans un boitier metal compact, ideal pour les PME.',
            features: ['8 ports Gigabit Ethernet', 'Debit 10/100/1000 Mbps', 'Boitier metal robuste', 'Plug & Play sans configuration', 'Qualite de service QoS', 'Montage rack possible']
        },
        12: {
            name: 'PC de Bureau Dell OptiPlex',
            category: 'Ordinateurs',
            price: '350 000 FCFA',
            image: 'images/image (12).png',
            desc: 'PC de bureau Dell OptiPlex puissant et fiable pour les professionnels. Configuration haute performance avec processeur Intel Core i7.',
            features: ['Processeur Intel Core i7 10eme gen', '16 Go de RAM DDR4', 'SSD 512 Go haute vitesse', 'Windows 11 Pro', 'Format compact et silencieux', 'Garantie constructeur 3 ans']
        },
        13: {
            name: 'Casque Audio Professionnel',
            category: 'Accessoires',
            price: '25 000 FCFA',
            image: 'images/image (13).png',
            desc: 'Casque audio professionnel avec reduction de bruit active et microphone integre. Confort longue duree pour les reunions et le teletravail.',
            features: ['Reduction de bruit active (ANC)', 'Microphone integre haute qualite', 'Coussinets en mousse a memoire', 'Connexion filaire 3.5mm + USB', 'Pliable et transportable', 'Compatible PC, Mac et mobile']
        }
    };

    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalCategory = document.getElementById('modalCategory');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalWhatsapp = document.getElementById('modalWhatsapp');

    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.product;
            const product = productsData[productId];
            if (!product) return;

            modalImg.src = product.image;
            modalImg.alt = product.name;
            modalName.textContent = product.name;
            modalCategory.textContent = product.category;
            modalPrice.textContent = product.price;
            modalDesc.textContent = product.desc;

            modalFeatures.innerHTML = product.features.map(f =>
                `<div class="feature-item-modal"><i class="fas fa-check-circle"></i><span>${f}</span></div>`
            ).join('');

            const message = encodeURIComponent(`Bonjour Gekashop, je suis interesse(e) par ${product.name} a ${product.price}. Pouvez-vous me donner plus de details ?`);
            modalWhatsapp.href = `https://wa.me/22890245941?text=${message}`;

            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
