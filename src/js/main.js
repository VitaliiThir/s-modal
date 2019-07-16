$(function () {

    let btn_text = $('.text-btn');
    let btn_video = $('.video-btn');
    let btn_youtube = $('.youtube-btn');
    let btn_vimeo = $('.vimeo-btn');
    let text = $('.m-text');
    let video = $('.m-video');
    let youtube = $('.m-youtube');
    let vimeo = $('.vimeo');

    btn_text.on('click', function () {
       text.sModal({
           preloader: true,
           customClassForContent: 'super'
       });

        let insetBtn = $('.inset-btn');
        insetBtn.on('click', function () {
           let insetText = $('.inset-text');
           insetText.sModal();
       })
    });

    btn_video.on('click', function () {
        video.sModal();
    });

    btn_youtube.on('click', function () {
        youtube.sModal({
            preloader: true
        });
    });

    btn_vimeo.on('click', function () {
        vimeo.sModal({
            preloader: true
        });
    });

    $('.image img').on('click', function () {
        $(this).sModal({
            preloader: true,
            image: true
        });
    });

    $('.html-btn').on('click', function () {
        $('.html-src').sModal({
            maxHeight: 800,
            maxWidth: 800,
            html: true
        });
    });
});