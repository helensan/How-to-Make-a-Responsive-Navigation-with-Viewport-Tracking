// This function takes an element and scrolls the window so the element appears on top of the viewport
(function ($) {
    $.fn.goTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; 
    };
})(jQuery);

// This function takes an element and returns true/false if the entire element is in the current viewport
$.fn.isFullyInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementTop >= viewportTop && elementBottom <= viewportBottom;
};

// This function takes an element and returns true/false if a part of the element is in the current viewport
$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// When user scrolls down the window, loop through contents. If they are in the viewport, add active class to the content link
$(window).on('scroll', function () {
    var prev = false; // If the element previously checked was in viewport
    var prevId; // ID of previous element checked
    var curr = false; // If the current element is in viewport
    var currId; // ID of current element that is being checked   
    $('.content').each(function () {
        if (!$(this).is(':visible')) { // Skip if the content is not visible
            return true;
        }
        prev = curr; 
        prevId = currId;
        currId = $(this).attr('id'); 
        if ($(this).isFullyInViewport()) { // If item is fully in the viewport, add active class and stop
            $('.contentLink').removeClass('active');
            $('#' + currId + 'Link').addClass('active');
            return false;
        }
        if ($(this).isInViewport()) { // If item is partially in viewport, curr is true
            curr = true; 
        }
        else { // Else curr is false
            curr = false;
        }
        if (prev === true && curr === false && prevId !== null) { // If the previous element is in viewport but the current one isn't, add active class to previous content link
            $('.contentLink').removeClass('active');
            $('#' + prevId + 'Link').addClass('active');
            return false;
        }
    });
    if (prev === false && curr === true && prevId !== null) { // Add additional check if very last element partially in viewport 
        $('.contentLink').removeClass('active');
        $('#' + currId + 'Link').addClass('active');
    }
});

$(document).ready(function () {
    $(window).trigger('scroll'); // when the page loads, trigger the window to scroll so we will get the first active link on default
});

// When a user clicks on a contentLink, grab the corresponding content element and call goTo to scroll to it
$('.contentLink').on('click', function (e) { 
    e.preventDefault();
    var scrollToId = $(this).data("scroll");
    $('#' + scrollToId).goTo();
});

