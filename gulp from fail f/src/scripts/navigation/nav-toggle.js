// manin menu navigation toggle function

$(document).on('click','#navToggle', function() {
    $(this).parent().parent('.app-nav').toggleClass('open');
    $(this).attr('aria-expanded', function (i, attr){
        attr = attr == 'true' ? 'false' : 'true';
        isMenuOpen = attr;
        return attr;
    });
});

$(document).on('click','.app-nav__list ul li a', function() {
    $(this).parent('li').removeClass('active')
    $(this).parent().addClass('active')
});
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, rawHTML) {
    // $('.app-nav').hasClass('open') && $('.app-nav').removeClass('open');
    window.isMenuOpen && $('.app-nav').removeClass('open');
})
