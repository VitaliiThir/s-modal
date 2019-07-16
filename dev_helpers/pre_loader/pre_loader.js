$(window).on('load', function () {
    let preloader = $('.preloader');
    let preloaderItem = preloader.find('.preloader-item');
    preloaderItem.fadeOut();
    preloader.delay(350).fadeOut('slow');
    setTimeout(function () {
        $('.page-wrapper').css('overflow', 'visible');
    }, 450);
});