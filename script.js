// ===== INTRO COUNTDOWN =====
function startIntroCountdown() {
    const introElement = document.getElementById('intro-countdown');
    const numberElement = document.getElementById('countdown-number');
    let count = 3;

    const interval = setInterval(() => {
        count--;

        if (count > 0) {
            numberElement.textContent = count;
            // Reset animation
            numberElement.style.animation = 'none';
            setTimeout(() => {
                numberElement.style.animation = 'pulse 1s ease-in-out';
            }, 10);
        } else {
            clearInterval(interval);
            // Hide intro and show main content
            introElement.classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');

            // Start animations and music
            createConfetti();
            createBalloons();

            // Try to autoplay music
            bgMusic.play().catch(e => {
                console.log('Autoplay prevented. User needs to click play button.');
            });
        }
    }, 1000);
}

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Toggle profile photo visibility
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        if (pageId === 'page-cake') {
            profilePhoto.style.display = 'flex';
        } else {
            profilePhoto.style.display = 'none';
        }
    }
}
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FF6B6B', '#FFFFFF'];

    setInterval(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }, 200);
}

// ===== BALLOON ANIMATION =====
function createBalloons() {
    const container = document.getElementById('balloons-container');
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FF6B6B'];

    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = (Math.random() * 3 + 6) + 's';

        container.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, 9000);
    }, 1500);
}

// ===== BIRTHDAY DISPLAY =====
function displayBirthday() {
    // Set birthday date here (Year, Month index (0-11), Day)
    // Month is 0-indexed, so 0 is January, 11 is December
    // Example: May 15, 1995
    let birthday = new Date(2005, 4, 22);

    const date = birthday.getDate();
    const month = birthday.getMonth() + 1; // Add 1 to display 1-12
    const year = birthday.getFullYear();

    const dateEl = document.getElementById('date');
    const monthEl = document.getElementById('month');
    const yearEl = document.getElementById('year');

    if (dateEl && monthEl && yearEl) {
        dateEl.textContent = String(date).padStart(2, '0');
        monthEl.textContent = String(month).padStart(2, '0');
        yearEl.textContent = year;
    }
}

// ===== BLOW CANDLES =====
function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    const button = document.getElementById('blowCandles');

    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('out');
        }, index * 200);
    });

    button.textContent = '✨ Wish Made! ✨';
    button.style.background = '#FFD700';

    // Create celebration confetti
    createCelebration();

    setTimeout(() => {
        button.textContent = '🎂 Light Candles Again';
        button.style.background = '';

        button.onclick = lightCandles;
    }, 3000);
}

function lightCandles() {
    const flames = document.querySelectorAll('.flame');
    const button = document.getElementById('blowCandles');

    flames.forEach(flame => {
        flame.classList.remove('out');
    });

    button.textContent = 'Blow the Candles! 🎉';
    button.onclick = blowCandles;
}

// ===== CELEBRATION EFFECT =====
function createCelebration() {
    const container = document.getElementById('confetti-container');
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FF6B6B', '#FFFFFF', '#00FF00', '#00FFFF'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

            container.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// ===== MUSIC PLAYER =====
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

// Update button text if it autoplays successfully
bgMusic.addEventListener('play', () => {
    isPlaying = true;
    musicBtn.textContent = '🔇 Pause Music';
});

bgMusic.addEventListener('pause', () => {
    isPlaying = false;
    musicBtn.textContent = '🎵 Play Music';
});

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
    } else {
        bgMusic.play().catch(e => {
            console.log('Audio autoplay prevented. User interaction required.');
        });
    }
});

// Add a fallback for browsers that block autoplay: play music on the first user interaction
const playOnInteraction = () => {
    if (!isPlaying) {
        bgMusic.play().catch(e => console.log('Audio playback still blocked.'));
    }
    // Remove listeners once interaction happens
    document.removeEventListener('click', playOnInteraction);
    document.removeEventListener('touchstart', playOnInteraction);
};

document.addEventListener('click', playOnInteraction);
document.addEventListener('touchstart', playOnInteraction);

// ===== SMOOTH SCROLL =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function setupScrollAnimations() {
    window.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.message-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        window.scrollObserver.observe(el);
    });
}

// ===== PHOTO MODAL =====
function setupPhotoModal() {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!modal || !modalImg || !modalText) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const placeholder = item.querySelector('.photo-placeholder');
            if (placeholder) {
                const bgImage = placeholder.style.backgroundImage;
                const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
                if (urlMatch && urlMatch[1]) {
                    modalImg.src = urlMatch[1];
                }
            }
            
            modalText.textContent = item.getAttribute('data-text') || 'Precious memory';
            modal.classList.remove('hidden');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    // Start intro countdown immediately
    startIntroCountdown();

    displayBirthday();
    setupSmoothScroll();
    setupScrollAnimations();
    setupPhotoModal();

    // Setup blow candles button
    document.getElementById('blowCandles').addEventListener('click', blowCandles);

    // Setup navigation buttons
    document.getElementById('nextToWishes').addEventListener('click', () => {
        showPage('page-wishes');
    });

    document.getElementById('nextToGallery').addEventListener('click', () => {
        showPage('page-gallery');
    });

    document.getElementById('backToWishes').addEventListener('click', () => {
        showPage('page-wishes');
    });

    // Add sparkle effect on mouse move
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            createSparkle(e.clientX, e.clientY);
        }
    });
});

// ===== SPARKLE EFFECT =====
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '5px';
    sparkle.style.height = '5px';
    sparkle.style.backgroundColor = '#FFD700';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.8;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
