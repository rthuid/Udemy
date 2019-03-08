
var About = Barba.BaseView.extend({
    namespace: 'about',
    onEnter: function () {
        // The new Container is ready and attached to the DOM.
        $(window).scrollTop(0); // scroll to top here
    },
    onEnterCompleted: function () {
        // The Transition has just finished.
        $(window).trigger('onaboutload');
    },
    onLeave: function () {
        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function () {
        // The Container has just been removed from the DOM.
    }
});

// Don't forget to init the view!
About.init();

