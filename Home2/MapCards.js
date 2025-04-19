function autoResizeText(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
        el.style.fontSize = ''; // Reset any previous inline font size
        const parent = el.parentElement;
        const minFontSize = 5; // Minimum font size
        let fontSize = 20; // Starting font size

        // Apply font size shrinking until the text fits both width and height
        while (el.scrollWidth > parent.offsetWidth || el.scrollHeight > parent.offsetHeight) {
            fontSize -= 1.5;
            el.style.fontSize = fontSize + 'px';

            // Stop if the font size is too small
            if (fontSize <= minFontSize) {
                break;
            }
        }
    });
}

// Apply auto-resize for h1 and card-middle-text-back
window.addEventListener('load', () => {
    autoResizeText('h1.card-text, .card-middle-text-back');
});

window.addEventListener('resize', () => {
    autoResizeText('h1.card-text, .card-middle-text-back');
});

document.querySelectorAll('.card-base').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const slideTextBackgrounds = document.querySelectorAll('.slide-text-background');
const dotsContainer = document.querySelector('.slider-dots');
const totalSlides = slides.length;

function goToSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    // Slide transition
    document.querySelector('.slider-track').style.transform = `translateX(-${currentIndex * 100}%)`;

    // Reset all backgrounds and text
    slideTextBackgrounds.forEach(bg => {
        bg.style.top = '-100%';
        const mainText = bg.querySelector('.slide-text');
        const smallText = bg.querySelector('.slide-text-small');
        if (mainText) {
            mainText.style.top = '-50%';
            mainText.style.opacity = 0; // Reset opacity
        }
        if (smallText) {
            smallText.style.top = '-50%';
            smallText.style.opacity = 0; // Reset opacity
        }
    });

    // Animate the selected slide
    setTimeout(() => {
        const activeBg = slideTextBackgrounds[currentIndex];
        activeBg.style.top = '-2%'; // Bring background up

        const mainText = activeBg.querySelector('.slide-text');
        const smallText = activeBg.querySelector('.slide-text-small');

        // Delay text animations
        if (mainText) {
            setTimeout(() => {
                mainText.style.top = '0';  // Slide text down
                mainText.style.opacity = 1; // Fade in text
            }, 1000); // First text delay
        }

        if (smallText) {
            setTimeout(() => {
                smallText.style.top = '0';  // Slide text down
                smallText.style.opacity = 1; // Fade in text
            }, 1500); // Second text delay (0.5s later)
        }

    }, 300); // Delay start of animation after slide transition

    updateActiveDot();
}

function updateActiveDot() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    updateActiveDot();
}

document.querySelector('.slider-arrow.left').addEventListener('click', () => goToSlide(currentIndex - 1));
document.querySelector('.slider-arrow.right').addEventListener('click', () => goToSlide(currentIndex + 1));

createDots();
goToSlide(currentIndex);