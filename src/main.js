document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок и анимации
    lucide.createIcons();
    AOS.init({ duration: 1000, once: true });

    // 2. Мобильное меню
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    const toggleMenu = () => mobileMenu.classList.toggle('active');
    
    burger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 3. Математическая капча
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 5) + 1;
    const correctSum = n1 + n2;
    document.getElementById('captchaText').innerText = `Сколько будет ${n1} + ${n2}?`;

    // 4. Валидация телефона (только цифры)
    const phone = document.getElementById('phoneInput');
    phone.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // 5. Обработка формы
    const form = document.getElementById('mainForm');
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userAnswer = parseInt(document.getElementById('captchaAnswer').value);

        if (userAnswer !== correctSum) {
            alert('Неверный ответ на защитный вопрос!');
            return;
        }

        status.style.display = 'block';
        status.innerHTML = '<span style="color: #166534">Отправка...</span>';

        setTimeout(() => {
            status.innerHTML = '<span style="color: #166534">Успешно! Мы свяжемся с вами.</span>';
            form.reset();
        }, 2000);
    });

    // 6. Cookie Popup
    const cookie = document.getElementById('cookiePopup');
    const accept = document.getElementById('acceptCookies');

    if (!localStorage.getItem('vault_cookies')) {
        setTimeout(() => cookie.classList.add('active'), 3000);
    }

    accept.addEventListener('click', () => {
        localStorage.setItem('vault_cookies', 'true');
        cookie.classList.remove('active');
    });

    // 7. Скролл хедера
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});