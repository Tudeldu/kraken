export function initDarkModeToggle() {
    const switchInput = document.getElementById('darkModeSwitch');
    const root = document.body;

    const enableDark = () => {
        root.classList.add('bg-dark', 'text-light');
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('bg-white');
            card.classList.add('bg-dark', 'text-light', 'border-light');
        });
        localStorage.setItem('darkMode', 'true');
        // updateCustomComponents(true);
    };

    const disableDark = () => {
        root.classList.remove('bg-dark', 'text-light');
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('bg-dark', 'text-light', 'border-light');
            card.classList.add('bg-white');
        });
        localStorage.setItem('darkMode', 'false');
        // updateCustomComponents(false);
    };

    switchInput.addEventListener('change', (e) => {
        e.target.checked ? enableDark() : disableDark();
    });

    // Initialize based on stored preference
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
        switchInput.checked = true;
        enableDark();
    }
}

