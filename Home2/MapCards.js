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