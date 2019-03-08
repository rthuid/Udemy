$(function () {
    $('.subscribe').each(function () {
        var $form = $(this).find('form');
        var postid = $form.data('post');
        var $input = $form.find('input[type="email"]');
        var $checkbox = $form.find('.custom-cbx__input');
        var $inputParent = $input.parent('.form-group');
        var $checkboxParent = $checkbox.parent('.form-check');
        $form.on('submit', function (e) {
            e.preventDefault();
            var checked = $checkbox.is(':checked');
            var email = $input.val();
            if (email == '') {
                $inputParent.addClass('error');
                $input.attr('placeholder', 'This field is required!');
            } else if (!validateEmail(email)) {
                $inputParent.addClass('error');
                $input.attr('placeholder', 'Enter valid email address');
                $input.val('');
            } else if (!checked) {
                $inputParent.removeClass('error')
                $checkboxParent.addClass('error');
            } else {
                $inputParent.removeClass('error')
                $.post('/wp-admin/admin-ajax.php', {
                    action: 'ff_newsletter_subscribe',
                    email: email,
                    id:postid
                }, function (data) {
                    console.log("==>",data);
                })
            }
        })
        $input.keypress(function(){
            $inputParent.removeClass('error');
        });
        $checkbox.change(function(){
            $checkboxParent.removeClass('error');
        })
    })

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
})



//http://failfast.net/wp-admin/admin-ajax.php