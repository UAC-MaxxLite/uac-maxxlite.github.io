
function autoResizeTextInSection(sectionSelector, textSelector) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const elements = section.querySelectorAll(textSelector);
    elements.forEach(el => {
        el.style.fontSize = ''; // Reset any previous inline font size
        const parent = el.parentElement;
        const minFontSize = 5; // Minimum font size
        let fontSize = 20; // Starting font size

        while (el.scrollWidth > parent.offsetWidth || el.scrollHeight > parent.offsetHeight) {
            fontSize -= 1.5;
            el.style.fontSize = fontSize + 'px';
            if (fontSize <= minFontSize) break;
        }
    });
}

function initCardSection() {
    autoResizeTextInSection('.card-section', 'h1.card-text, .card-middle-text-back');

    // Mobile flip on tap
    const cardContainers = document.querySelectorAll('.card-section .card-base');
    cardContainers.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Button hover effect for mobile
    const buttons = document.querySelectorAll('.card-section .card-button1');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.classList.add('hovered');
        });
        button.addEventListener('touchend', () => {
            button.classList.remove('hovered');
        });
    });
}

window.addEventListener('load', initCardSection);
window.addEventListener('resize', () => {
    autoResizeTextInSection('.card-section', 'h1.card-text, .card-middle-text-back');
});

