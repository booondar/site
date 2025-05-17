// Ожидаем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const form = document.getElementById('feedbackForm');
    const modal = document.getElementById('responseModal');
    const modalMessage = document.getElementById('modalMessage');
    
    // Проверяем существование элементов
    if (!form || !modal || !modalMessage) {
        console.error('Не найдены необходимые элементы на странице');
        return;
    }

    // Функция для закрытия модального окна
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Функция для открытия модального окна
    const openModal = (content) => {
        modalMessage.innerHTML = content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Валидация email
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Валидация полей
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Пожалуйста, введите корректный email');
            return;
        }
        
        // Формируем содержимое для модального окна
        const modalContent = `
            <p><strong>${name}</strong>, мы получили ваше сообщение!</p>
            <p>На адрес <strong>${email}</strong> скоро придёт ответ.</p>
            <div class="message-preview">
                <p><em>${message}</em></p>
            </div>
        `;
        
        openModal(modalContent);
        form.reset();
    });

    // Закрытие по клику на крестик
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клику на кнопку "Закрыть"
    const closeMainBtn = document.querySelector('.modal-close-btn');
    if (closeMainBtn) {
        closeMainBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});