document.addEventListener('DOMContentLoaded', function() {
    const profileSections = document.querySelectorAll('.profile-section');

    profileSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.classList.add('hovered');
        });

        section.addEventListener('mouseleave', () => {
            section.classList.remove('hovered');
        });
    });
});

