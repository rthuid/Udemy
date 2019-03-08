Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    var $lottieContainers = $('.media_canvas__player');
    $lottieContainers.each(function () {
        let anim_id = $(this).attr('id');
        let pause = $(this).data('pause');
        let onhover = $(this).data('onhover') ? true : false;
        let anim_path = '/wp-content/uploads/animations/' + anim_id + '.json'
        let animation = bodymovin.loadAnimation({
            container: this,
            path: anim_path, // Required
            renderer: 'canvas', // Required
            loop: !onhover, // if hover is true it will be false
            autoplay: !onhover, // if hover is true it will be false
        });
        if (onhover) {
            $(this).hover(function () {
                animation.play()
            }, function () {
                animation.stop()
            })
        }
    });
});