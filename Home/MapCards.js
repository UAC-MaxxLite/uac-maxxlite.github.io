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

document.addEventListener('DOMContentLoaded', function () {
    // Create an Intersection Observer to detect when cards are in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate'); // Add animation class for cards entering
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the card is visible
    });

    // Observe all the card elements
    const cards = document.querySelectorAll('.card-base');
    cards.forEach(card => {
        observer.observe(card);
    });
});
