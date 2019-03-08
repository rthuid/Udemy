$(function () {
    $(".media_video").each(function (index) {
        var $elem = $(this);
        var $iframe = $elem.find('iframe');
        var $icon = $elem.children('.media_video__play-icon,.media_video__img');
        var $thumb = $elem.find('.media__img');
        var player = new Vimeo.Player($iframe);
        $icon.on('click', function () {
            $elem.data('playing') ? player.pause() : player.play().then(function () {
                player.setVolume(1)
                var $otherPlayers = $('iframe').not($iframe)
                $otherPlayers.each(function () {
                  new Vimeo.Player($(this)).pause()
                })
            });
        })
        player.on('play', function () {
            $elem.data('playing', true);
            $thumb.fadeOut();
            $elem.removeClass('stoped').removeClass('paused').addClass('playing');
        });
        player.on('pause', function () {
            $elem.data('playing', false);
            // $thumb.fadeIn();
            $elem.removeClass('playing').addClass('paused');
        });
        player.on('ended', function () {
            $thumb.fadeIn();
            $elem.removeClass('playing, paused').addClass('stoped');
        });
    })
})
