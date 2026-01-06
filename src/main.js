/**
 * VAULT-CORE.BLOG - CORE ENGINE 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
    let correctCaptchaAnswer = 0;
    const header = document.querySelector('.header');
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    const mainForm = document.getElementById('mainForm');
    const phoneInput = document.getElementById('phoneInput');
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptCookies = document.getElementById('acceptCookies');

    // --- 2. ИНИЦИАЛИЗАЦИЯ ВНЕШНИХ БИБЛИОТЕК ---
    const initLibraries = () => {
        if (window.lucide) lucide.createIcons();
        if (window.AOS) {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }
    };

    // --- 3. ЛОГИКА КАПЧИ ---
    const generateCaptcha = () => {
        const captchaQuestion = document.getElementById('captchaQuestion');
        if (!captchaQuestion) return;

        const num1 = Math.floor(Math.random() * 10) + 2;
        const num2 = Math.floor(Math.random() * 8) + 1;
        correctCaptchaAnswer = num1 + num2;

        captchaQuestion.innerText = `Подтвердите: ${num1} + ${num2} = ?`;
        
        const captchaInput = document.getElementById('captchaAnswer');
        if (captchaInput) captchaInput.value = ''; // Очистка при обновлении
    };

    // --- 4. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ---
    const toggleMobileMenu = () => {
        if (mobileMenu && burger) {
            mobileMenu.classList.toggle('active');
            burger.classList.toggle('open');
            // Блокировка скролла при открытом меню
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
    };

    if (burger) burger.addEventListener('click', toggleMobileMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burger.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- 5. ВАЛИДАЦИЯ ТЕЛЕФОНА (ТОЛЬКО ЦИФРЫ) ---
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // --- 6. ОБРАБОТКА ФОРМЫ (AJAX IMITATION) ---
    if (mainForm) {
        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const captchaInput = document.getElementById('captchaAnswer');
            const statusBox = document.getElementById('formStatus');
            const userValue = captchaInput ? parseInt(captchaInput.value) : null;

            if (userValue !== correctCaptchaAnswer) {
                alert('Неверный результат капчи. Попробуйте еще раз.');
                generateCaptcha();
                return;
            }

            // Имитация отправки
            const submitBtn = mainForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Отправка...';

            setTimeout(() => {
                if (statusBox) {
                    statusBox.style.display = 'block';
                    statusBox.className = 'form-status success';
                    statusBox.innerHTML = '<strong>Готово!</strong> Мы получили ваш запрос и свяжемся с вами в течение 15 минут.';
                }
                
                mainForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                generateCaptcha(); // Обновляем для безопасности
            }, 1800);
        });
    }

    // --- 7. КОНТРОЛЬ СКРОЛЛА (HEADER) ---
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // --- 8. COOKIE POPUP ---
    const checkCookies = () => {
        if (!cookiePopup) return;
        const isAccepted = localStorage.getItem('vault_cookies_accepted');
        
        if (!isAccepted) {
            setTimeout(() => {
                cookiePopup.classList.add('active');
            }, 3000);
        }
    };

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('vault_cookies_accepted', 'true');
            cookiePopup.classList.remove('active');
        });
    }

    // --- 9. ЗАПУСК ВСЕХ ФУНКЦИЙ ---
    initLibraries();
    generateCaptcha();
    checkCookies();
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверка при загрузке
});

/**
 * Исправление для Spline-viewer (Howler Error)
 * Предотвращает падение скрипта, если Spline ищет HowlerGlobal
 */
window.HowlerGlobal = window.HowlerGlobal || {};