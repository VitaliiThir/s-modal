
/**
 * Version: 1.0.0
 * @SModal - plugin
 * @Author: Vitaly Tkhir
 * */

(function ($) {
    'use strict';

    $.fn.sModal = function (options) {

        let settings = $.extend({
            preloader: false,
            preloaderPuth: '../img/modal-preloader.gif',
            speedFade: 200,
            maxWidth: 680,//px
            maxHeight: 576,//px
            videoMaxWidth: 670,//px
            background: 'rgba(255, 255, 255, .95)',
            border: true,
            borderRadius: 5,//px
            borderWidth: 8,//px
            borderStyle: 'double',//solid, dotted, dashed, double, groove, inset, outset, ridge
            borderColor: '#555555',
            customClass: null,//string
            customClassForContent: null,
            defaultStyles: 'default-style',
            bodyOverlow: true,
            videoAutoPlay: false,
            image: false,
            imageClass: 's-modal-image',
            html: false,

            sModal: 's-modal',
            sItemWrapper: 's-modal-item-wrapper',
            sItem: 's-modal-item',
            sContentWrapper: 's-modal-content-wrapper',
            sContent: 's-modal-content',
            sClose: 's-modal-close',
            sModalPreloader: 's-modal-preloader',
            span: '<span/>'

        }, options);

        return this.each(function () {

            let $elem = $(this).clone(),
                body = $('body'),
                modal =
                    //Create modal
                    $('<div/>', {"class": settings.sModal})
                        .append($('<div/>', {"class": settings.sItemWrapper})
                            .append($('<div/>', {"class": settings.sItem})
                                .append($('<div/>', {"class": settings.sContentWrapper})
                                    .append($('<div/>', {"class": settings.sContent})
                                        .append($('<div/>', {"class": settings.sClose})
                                            .append(settings.span + settings.span)))))),
                elemParent = modal.find('.' + settings.sContent),
                close = modal.find('.' + settings.sClose);

            body.append(modal);

            elemParent.prepend($elem);

            if (settings.bodyOverlow === true) {
                body.addClass('overflow');
            }

            modal.fadeIn('slow');

            settings.customClass === null ?
                elemParent.parents('.' + settings.sItemWrapper).addClass(settings.defaultStyles) :
                elemParent.parents('.' + settings.sItemWrapper).removeClass(settings.defaultStyles).addClass(settings.customClass);

            if (settings.image === true) {

                elemParent.parents('.' + settings.sItemWrapper).removeClass(settings.defaultStyles).addClass(settings.imageClass);

            }

            if (settings.customClass !== null) {
                resizeCustomClassSize();
                $(window).on('resize', resizeCustomClassSize);
            }

            elemParent.parents('.' + settings.sItem).addClass('scale');

            if (settings.preloader === true) {
                modPreloader();
            }

            $elem.fadeIn(settings.speedFade);

            /**
             * @Video manipulation
             * */
            if (elemParent.find('video').length > 0 || settings.html !== true && elemParent.find("iframe").length > 0) {
                elemParent.parents('.' + settings.sItemWrapper).removeClass(settings.defaultStyles).addClass(settings.sItemWrapper);
                $elem.parents('.' + settings.sItemWrapper).addClass('s-modal-video').css('max-width', settings.videoMaxWidth + 'px');
            }

            if (elemParent.find('video').length > 0) {
                let videoElem = elemParent.find('video');
                videoElem.delay(settings.speedFade).fadeIn(settings.speedFade * 3);
                settings.videoAutoPlay === true ? videoElem.get(0).play() : videoElem.get(0).pause();
                videoElem.prop("controls", true);
            }

            if (settings.html !== true && elemParent.find("iframe").length > 0) {
                let youtubeIframe = elemParent.find('iframe');
                youtubeIframe.removeAttr('width').removeAttr('height').removeAttr('frameborder');
                youtubeIframe[0].src += "?autoplay=0";
            }

            if (settings.html === true) {
                $elem.parents('.' + settings.sItemWrapper).removeClass('s-modal-video').addClass('s-modal-html');
            }

            if (settings.customClassForContent !== null) {
                $elem.parents('.' + settings.sItemWrapper).addClass(settings.customClassForContent);
            }

            /**
             * @Size manipulation
             * */
            $('.' + settings.defaultStyles).css({
                'max-width': settings.maxWidth + 'px',
                'max-height': settings.maxHeight + 'px',
            });

            $('.' + settings.defaultStyles + ' .' + settings.sContentWrapper).css({
                'max-width': settings.maxWidth + 'px',
                'max-height': settings.maxHeight + 'px',
            });

            /**
             * @Background manipulation
             * */
            modal.find('.' + settings.sContent).css('background', settings.background);

            /**
             * @Border manipulation
             * */
            if (settings.border === true) {
                modal.find('.' + settings.sItem).css({
                    'border-radius': settings.borderRadius + 'px',
                    'border-width': settings.borderWidth + 'px',
                    'border-style': settings.borderStyle,
                    'border-color': settings.borderColor
                });
            }

            /**
             * @Close modal function
             * */
            modalClose();

            function modalClose() {

                close.on('click', function () {

                    let modalLength = body.find('.' + settings.sModal);

                    modal.fadeOut(settings.speedFade);

                    modalLength.each(function () {
                        if (modalLength.length < 2) {
                            body.removeClass('overflow');
                        }
                    });

                    setTimeout(function () {
                        modal.detach();
                    }, settings.speedFade);
                });

                modal.on('click', function (e) {
                    if (!$(this).find('.' + settings.sItem).is(e.target) &&
                        $(this).find('.' + settings.sItem).has(e.target).length === 0) {
                        close.trigger('click');
                    }
                });
            }

            function modPreloader() {

                let modalPreloader = $(
                    '<div class="' + settings.sModalPreloader + '">' +
                    '<img src="' + settings.preloaderPuth + '" alt="Loading">' +
                    '</div>');

                $elem.parent().append(modalPreloader);
                modalPreloader.css('display', 'block');

                $elem.parent().ready(function (callback) {
                    modalPreloader.find('img').delay(settings.speedFade * 2).fadeOut(settings.speedFade);
                    modalPreloader.delay(settings.speedFade * 2.5).fadeOut(settings.speedFade);
                    callback();
                });
            }

            function resizeCustomClassSize() {
                let customClass = $('.' + settings.customClass),
                    customClassHeight = customClass.height(),
                    customClassWidth = customClass.width();

                $('.' + settings.sContentWrapper).css({
                    'max-height': customClassHeight + 'px',
                    'max-width': customClassWidth + 'px',
                });
            }

        });

    };
})(jQuery);