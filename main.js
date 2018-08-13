const init = () => {
    const toggle = document.querySelector('.navbar-toggle');
    const navmenu = document.querySelector('.navigation');

    let navState;

    const navStyles = {
        on: {
            bottom: 0,
            opacity: 1
        },
        off: {
            bottom: '100%',
            opacity: 0
        },
    };

    const setMenuState = state => {
        navState = state;
        Object.assign(navmenu.style, navStyles[state]);
    }

    [...document.querySelectorAll('.navigation .nav li > a')].forEach(node => {
        node.addEventListener('click', () => setMenuState('off'));
    });

    toggle.addEventListener('click', () => {
        if ( navState === 'on' ) {
            setMenuState('off')
        } else {
            setMenuState('on');
        }
    });
};

if (document.readyState === 'complete') {
    init();
} else {
    window.addEventListener('load', init);
}