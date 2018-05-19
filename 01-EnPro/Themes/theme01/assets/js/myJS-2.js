(function($) {

    $.fn.menumaker = function(options) {

        var ttwmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function() {
            ttwmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function(){
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide().removeClass('open');
                }
                else {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });

            ttwmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function() {
                ttwmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                ttwmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').hide();
                    }
                    else {
                        $(this).siblings('ul').addClass('open').show();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else ttwmenu.addClass('dropdown');

            if (settings.sticky === true) ttwmenu.css('position', 'fixed');

            resizeFix = function() {
                if ($( window ).width() > 768) {
                    ttwmenu.find('ul').show();
                }

                if ($(window).width() <= 768) {
                    ttwmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

(function($){
    $(document).ready(function(){

        $("#ttwmenu").menumaker({
            title: "Menu",
            format: "multitoggle"
        });

    });
})(jQuery);