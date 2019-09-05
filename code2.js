var mobileMode = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var i_hate_spam = CryptoJS.AES.decrypt(
    // 'U2FsdGVkX19ps5mfnt7hQmWGEjXhcF/wMNi2tzli2Bng5+QzV3iPWSHcuY8/T7TV', // Own domain
    // 'U2FsdGVkX18KwBgeIRwYfegjlOzxv2/3uPbyJUKpNg8=', // UCI
    'U2FsdGVkX1/88qaX/2fUCKycxfuuHZaLHHavQ8QmDVA=', // UCI ICS
    'i hate spam'
).toString(CryptoJS.enc.Utf8);


function smoothScroll(flag) {
    var scrollnow = function(e) {
        // if scrollnow()-function was triggered by an event
        if (e) {
            e.preventDefault();
            var target = this.hash;
        }
        // else it was called when page with a #hash was loaded
        else {
            var target = location.hash;
        }

        // same page scroll
        $(target).velocity('scroll', {duration: 300});
    };

    // if page has a #hash
    if (flag && location.hash) scrollnow();

    // for each <a>-element that contains a "/" and a "#"
    $('a[href*="/"][href*="#"]').filter(function(){
       // if the pathname of the href references the same page
       return this.hash &&
              this.pathname.replace(/^\//,'') == location.pathname.replace(/^\//,'') &&
              this.hostname == location.hostname;

    }).click(scrollnow);

    // select all href-elements that start with #
    // including the ones that were stripped by their pathname just above
    $('a[href^="#"]:not([href="#"])').click(scrollnow);

    $('a[href="#"]').click(function() {
        $('body').velocity('scroll', {duration: 300});
    });
}


function pubicationAbs() {
    $('a[id$=-absbtn]').css('display', 'inline-block');

    $('a[id$=-absbtn]').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('down');
        let id = $(this).attr('id');
        let obj = $('#' + id.substring(0, id.length - 3));

        if( mobileMode ) {
            obj.toggle();
        } else {
            //obj.slideToggle(200);
            if  ( $(this).hasClass('down') )
                obj.velocity("slideDown", {duration: 200});
            else
                obj.velocity("slideUp", {duration: 200});
        }
    });
}

function applyFilter() {
    $('a[id^=filter_]').click(function(e) {
        console.assert(!mobileMode, "Mobile mode should be false here");
        e.preventDefault();

        let str = $(this).attr('id').substring(7);

        $('.abs2').velocity("slideUp", {duration: 200});
        $('.down').removeClass('down not-active');
        $(this).addClass('down not-active');

        if ( str == 'all' ) {
            $('.title3').velocity("slideUp", {duration: 200});
            $('.title2.skipped').velocity("slideDown", {duration: 200}).removeClass('skipped');
            $('.pubwrap.skipped').velocity("slideDown", {duration: 200}).removeClass('skipped');
        }
        else {
            $('.title3').each(function() {
                let cmd = $(this).hasClass('pub_' + str) ? 'slideDown' : 'slideUp';
                $(this).velocity(cmd, {duration: 200});
            });

            let className = '.pub_' + str;
            $('.title2').not(className).velocity("slideUp", {duration: 200}).addClass('skipped');
            $('.pubwrap').not(className).velocity("slideUp", {duration: 200}).addClass('skipped');
            $('.skipped' + className).velocity("slideDown", {duration: 200}).removeClass('skipped');
        }
    });
}

function myReady() {
    $(".ihatespam").html('<a href=\"' + 'mailto:' + i_hate_spam + '\">' + i_hate_spam + '</a>');
    if ( $('#pub').length > 0 ) {
        pubicationAbs();
        applyFilter();
    }

    if ( mobileMode )
        $('.pubmenu').addClass('hidden');
    else {
        $('nav a').click(function() {
            $(this).addClass('down');
        });
    }
}


$(document).ready(function() {
    myReady();
    if ( !mobileMode ) smoothScroll(true);
});


$(function() {
    'use strict';
    if( !mobileMode ) {
        var oldHTML  = '';
        var $body    = $('html, body');

        $('#wrap').smoothState({
            pageCacheSize : 5,
            blacklist: '.proj, .video',
            onStart : {
                duration: 250,
                render: function(url, $container) {
                    $('body').velocity('scroll', {duration: 150});

                    // togglePageAnimations();
                    // smoothState.restartCSSAnimations();

                    oldHTML = $('#wrap1_main').html();
                    $('#icon_loading').removeClass('hidden');

                    $body.find('a').addClass('not-active');
                }
            },

            onProgress : {
                duration: 0,
                render: function (url, $container) {
                    $body.css('cursor', 'wait');
                }
            },

            onEnd : {
                duration: 400,
                render: function(url, $container, $content) {
                    // togglePageAnimations();

                    $container.html($content);
                    $('#wrap0_main').html(oldHTML);
                    $('#wrap0_main').css('opacity', '1');
                    $('#wrap1_main').css('opacity', '0');
                    $body.find('a').addClass('not-active');
                    myReady();

                    $('#wrap0_main').velocity({opacity: 0}, {duration: 400, easing: 'linear', queue: false});
                    $('#wrap1_main').velocity({opacity: 1}, {duration: 400, easing: 'linear', queue: false});

                    $body.css('cursor', 'auto');
                }
            },

            callback : function(url, $container, $content) {
                $('#wrap0_main').html('');
                $body.find('a').removeClass('not-active');
                smoothScroll(false);
            }
        }).data('smoothState');
    }
});
