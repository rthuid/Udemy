$(window).on('onaboutload', function () {
    var header = $('.page-title_title');
    var $tiles = $('.grid-1__box');
    var $anim_tiles,$fade_tiles;
    var tl = new TimelineLite();

    //checking device is mobile or desktop
    if ($(window).width() >= 768) {
         $anim_tiles = $tiles.not('.fade-in');
         $fade_tiles = $tiles.not(".animate-in");
    }else{
        $anim_tiles = $tiles.eq(0);
        $fade_tiles = $tiles.not(":eq(0)");
 $fade_tiles.removeClass('animate-in').addClass('fade-in')
}
    if (window.isMenuOpen) {
        tl.delay(0.5)
    }
    tl.set(header, { 'z-index': 99 });
    tl.from(header, 2, {
        ease: Expo.easeOut,
        y: 120,
    })
    tl.from(header, 1, {
        opacity: 0
    }, '-=2')
    tl.fromTo($anim_tiles.eq(0), 2, {
        ease: Expo.easeOut,
        y: 100,
        opacity: 0
    }, {
            ease: Expo.easeOut,
            y: 0,
            opacity: 1
        }, '-=1.6')

    // animating second tile if any 
    if ($anim_tiles.length > 1) {
        var $elem = $anim_tiles.eq(1);
            tl.fromTo($elem, 2.2, {
                ease: Expo.easeOut,
                y: 50,
                opacity: 0
            }, {
                    ease: Expo.easeOut,
                    y: 0,
                    opacity: 1
                }, 'myLabel-=1.8');
    }
    tl.add(function () {
        $(window).trigger('load-lazy', [$fade_tiles]);
    }, tl.duration() / 1.8);
})