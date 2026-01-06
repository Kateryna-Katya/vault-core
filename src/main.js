document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация анимаций
    AOS.init({ duration: 1000, once: true });
    lucide.createIcons();

    // 2. Мобильное меню
    const burger = document.getElementById('burgerBtn');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    const toggleMenu = () => mobileMenu.classList.toggle('active');

    burger.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 3. Валидация телефона (только цифры)
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // 4. Математическая капча
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    document.getElementById('captchaQuestion').innerText = `${num1} + ${num2} = ?`;

    // 5. Обработка формы (AJAX имитация)
    const form = document.getElementById('mainForm');
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userAnswer = parseInt(document.getElementById('captchaAnswer').value);

        if (userAnswer !== correctAnswer) {
            alert('Ошибка в капче!');
            return;
        }

        status.innerText = "Отправка...";
        status.className = "form-status success";
        status.style.display = "block";

        setTimeout(() => {
            status.innerText = "Спасибо! Мы свяжемся с вами в ближайшее время.";
            form.reset();
        }, 1500);
    });

    // 6. Cookie Popup
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.remove('active');
    });
});