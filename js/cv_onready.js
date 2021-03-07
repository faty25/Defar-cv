(function ($) {


    function gereAffichageProfilPublic() {
        if ($('#CV_PUBLIC_ACTIF').is(':checked')) {
            $('.cv-url').show();
        } else {
            $('.cv-url').hide();
        }
    }

    function gereAffichageC2I() {
        if ($('#CV_C2IMI').is(':checked')) {
            $('.c2i2_specialites').show();
        } else {
            $('.c2i2_specialites').hide();
        }
    }

    $(document).ready(function () {

        $('.checkbox_avec_texte').click(function () {
            var _this = '#' + $(this).attr('id') + '_TEXT';
            if ($(this).is(':checked')) {
                $(_this).show();
            } else {
                $(_this).hide();
            }
        });
        $('.checkbox_avec_texte').each(function () {
            var _this = '#' + $(this).attr('id') + '_TEXT';
            if (!$(this).is(':checked')) {
                $(_this).hide();
            }
        });
        // Gestion de l'affichage du champ de personnalisation de l'URL du profil public en fonction de l'activation du profil public
        $('#CV_PUBLIC_ACTIF').change(function (event) {
            gereAffichageProfilPublic();
        });
        gereAffichageProfilPublic();
        // Gestion de l'affichage du champ de personnalisation de l'URL du profil public en fonction de l'activation du profil public
        $('#CV_C2IMI').change(function (event) {
            gereAffichageC2I();
        });
        gereAffichageC2I();
        // Gestion de l'affichage de l'URL du profil public en fonction de la personnalisation
        $('#ID_PROFIL_PUBLIC').on('input', function () {
            $('#idProfil').html($('#ID_PROFIL_PUBLIC').val());
        });


        $('.iframecrop_image').fancybox({
            'type': 'iframe',
            'width': 1280,
            'height': 700
        });

        var afficherPermisNonRepertorie = function () {
            if ($('#CV_PERMIS_99').is(':checked')) {
                $('#CV_PERMIS_NON_REPERTORIE').show();
            } else {
                $('#CV_PERMIS_NON_REPERTORIE').val('');
                $('#CV_PERMIS_NON_REPERTORIE').hide();
            }
        };
        $("#accordion").accordion({
            autoHeight: false,
            collapsible: true
        });
        $('#CV_DATE_NAISSANCE').datepicker();
        var cv = new CV(
            'accordion',
            $.parseJSON(document.getElementById('CV_LANGUES').value),
            $.parseJSON(document.getElementById('CV_LOGICIELS').value),
            $.parseJSON(document.getElementById('CV_LANGAGES').value),
            $.parseJSON(document.getElementById('CV_FORMATIONS').value),
            $.parseJSON(document.getElementById('CV_DIPLOMES').value),
            $.parseJSON(document.getElementById('CV_EXPERIENCES').value),
            '',
            $.parseJSON(document.getElementById('CV_QUALITES').value)
        );
        // cv.erreurs = $.parseJSON(document.getElementById('CONSTRAINT_VIOLATIONS_JSON")%>');
        cv.init();
        afficherPermisNonRepertorie();
        $('#CV_PERMIS_99').click(function () {
            afficherPermisNonRepertorie();
        });
        $('.js-toggle-all').click(function () {
            CV.basculer();
        });
        var showBubble = function (e) {
            // on ne traite que si l'élément a un titre
            if (this.title) {
                var info, parent, top, left;
                // arret de la propagation des autres evenements
                if ($.foliosevent.supportsTouchEvents()) {
                    e.preventDefault();
                } else {
                    e.stopPropagation();
                }
                // creation de la bulle et ajout au parent
                parent = $(this).parent('h3.ui-accordion-header');
                info = $('<div class="cv__title__info"></div>').appendTo(parent).text(this.title).hide();
                // calcule de la position
                top = $(this).position().top + 22;
                left = $(this).position().left + 22;
                // affichage
                info.fadeIn(2000, function () {
                    window.setTimeout(function () {
                        info.fadeOut();
                    }, 5000);
                }).css({
                    'top': top,
                    'left': left
                });
            }
        };
        $('h3.ui-accordion-header > i.icomoon').click(showBubble).on('touchend', showBubble);

        $('.error').each(function(){
            var $section = $(this).closest('h3');
            $section.removeClass('ui-corner-all').addClass('ui-accordion-header-active ui-state-active ui-corner-top').attr({ 'aria-selected': 'true','tabindex': '0'});
            $section.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
            $section.next().addClass('ui-accordion-content-active').attr({
                'aria-expanded': 'true',
                'aria-hidden': 'false'
            }).show();
        });

    });
})(jQuery);