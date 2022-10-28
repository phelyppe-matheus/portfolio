var parallaxObjects = [];

var scrollTimeout = 0;
var scrolling = false;

parallaxObjectsRefresh = () => {
    parallaxObjects = [
        {
            object: document.getElementsByClassName("parallax-container great-blob-container")[0],
            target: document.getElementsByClassName("about")[0],
            rate: -2.1,
            scrollBoundStyleElement: 'top',
            offset: 0.46,
            unit: 'px',
        },
        {
            object: document.getElementsByClassName("triangle-group-2")[0],
            target: document.getElementsByClassName("about")[0],
            rate: -1.4,
            scrollBoundStyleElement: 'left',
            offset: -0.1,
            unit: 'px',
        },
        {
            object: document.getElementsByClassName("parallax-container triangle-group-2-container")[0],
            target: document.getElementsByClassName("about")[0],
            rate: -0.8,
            scrollBoundStyleElement: 'top',
            offset: -0.5,
            unit: 'px',
        },
        {
            object: document.getElementsByClassName("work-accent")[0],
            target: document.getElementsByClassName("work")[0],
            rate: -2.0,
            scrollBoundStyleElement: 'top',
            offset: 0.8,
            unit: 'px',
        },
    ]
}

parallax_refresh = () => {
    parallaxObjectsRefresh();

    parallaxObjects.forEach(parallaxObject => {
        const objectElement = parallaxObject.object;
        const targetElement = parallaxObject.target;
        const velocityRate = parallaxObject.rate - 1;
        var positionOffset = objectElement.getBoundingClientRect().height * parallaxObject.offset;
        const styleElement = parallaxObject.scrollBoundStyleElement;
        const unit = parallaxObject.unit;

        const target_point = targetElement.getBoundingClientRect().top + targetElement.getBoundingClientRect().height / 2 - window.innerHeight / 2;

        const window_center_y = window.scrollY + window.innerHeight / 2;

        const style_value = window_center_y - target_point * velocityRate - positionOffset;

        objectElement.style.transition = `${styleElement} 2s ease-in-out`;
        objectElement.style[styleElement] = `${style_value}${unit}`;
    });
}

const scrollSnap = () => {
    if(scrolling) return;

    const sections = document.querySelectorAll('body>section');
    const windowSize = window.innerHeight;
    
    sections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();
        if (Math.abs(sectionRect.top) < windowSize * 0.3) {
            window.scrollTo({
                top: sectionRect.top + window.scrollY,
                behavior: 'smooth'
            });
            console.log(`Should stick to ${section.className}'s top`);
            return;
        }
    });

    scrolling = true;
}

window.onload = () => {

    window.addEventListener("scroll", () => {

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            scrolling = false;
        }, 100);

        // scrollSnap();
        parallax_refresh();
    });

    parallax_refresh();
}
