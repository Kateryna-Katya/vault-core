document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок и анимации
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });

    // 2. Мобильное меню
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (burger && mobileMenu) {
        const toggleMenu = () => mobileMenu.classList.toggle('active');
        burger.addEventListener('click', toggleMenu);
        if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // 3. Математическая капча (Исправлено)
    const captchaText = document.getElementById('captchaText'); // ПРОВЕРЬТЕ ЭТОТ ID В HTML
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 5) + 1;
    const correctSum = n1 + n2;

    if (captchaText) {
        captchaText.innerText = `Сколько будет ${n1} + ${n2}?`;
    }

    // 4. Валидация телефона
    const phone = document.getElementById('phoneInput');
    if (phone) {
        phone.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // 5. Обработка формы
    const form = document.getElementById('mainForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const captchaInput = document.getElementById('captchaAnswer');
            const userAnswer = captchaInput ? parseInt(captchaInput.value) : null;

            if (userAnswer !== correctSum) {
                alert('Неверный ответ на защитный вопрос!');
                return;
            }

            if (status) {
                status.style.display = 'block';
                status.innerHTML = '<span style="color: #166534">Отправка...</span>';
            }

            setTimeout(() => {
                if (status) status.innerHTML = '<span style="color: #166534">Успешно! Мы свяжемся с вами.</span>';
                form.reset();
            }, 2000);
        });
    }

    // 6. Хедер при скролле
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
});