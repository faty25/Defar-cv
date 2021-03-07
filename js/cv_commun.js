(function($) {
    // CPO Patch transformation Accordeon -> Panels, avec mêmes identifiants
    // En cas de mise à jour, il ne faut pas casser la compatibilité (désactivation de cette fonctionnalité)
    if ($.ui.accordion.version === "1.8.16") {
        var accordion_animations = $.ui.accordion.animations;
        $.widget("ui.accordion", $.extend({}, $.ui.accordion.prototype, {

            _clickHandler: function(event, target) {
                var options = this.options;

	            if (options.disabled) return;

                // called only when using activate(false) to close all parts programmatically
                if (!event.target) {
                    if (!options.collapsible) return;

                    this.active
                        .removeClass( "ui-state-active ui-corner-top" )
                        .addClass( "ui-state-default ui-corner-all" )
                        .children( ".ui-icon" )
                            .removeClass( options.icons.headerSelected )
                            .addClass( options.icons.header );
                    this.active.next().addClass( "ui-accordion-content-active" );
                    var toHide = this.active.next(),
                        data = {
                            options: options,
                            newHeader: $( [] ),
                            oldHeader: options.active,
                            newContent: $( [] ),
                            oldContent: toHide
                        },
                        toShow = ( this.active = $( [] ) );
                    this._toggle( toShow, toHide, data );
                    return;
                }

                // get the click target
                var clicked = $(event.currentTarget || target);

                // CPO PATCH : Dans le cas d'un fonctionnement pour le CV, la vérification n'est pas faite via l'élément unique actif.
                var clickedIsActive = $(clicked[0]).hasClass('ui-state-active');

                options.active = options.collapsible && clickedIsActive ?
                    false :
                    this.headers.index( clicked );

                // if animations are still active, or the active header is the target, ignore click
                if ( this.running || ( !options.collapsible && clickedIsActive ) ) {
                    return;
                }

                // CPO Patch
                var toShow = clickedIsActive ? $([]) : clicked.next() ;
                var toHide = clickedIsActive ? clicked.next() : $([]);

                // find elements to show and hide
                var active = this.active,
                    /* toShow = clicked.next(),
                    toHide = this.active.next(), */
                    data = {
                        options: options,
                        newHeader: clickedIsActive && options.collapsible ? $([]) : clicked,
                        oldHeader: this.active,
                        newContent: clickedIsActive && options.collapsible ? $([]) : toShow,
                        oldContent: toHide
                    },
                    down = this.headers.index(this.active[0]) > this.headers.index(clicked[0]);

                // when the call to ._toggle() comes after the class changes
                // it causes a very odd bug in IE 8 (see #6720)
                this.active = clickedIsActive ? $([]) : clicked;
                this._toggle( toShow, toHide, data, clickedIsActive, down );

                // switch classes
                active
                    .removeClass( "ui-state-active ui-corner-top" )
                    .addClass( "ui-state-default ui-corner-all" )
                    .children( ".ui-icon" )
	                    .removeClass( options.icons.headerSelected )
	                    .addClass( options.icons.header );
                if (!clickedIsActive) {
                    clicked
                        .removeClass( "ui-state-default ui-corner-all" )
                        .addClass( "ui-state-active ui-corner-top" )
                        .children( ".ui-icon" )
	                        .removeClass( options.icons.header )
	                        .addClass( options.icons.headerSelected );
                    clicked
                        .next()
                        .addClass( "ui-accordion-content-active" );
                } else {
                    clicked
						.removeClass( "ui-state-active ui-corner-top" )
						.addClass( "ui-state-default ui-corner-all" )
						.children( ".ui-icon" )
							.removeClass( options.icons.headerSelected )
							.addClass( options.icons.header );
					clicked
						.next()
						.removeClass( "ui-accordion-content-active" );
                }

                return;
            },

			_toggle: function( toShow, toHide, data, clickedIsActive, down ) {
				var self = this,
					options = self.options;

				self.toShow = toShow;
				self.toHide = toHide;
				self.data = data;

				var complete = function() {
					if ( !self ) {
						return;
					}
					return self._completed.apply( self, arguments );
				};

				// trigger changestart event
				self._trigger( "changestart", null, self.data );

				// count elements to animate
				self.running = toHide.size() === 0 ? toShow.size() : toHide.size();

				if ( options.animated ) {
					var animOptions = {};

					if ( options.collapsible && clickedIsActive ) {
						animOptions = {
							toShow: $( [] ),
							toHide: toHide,
							complete: complete,
							down: down,
							autoHeight: options.autoHeight || options.fillSpace
						};
					} else {
						animOptions = {
							toShow: toShow,
							toHide: toHide,
							complete: complete,
							down: down,
							autoHeight: options.autoHeight || options.fillSpace
						};
					}

					if ( !options.proxied ) {
						options.proxied = options.animated;
					}

					if ( !options.proxiedDuration ) {
						options.proxiedDuration = options.duration;
					}

					options.animated = $.isFunction( options.proxied ) ?
						options.proxied( animOptions ) :
						options.proxied;

					options.duration = $.isFunction( options.proxiedDuration ) ?
						options.proxiedDuration( animOptions ) :
						options.proxiedDuration;

					var animations = accordion_animations,
						duration = options.duration,
						easing = options.animated;

					if ( easing && !animations[ easing ] && !$.easing[ easing ] ) {
						easing = "slide";
					}
					if ( !animations[ easing ] ) {
						animations[ easing ] = function( options ) {
							this.slide( options, {
								easing: easing,
								duration: duration || 700
							});
						};
					}

					animations[ easing ]( animOptions );
				} else {
					if ( options.collapsible && clickedIsActive ) {
						toShow.toggle();
					} else {
						toHide.hide();
						toShow.show();
					}

					complete( true );
				}

				toHide.prev()
					.attr({
						"aria-expanded": "false",
						"aria-selected": "false",
						tabIndex: -1
					})
					.blur();
				toShow.prev()
					.attr({
						"aria-expanded": "true",
						"aria-selected": "true",
						tabIndex: 0
					})
					.focus();
			}
		}));
    }
})(jQuery);

if (typeof CV =='undefined') {
	CV = {};
}

CV.developper = function() {
	$('.ui-accordion-header').removeClass('ui-corner-all').addClass('ui-accordion-header-active ui-state-active ui-corner-top ui-state-focus').attr({'aria-expanded':'true','aria-selected':'true','tabindex':'0'});
    $('.ui-accordion-header .ui-icon').removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
    $('.ui-accordion-content').addClass('ui-accordion-content-active').attr({'aria-expanded':'true','aria-hidden':'false'}).show();
};
CV.reduire = function() {
	$('.ui-accordion-header').removeClass('ui-accordion-header-active ui-state-active ui-corner-top ui-state-focus').addClass('ui-corner-all').attr({'aria-expanded':'false','aria-selected':'false'});
    $('.ui-accordion-header .ui-icon').removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
    $('.ui-accordion-content').removeClass('ui-accordion-content-active').attr({'aria-expanded':'false','aria-hidden':'true'}).hide();
};

CV.basculer = function() {
	CV[$('.ui-accordion-header.ui-corner-all').length == $('.ui-accordion-header').length ? 'developper' : 'reduire']();
};

(function(){
    document.addEventListener('DOMContentLoaded', init);

    function init(){

        // Ajout d'un polyfill pour la fonction toBlob de HTMLCanvasElement
        // Cela permet de convertir un Canvas HTML5 en blob
        // Cela évite de traiter la conversion d'un Data URL dans le backend
        if (!HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
              var canvas = this;
              setTimeout(function() {

                var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (var i = 0; i < len; i++ ) {
                  arr[i] = binStr.charCodeAt(i);
                }

                callback( new Blob( [arr], {type: type || 'image/png'} ) );

              });
            }
          });
        }
    }
    window.eraseFile = function(){
       var picture =  document.getElementById('IMG_1');
       picture.setAttribute('style', 'display:none');

        var eraseButton = document.getElementById('BTN_EFFACER_1');
        eraseButton.setAttribute('style', 'display:none');

        var modifyPictureButton = parent.document.getElementById('BTN_AJOUT_MODIF_1');
        modifyPictureButton.setAttribute('href', '/upload/');
        modifyPictureButton.textContent = 'Ajouter une photo';

       var req = new XMLHttpRequest();
       req.open('DELETE', picture.src, true);

       req.send(null);
    }

})()