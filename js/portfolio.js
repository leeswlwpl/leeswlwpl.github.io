const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
            selectEl.addEventListener(type, listener)
        }
    }
}




function portfolio(){
    let portfolioContainer = select('.portfolio-container');
    // console.log("portfolioContainer", portfolioContainer);

    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item'
        });
        let portfolioFilters = select('#portfolio-filters li', true);

        on('click', '#portfolio-filters li', function(e) {
            console.log("click filter")
            e.preventDefault();
            portfolioFilters.forEach(function(el) {
                el.classList.remove('filter-active');
            });
            this.classList.add('filter-active');

            portfolioIsotope.arrange({
                filter: this.getAttribute('data-filter')
            });
        }, true);

    }
}




function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}


waitForElm('.portfolio-container div div img').then((elm) => {
    portfolio()

    window.setTimeout(() => {
        //     change portfolio-container display to block
        const container = document.getElementById('portfolio-container');
        container.style.display = 'block';

        const button = document.getElementById('filter-all');
        button.click();
    }, 250);


    window.setTimeout(() => {
        const button = document.getElementById('filter-all');
        button.click();

    }, 750);

    window.setTimeout(() => {
        const button = document.getElementById('filter-all');
        button.click();

        const portfolioLightbox = GLightbox({
            selector: '.portfolio-lightbox'
        });
    }, 1500);




});





