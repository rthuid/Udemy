$(window).on('load-lazy', function (e,$elem) {
    function vhs() {
        var wheight = $(window).height();
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        var $elems = $elem.not('.visible');
        if ((scrollHeight - scrollPosition) / scrollHeight !== 0) {
            $elems.each(function () {
                var $elem = $(this);
                var top = $(this).offset().top - $(window).scrollTop();
                if (top < (wheight / 2) + 100) {
                    $(this).animate({
                        opacity: 1
                    }, 400);
                }
            })
        } else {
            $elems.animate({
                opacity: 1
            }, 400);
        }
    }
    vhs();
    $(window).on("resize scroll", vhs);

})
