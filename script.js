document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            alert('Menu mobile em desenvolvimento. Navegação via scroll ativada.');
        });
    }

    // Sticky Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }
    });

    // Simple reveal animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.solution-card, .process-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // WhatsApp Form Handler
    const whatsappForm = document.querySelector('.cta-form');
    // If the form exists (it should, but good to check)
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const phoneInput = whatsappForm.querySelector('input[type="tel"]');
            const phoneNumber = phoneInput.value;

            // Basic validation - check if not empty (required attribute handles this mostly, but good for JS logic)
            if (phoneNumber) {
                // Formatting the message
                const message = `Olá, tenho interesse no Provador Virtual. Meu contato é: ${phoneNumber}`;
                const encodedMessage = encodeURIComponent(message);

                // Destination number
                const destinationNumber = '5511938034714';

                // Construct WhatsApp URL
                const whatsappUrl = `https://wa.me/${destinationNumber}?text=${encodedMessage}`;

                // Open in new tab
                window.open(whatsappUrl, '_blank');
            }
        });

        // Input Masking
        const phoneInput = whatsappForm.querySelector('input[type="tel"]');
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            if (value.length > 11) value = value.slice(0, 11); // Limit to 11 digits

            if (value.length > 10) {
                // (XX) XXXXX-XXXX
                value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                // (XX) XXXX-XXXX (incomplete)
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                // (XX) XXXX...
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                // (XX...
                value = value.replace(/^(\d*)/, '($1');
            }

            e.target.value = value;
        });
    }
});
