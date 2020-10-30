// JS for navigation, changing pages and main structure
const navContainer = document.getElementById('nav-container');
const navList = document.getElementById('nav-list');

const app = {
    pages: [],
    // To say when the page has been shown we dispatch the event 
    show: new Event('show'),
    init: function() {
        // Finding everything with the class page
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg) => {
            // Calling event and function
            pg.addEventListener('show', app.pageShown)
        })
        // Looping through all of the links in the html
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        })

        // To know what page we are on, title and id that will be placed into the location bar
        history.replaceState({}, 'forsida', '#frontpage');
        // For handeling the backbutton
        window.addEventListener('popstate', app.poppin);
    },

    nav: function(ev) {
        ev.preventDefault();
        // Taking the current page and getting the data target
        let currentPage = this.getAttribute('data-target');
        // First we remove the active class from one of the pages
        document.querySelector('.active').classList.remove('active');
        // Adding the class active to show the correct page
        document.getElementById(currentPage).classList.add('active');
        // Adding a new entry to the location bar
        history.pushState({}, currentPage, `#${currentPage}`);
        // Telling the app that we went to a new page
        document.getElementById(currentPage).dispatchEvent(app.show);
    },

    pageShown: function(ev) {
        let currPage = ev.target.id;
        if(currPage === 'frontpage') {
            document.body.style.marginLeft = '0';
            navContainer.classList.remove('nav-sidebar');
            navContainer.classList.add('nav');
        } else {
            document.body.style.marginLeft = 'var(--nav-width)';
            navContainer.classList.remove('nav');
            navContainer.classList.add('nav-sidebar');
        }
    },

    poppin: function(ev) {
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#', '');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

// When everything has been read call the app.init function
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

function hideNav () {
    navList.style.display = 'none';
}

function showNav (displayProp) {
    navList.style.display = displayProp;
}

