const imageLoader = () => {
    let lazyImages = [].slice.call(document.querySelectorAll("img"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src;
                    }

                    if (entry.target.dataset.srcset) {
                        entry.target.srcset = entry.target.dataset.srcset;
                    }

                    lazyImageObserver.unobserve(entry.target);
                }
            });
        });

        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        let active = false;

        const checkImages = () => {
            lazyImages.forEach(lazyImage => {
                if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                    }
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }

                    lazyImages = lazyImages.filter(image =>
                        (image !== lazyImage)
                    );

                    if (lazyImages.length === 0) {
                        document.removeEventListener("scroll", lazyLoad);
                        window.removeEventListener("resize", lazyLoad);
                        window.removeEventListener("orientationchange", lazyLoad);
                    }
                }
            });

            active = false;
        };

        const lazyLoad = () => {
            if (active === false) {
                active = true;

                setTimeout(() => {
                    checkImages();
                }, 200);
            }
        };

        checkImages();

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    }
};

const init = () => {
    imageLoader();

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
    window.addEventListener('DOMContentLoaded', init);
}