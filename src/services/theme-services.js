const handleTheme = (setTheme, newTheme) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);

    getTheme();
}

const getTheme = () => {
    const theme = localStorage.getItem('theme');

    const root = document.querySelector(':root');

    const logo = document.querySelector('.logo');
    const balanceVisibilityButton = document.querySelector('#balanceVisibilityButton')

    if (theme === 'light') {
        // root.style.setProperty('--white', '#FFF');
        // root.style.setProperty('--primaryGray', '#F3F3F3');
        // root.style.setProperty('--secundaryGray', '#E1E1E1');
        // root.style.setProperty('--detailsGray', '#818181');
        // root.style.setProperty('--black', '#000');

        // // logo?.style.filter = 'invert(1)';
        // // balanceVisibilityButton?.style.filter = 'invert(1)';

    } else if (theme === 'dark') {
    //     root.style.setProperty('--white', '#2B2B2B');
    //     root.style.setProperty('--primaryGray', '#7E7E7E');
    //     root.style.setProperty('--secundaryGray', '#212121');
    //     root.style.setProperty('--detailsGray', '#F3F3F3');
    //     root.style.setProperty('--black', '#FFF');

    //     // logo?.style.filter = 'invert(1)';
    //     // balanceVisibilityButton?.style.filter = 'invert(1)';

    //     const buttons = document.querySelectorAll('button');
    //     const linkButtons = document.querySelectorAll('.link-btn');

    //     for (let i = 0; i < buttons.length; i++) {
    //         buttons[i].style.color = '#FFF !important';
    //     }

    //     for (let i = 0; i < linkButtons.length; i++) {
    //         linkButtons[i].style.color = '#FFF !important';
    //     }
    }
}

export {
    handleTheme,
    getTheme
}