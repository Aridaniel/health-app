// js for navigation, changing pages and main structure

const app = {
    pages: [],
    // to say when the page has been shown we dispatch the event 
    show: new Event('show'),
    init: function() {
        // finding everything with the class page
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg) => {
            // calling event and function
            pg.addEventListener('show', app.pageShown)
        })
        // looping through all of the links in the html
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        })

        // to know what page we are on, title and id that will be placed into the location bar
        history.replaceState({}, 'forsida', '#frontpage');
        // for handeling the backbutton
        window.addEventListener('popstate', app.poppin);
    },

    nav: function(ev) {
        ev.preventDefault();
        // taking the current page and getting the data target
        let currentPage = ev.target.getAttribute('data-target');
        // first we remove the active class from one of the pages
        document.querySelector('.active').classList.remove('active');
        // adding the class active to show the correct page
        document.getElementById(currentPage).classList.add('active');
        // adding a new entry to the location bar
        history.pushState({}, currentPage, `#${currentPage}`);
        // telling the app that we went to a new page
        document.getElementById(currentPage).dispatchEvent(app.show);
    },

    poppin: function(ev) {
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#', '');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

// when everything has been read call the app.init function
document.addEventListener('DOMContentLoaded', app.init);

