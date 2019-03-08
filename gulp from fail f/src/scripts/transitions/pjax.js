$(function(){
    Barba.Pjax.start();
})
// seting scroll top to 0 before reloding page
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }