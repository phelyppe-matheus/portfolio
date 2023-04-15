var parallaxObjects = [

];

var scrollTimeout = 0;
var scrolling = false;

parallaxObjectsRefresh = () => {
    parallaxObjects = [
        {
            object: document.getElementsByClassName("parallax-container great-blob-container")[0],
            pointZero: document.getElementsByClassName("about")[0],
            rate: -2.1,
            scrollBoundStyleElement: 'top',
            offset: 0.46,
            unit: 'px',
        },
        {
            object: document.getElementsByClassName("triangle-group-2")[0],
            pointZero: document.getElementsByClassName("about")[0],
            rate: -1.4,
            scrollBoundStyleElement: 'left',
            offset: -0.1,
            unit: 'px',
        },
        {
            object: document.getElementsByClassName("parallax-container triangle-group-2-container")[0],
            pointZero: document.getElementsByClassName("about")[0],
            rate: -0.8,
            scrollBoundStyleElement: 'top',
            offset: -0.5,
            unit: 'px',
        },
        {
            object: document.getElementsByClassName("work-accent")[0],
            pointZero: document.getElementsByClassName("work")[0],
            rate: -2.0,
            scrollBoundStyleElement: 'top',
            offset: 0.8,
            unit: 'px',
        },
    ]
}

parallaxRefresh = () => {
    parallaxObjectsRefresh();

    parallaxObjects.forEach(parallaxObject => {
        const objectElement = parallaxObject.object;
        const objectRect = objectElement.getBoundingClientRect();
        const pointZeroElement = parallaxObject.pointZero;
        const pointZeroRect = pointZeroElement.getBoundingClientRect();
        const velocityRate = parallaxObject.rate - 1;
        var positionOffset = objectRect.height * parallaxObject.offset;
        const styleElement = parallaxObject.scrollBoundStyleElement;
        const unit = parallaxObject.unit;

        const distanceFromPointZero = pointZeroRect.top + pointZeroRect.height / 2 - window.innerHeight / 2;

        const windowCenterY = window.scrollY + window.innerHeight / 2;

        const styleValue = windowCenterY - distanceFromPointZero * velocityRate - positionOffset;

        if (Math.abs(distanceFromPointZero) > Math.max(window.innerHeight, window.innerWidth) / 2 + Math.max(objectRect.height, objectRect.width) / 2) {
            return;
        }

        objectElement.style.transition = `${styleElement} 2s ease-in-out`;
        objectElement.style[styleElement] = `${styleValue}${unit}`;
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

const scrollListener = () => {
    window.addEventListener("scroll", () => {

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            scrolling = false;
        }, 100);

        // scrollSnap();
        parallaxRefresh();
    });
}

const setUpHeaderButtons = () => {
    goToAbout.onclick = () => about.scrollIntoView({behavior: 'smooth'});
    goToWorks.onclick = () => work.scrollIntoView({behavior: 'smooth'});
    goToExperiences.onclick = () => experiences.scrollIntoView({behavior: 'smooth'});
    goToContacts.onclick = () => contacts.scrollIntoView({behavior: 'smooth'});
}

window.onload = () => {
    endLoading();

    scrollListener();

    parallaxRefresh();

    setUpHeaderButtons();
}
