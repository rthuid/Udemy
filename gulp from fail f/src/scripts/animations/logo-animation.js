$(function(){
    var animation;
    var logo = document.getElementById('logo');
    var logo_id = logo.getAttribute("data-id");
    setTimeout(function () {
        animation = bodymovin.loadAnimation({
            container: logo, // Required
            path: '/wp-content/uploads/animations/'+logo_id+'.json', // Required
            renderer: 'canvas', // Required
            loop: true, // Optional
            autoplay: false, // Optional
        })
    }, 1)

    var $logo = $('.app-header__logo');
    $logo.hover(function () {
        animation.setDirection(1);
        animation.play();
    }, function () {
        animation.stop();
    })
})