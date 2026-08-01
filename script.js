document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Stars Background
    const starsContainer = document.getElementById('stars');
    const starsCount = 100;
    for (let i = 0; i < starsCount; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        
        let size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 3) + 's';
        
        starsContainer.appendChild(star);
    }

    // 2. Elements & Interaction Logic
    const giftContainer = document.getElementById('gift-container');
    const giftBox = document.getElementById('gift-box');
    const hintText = document.getElementById('click-text');
    const certContainer = document.getElementById('cert-container');
    const certificate = document.getElementById('certificate');
    
    let isOpened = false;

    // Attach click to the whole container so clicking the text OR the box works
    giftContainer.addEventListener('click', () => {
        if (isOpened) return;
        isOpened = true;

        if (navigator.vibrate) {
            navigator.vibrate(100);
        }

        // Плавное исчезновение и полное удаление текста
        hintText.style.opacity = '0';
        setTimeout(() => {
            hintText.style.display = 'none';
        }, 500);
        
        giftBox.classList.add('jump');

        setTimeout(() => {
            giftBox.classList.remove('jump');
            giftBox.classList.add('opened');
            
            fireConfetti();
            
            certContainer.style.display = 'block';
            void certificate.offsetWidth;
            certificate.classList.add('show');

            setTimeout(() => {
                document.getElementById('text-hbd').classList.add('visible');
            }, 1800);

            setTimeout(() => {
                document.getElementById('text-dad').classList.add('visible');
            }, 2500);

            setTimeout(() => {
                document.getElementById('text-wish').classList.add('visible');
            }, 3800);

        }, 400);
    });

    function fireConfetti() {
        const duration = 4000;
        const end = Date.now() + duration;
        const colors = ['#FFD700', '#FF4500', '#00008B', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: colors,
                zIndex: 100
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: colors,
                zIndex: 100
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            } else {
                confetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: colors,
                    zIndex: 100
                });
            }
        }());
    }
});
