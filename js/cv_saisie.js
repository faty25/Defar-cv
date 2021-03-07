// Gestion des listes par objet (pas de requête AJAX) (avantage une seule persistance de l'objet CV, et une validation unique faite côté serveur)
// Le JS est obligatoire. Tous les éléments possèdent un idBean, il est donc possible de faire des requêtes Ajax pour avoir les mêmes fonctionnalités de modification / suppression / ajout
function CV(idCv, langues, logiciels, langages, formations, diplomes, experiences, stages, qualites) {
	this.idCv = idCv || 'cv-item';
	this.langues = langues || [];
	this.logiciels = logiciels || [];
	this.langages = langages || [];
	this.formations = formations || [];
	this.diplomes = diplomes || [];
	this.experiences = experiences || [];
	this.stages = stages || [];
	this.qualites = qualites || [];
	this.$cv = $('#' + this.idCv);
	this.erreurs = [];
};

CV.EXPRESSION_ERREUR_ATTRIBUT = /^(\w*)\[(\d*)\]\.(\w*)$/;

CV.prototype.initControle = function() {
	var me = this;

	this.traiterErreurs();
	// On ajoute sur le parent les erreurs
	$('.error', this.$cv).each(function() {
		var $item = $(this);
		var parent = $item.parent();
		if ($item.text()) {
			$(parent).addClass('controle');
			me.ouvrirSectionParente($item);
		} else {
			$(parent).removeClass('controle');
		}
	});
};

CV.prototype.ouvrirSectionParente = function($item) {
	var sections = $item.parents();
	$.each(sections, function(item, section) {
		var $section = $(section);
		if ($section.hasClass('ui-accordion-content')) {
			var $prev = $section.prev();
			if ($prev.hasClass('ui-accordion-header')) {
				$prev.removeClass('ui-corner-all').addClass('ui-accordion-header-active ui-state-active ui-corner-top').attr({
					'aria-selected': 'true',
					'tabindex': '0'
				});
				$prev.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
			}
			$section.addClass('ui-accordion-content-active').attr({
				'aria-expanded': 'true',
				'aria-hidden': 'false'
			}).show();
		}
	});
};

CV.prototype.ajouterBoutons = function(pElm, idElm, nouveau, edition) {
	var boutonValidation = $('<div class="validation"></div>').appendTo(pElm);
	if (nouveau) {
		$('<input type="button" class="ajouter" value="Ajouter"/>').appendTo(boutonValidation);
	} else {
		if (edition) {
			$('<input type="button" class="modifier" value="Valider"/>').appendTo(boutonValidation);
		} else {
			$('<input type="button" class="modifier" value="Modifier"/>').appendTo(boutonValidation);
		}
		$('<input type="button" data-id ="' + idElm + '" class="reset supprimer" value="Supprimer"/>').appendTo(boutonValidation);
	}
};

CV.prototype.ajouterLangue = function(element, pEdition) {
	var me = this,
		isEdition, nouveau, elem, libelleLangue, libelleNiveauComprendre, libelleNiveauParler, libelleNiveauEcrire, langue, niveauxLangues;

	isEdition = pEdition || false;
	nouveau = false;
	if (element) {
		elem = element;
	} else {
		nouveau = true;
		elem = {};
		elem.niveauNonRepertorie = null;
		elem.niveauComprendre = null;
		elem.niveauParler = null;
		elem.niveauEcrire = null;
		elem.libelle = null;
		elem.libelleNonRepertorie = null;
		elem.commentaire = null;
		elem.cles = null;
		elem.score = null;
		elem.idBean = new Date().valueOf().toString();
	}
	// Quid migration
	if (elem.libelle && $('#selectbox > select.selectbox__langue__libelle option[value="' + elem.libelle + '"]').length === 0) {
		elem.libelleNonRepertorie = elem.libelle;
		elem.libelle = '99';
	}

	if (elem.libelle === '99') {
		libelleLangue = elem.libelleNonRepertorie;
	} else {
		libelleLangue = $('#selectbox > select.selectbox__langue__libelle option[value="' + elem.libelle + '"]').text();
	}

	libelleNiveauComprendre = '';
	if (elem.niveauComprendre) {
		libelleNiveauComprendre = $('#selectbox > select.selectbox__langue__niveau_comprendre option[value="' + elem.niveauComprendre + '"]').text();
	}

	libelleNiveauParler = '';
	if (elem.niveauParler) {
		libelleNiveauParler = $('#selectbox > select.selectbox__langue__niveau_parler option[value="' + elem.niveauParler + '"]').text();
	}

	libelleNiveauEcrire = '';
	if (elem.niveauEcrire) {
		libelleNiveauEcrire = $('#selectbox > select.selectbox__langue__niveau_ecrire option[value="' + elem.niveauEcrire + '"]').text();
	}

	langue = $('<div data-id ="' + elem.idBean + '" class="cv__item__contenu langue"></div>');
	niveauxLangues = $('<fieldset class="form__fieldset"></fieldset>');
	niveauxLangues.append('<legend class="form__legend">Niveaux</legend>');

	if (isEdition) {
		var langueLibelle, langueNiveauComprendre, langueNiveauParler, langueNiveauEcrire;

		langueLibelle = $('<p></p>');
		langueLibelle.append('<label for="langue__libelle__' + elem.idBean + '">Langue</label>');
		langueLibelle.append($('#selectbox > .selectbox__langue__libelle').clone().attr('id', 'langue__libelle__' + elem.idBean));
		langue.append(langueLibelle);
		langue.append('<p class="langue__autre"><label class="langue__autre" for="langue__autre__' + elem.idBean + '"style="display: none;">Autre langue</label><input id="langue__autre__' + elem.idBean + '" class="langue__autre" type="text" maxlength="255" style="display: none;"/></p>');

		langueNiveauComprendre = $('<p></p>');
		langueNiveauComprendre.append('<label for="langue__niveau_comprendre__' + elem.idBean + '">Comprendre</label>');
		langueNiveauComprendre.append($('#selectbox > .selectbox__langue__niveau_comprendre').clone().attr('id', 'langue__niveau_comprendre__' + elem.idBean));
		niveauxLangues.append(langueNiveauComprendre);

		langueNiveauParler = $('<p></p>');
		langueNiveauParler.append('<label for="langue__niveau_parler__' + elem.idBean + '">Parler</label>');
		langueNiveauParler.append($('#selectbox > .selectbox__langue__niveau_parler').clone().attr('id', 'langue__niveau_parler__' + elem.idBean));
		niveauxLangues.append(langueNiveauParler);

		langueNiveauEcrire = $('<p></p>');
		langueNiveauEcrire.append('<label for="langue__niveau_ecrire__' + elem.idBean + '">Écrire</label>');
		langueNiveauEcrire.append($('#selectbox > .selectbox__langue__niveau_ecrire').clone().attr('id', 'langue__niveau_ecrire__' + elem.idBean));
		niveauxLangues.append(langueNiveauEcrire);

		niveauxLangues.append('<a href="https://europass.cedefop.europa.eu/fr/resources/european-language-levels-cefr" target="_blank">Plus d\'informations sur les niveaux européens de langues (CECR)</a>');

		langue.append(niveauxLangues);

		langue.append('<p><label for="langue__cles__' + elem.idBean + '">Certification</label><input id="langue__cles__' + elem.idBean + '" class="langue__cles" type="text" maxlength="255"/></p>');
		langue.append('<p><label for="langue__score__' + elem.idBean + '">Score</label><input id="langue__score__' + elem.idBean + '" class="langue__score" type="text" maxlength="255"/></p>');
		
		langue.append('<span class="infos">N\'hésitez pas à décrire votre rapport avec cette langue (LV1, LV2, LV3, langue régionale, langue familiale), ainsi que les différentes expériences qui vous auraient poussé à l\'apprendre (sections européennes, projet eTwinning, oral ou rédaction dans cette langue, séjour ou stage à l\'étranger, etc.).</span>');
		langue.append('<p><label for="langue__commentaire__' + elem.idBean + '">Commentaire</label><textarea rows="4" cols="30" id="langue__commentaire__' + elem.idBean + '" class="langue__commentaire zone-50" maxlength="2000"></textarea></p>');
	} else {
		langue.append('<div class="cv__item__ligne"><span>Langue :&nbsp;</span><span class="langue__libelle">' + CV.valeurAffichage(libelleLangue) + '</span></div>');

		niveauxLangues.append('<div class="cv__item__ligne"><span>Comprendre :&nbsp;</span><span class="langue__niveau_comprendre">' + CV.valeurAffichage(libelleNiveauComprendre) + '</span></div>');
		niveauxLangues.append('<div class="cv__item__ligne"><span>Parler :&nbsp;</span><span class="langue__niveau_parler">' + CV.valeurAffichage(libelleNiveauParler) + '</span></div>');
		niveauxLangues.append('<div class="cv__item__ligne"><span>Écrire :&nbsp;</span><span class="langue__niveau_ecrire">' + CV.valeurAffichage(libelleNiveauEcrire) + '</span></div>');
		langue.append(niveauxLangues);

		if (elem.cles) {
			langue.append('<div class="cv__item__ligne"><span>Certification :&nbsp;</span><span class="langue__cles">' + CV.valeurAffichage(elem.cles) + '</span></div>');
		}
		if (elem.score) {
			langue.append('<div class="cv__item__ligne"><span>Score :&nbsp;</span><span class="langue__score">' + CV.valeurAffichage(elem.score) + '</span></div>');
		}
		if (elem.commentaire) {
			langue.append('<div class="cv__item__ligne"><span>Commentaire :&nbsp;</span><span class="langue__commentaire">' + CV.valeurAffichage(elem.commentaire) + '</span></div>');
		}
	}
	this.ajouterBoutons(langue, elem.idBean, nouveau, isEdition);

	// Valeurs deja saisies
	if (elem.libelle) {
		$('select.selectbox__langue__libelle option[value=' + elem.libelle + ']', langue).prop('selected', true);
	}
	if (elem.libelle === '99') {
		$('.langue__autre', langue).show();
		$('input.langue__autre', langue).val(CV.valeurAffichage(elem.libelleNonRepertorie));
	} else {
		$('.langue__autre', langue).hide();
	}
	if (elem.niveauComprendre) {
		$('select.selectbox__langue__niveau_comprendre option[value=' + elem.niveauComprendre + ']', langue).prop('selected', true);
	}
	if (elem.niveauParler) {
		$('select.selectbox__langue__niveau_parler option[value=' + elem.niveauParler + ']', langue).prop('selected', true);
	}
	if (elem.niveauEcrire) {
		$('select.selectbox__langue__niveau_ecrire option[value=' + elem.niveauEcrire + ']', langue).prop('selected', true);
	}
	if (elem.cles) {
		$('input.langue__cles', langue).val(CV.valeurAffichage(elem.cles));
	}
	if (elem.score) {
		$('input.langue__score', langue).val(CV.valeurAffichage(elem.score));
	}
	if (elem.commentaire) {
		$('textarea.langue__commentaire', langue).val(CV.valeurDecodee(elem.commentaire));
	}
	$('.selectbox__langue__libelle', langue).on('change', function() {
		var selected = $('.selectbox__langue__libelle option:selected', langue);
		if (selected.length === 1 && selected[0].value === '99') {
			$('.langue__autre', langue).show();
		} else {
			$('.langue__autre', langue).hide();
		}
	});

	var enregistrerLangue = function(event, pElem, edition) {
		event.preventDefault();
		// Target étant un bouton contenu dans une div, il faut récupérer le parent de la div
		var parent = $(event.target).parent().parent();
		// Modele
		pElem.libelle = $('select.selectbox__langue__libelle', langue).val();

		if (pElem.libelle === '99') {
			pElem.libelleNonRepertorie = CV.valeurEdition($('input.langue__autre', langue));
		}
		pElem.niveauComprendre = $('select.selectbox__langue__niveau_comprendre', langue).val();
		pElem.niveauParler = $('select.selectbox__langue__niveau_parler', langue).val();
		pElem.niveauEcrire = $('select.selectbox__langue__niveau_ecrire', langue).val();

		pElem.cles = CV.valeurEdition($('input.langue__cles', langue));
		pElem.score = CV.valeurEdition($('input.langue__score', langue));
		pElem.commentaire = CV.valeurEdition($('textarea.langue__commentaire', langue));

		if (edition && !nouveau) {
			$.each(me.langues, function(index, item) {
				if (item.idBean === elem.idBean) {
					item = elem;
				}
			});
			$('.langues-form', me.$cv).trigger('update-data');
			var nouvelleLangue = me.ajouterLangue(elem, false);
			$('#' + me.idCv + ' .langues-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleLangue);
		} else {
			me.langues.push(pElem);
			$('.langues-form', me.$cv).trigger('update-data');
			// Ajout de la nouvelle langue (saisie)
			$('.langues-form', me.$cv).append(me.ajouterLangue(pElem, false));
			// Supprimer langue nouvelle correspondante
			parent.remove();
			// On en ajoute une nouvelle pour une saisie future lié à un ajout)
			$('.langues-form', me.$cv).append(me.ajouterLangue(null, true));
		}

	};

	// Controleur
	$('input.ajouter', langue).on('click', function(event) {
		enregistrerLangue(event, elem, isEdition);
	});

	// Controleur
	$('input.modifier', langue).on('click', function(event) {
		event.preventDefault();
		if (isEdition) {
			enregistrerLangue(event, elem, isEdition);
		} else {
			var nouvelleLangue = me.ajouterLangue(elem, true);
			$('#' + me.idCv + ' .langues-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleLangue);
		}
	});

	// Controleur
	$('input.supprimer', langue).on('click', function(event) {
		event.preventDefault();
		var dataid = $(event.target).attr('data-id');
		// Modele
		me.langues = $.grep(me.langues, function(item) {
			return item.idBean !== dataid;
		});
		$('.langues-form', me.$cv).trigger('update-data');
		// Vue
		$('.langues-form div[data-id=' + dataid + ']', me.$cv).remove();
	});
	return langue;
};

CV.prototype.ajouterLogiciel = function(element, pEdition) {
	var me = this,
		isEdition, nouveau, elem, libelleNiveau,
		logiciel;

	isEdition = pEdition || false;
	nouveau = false;
	if (element) {
		elem = element;
	} else {
		nouveau = true;
		elem = {};
		elem.niveau = null;
		elem.niveauNonRepertorie = null;
		elem.libelle = null;
		elem.libelleNonRepertorie = null;
		elem.idBean = new Date().valueOf().toString();
	}
	// Quid migration
	if (elem.niveau && $('#selectbox > select.selectbox__logiciel__niveau option[value="' + elem.niveau + '"]').length === 0) {
		elem.niveauNonRepertorie = elem.niveau;
		elem.niveau = '99';
	}
	if (elem.niveau === '99') {
		libelleNiveau = elem.niveauNonRepertorie;
	} else {
		libelleNiveau = $('#selectbox > select.selectbox__logiciel__niveau option[value="' + elem.niveau + '"]').text();
	}

	logiciel = $('<div data-id ="' + elem.idBean + '" class="cv__item__contenu logiciel"></div>');
	if (isEdition) {
		logiciel.append('<p class="logiciel__autre"><label class="logiciel__autre" for="logiciel__autre__' + elem.idBean + '">Logiciel (*)</label><input id="logiciel__autre__' + elem.idBean + '" class="logiciel__autre" type="text" maxlength="255"/><span class="message-erreur-validation">Le nom du logiciel est obligatoire</span></p>');

		var logicielNiveau = $('<p></p>');
		logicielNiveau.append('<label for="logiciel__niveau__' + elem.idBean + '">Niveau</label>');
		logicielNiveau.append($('#selectbox > .selectbox__logiciel__niveau').clone().attr('id', 'logiciel__niveau__' + elem.idBean));
		logiciel.append(logicielNiveau);

		logiciel.append('<p class="logiciel__niveau__autre"><label class="logiciel__niveau__autre" for="logiciel__niveau__autre__' + elem.idBean + '">Autre niveau</label><input id="logiciel__niveau__autre__' + elem.idBean + '" class="logiciel__niveau__autre" type="text" maxlength="255"/></p>');
	} else {
		logiciel.append('<div class="cv__item__ligne"><span>Logiciel :&nbsp;</span><span class="logiciel__libelle">' + CV.valeurAffichage(elem.libelleNonRepertorie) + '</span></div>');
		logiciel.append('<div class="cv__item__ligne"><span>Niveau :&nbsp;</span><span class="logiciel__niveau">' + CV.valeurAffichage(libelleNiveau) + '</span></div>');
	}
	this.ajouterBoutons(logiciel, elem.idBean, nouveau, isEdition);

	// Valeurs deja saisies
	if (elem.libelleNonRepertorie) {
		$('input.logiciel__autre', logiciel).val(CV.valeurAffichage(elem.libelleNonRepertorie));
	}
	if (elem.niveau) {
		$('select.selectbox__logiciel__niveau option[value=' + elem.niveau + ']', logiciel).prop('selected', true);
	}
	if (elem.niveau === '99') {
		$('.logiciel__niveau__autre', logiciel).show();

		$('input.logiciel__niveau__autre', logiciel).val(CV.valeurAffichage(elem.niveauNonRepertorie));
	} else {
		$('.logiciel__niveau__autre', logiciel).hide();
	}
	$('.selectbox__logiciel__niveau', logiciel).on('change', function() {
		var selected = $('.selectbox__logiciel__niveau option:selected', logiciel);
		if (selected.length === 1 && selected[0].value === '99') {
			$('.logiciel__niveau__autre', logiciel).show();
		} else {
			$('.logiciel__niveau__autre', logiciel).hide();
		}
	});

	var enregistrerLogiciel = function(event, pElem, edition) {
		var parent;

		event.preventDefault();

		CV.editionValide = true;

		// Target étant un bouton contenu dans une div, il faut récupérer le parent de la div
		parent = $(event.target).parent().parent();

		// Modele
		pElem.libelleNonRepertorie = CV.valeurEdition($('input.logiciel__autre', logiciel), true);

		pElem.niveau = $('select.selectbox__logiciel__niveau', logiciel).val();

		if (pElem.niveau === '99') {
			pElem.niveauNonRepertorie = CV.valeurEdition($('input.logiciel__niveau__autre', logiciel));
		}

		if (CV.editionValide) {
			if (edition && !nouveau) {
				$.each(me.logiciels, function (index, item) {
					if (item.idBean === elem.idBean) {
						item = elem;
					}
				});
				$('.logiciels-form', me.$cv).trigger('update-data');
				var nouveauLogiciel = me.ajouterLogiciel(elem, false);
				$('#' + me.idCv + ' .logiciels-form div[data-id=' + elem.idBean + ']').replaceWith(nouveauLogiciel);
			} else {
				me.logiciels.push(pElem);
				$('.logiciels-form', me.$cv).trigger('update-data');
				// Ajout de la nouvelle logiciel (saisie)
				$('.logiciels-form', me.$cv).append(me.ajouterLogiciel(pElem, false));
				// Supprimer logiciel nouvelle correspondante
				parent.remove();
				// On en ajoute une nouvelle pour une saisie future liï¿½ ï¿½ un ajout)
				$('.logiciels-form', me.$cv).append(me.ajouterLogiciel(null, true));
			}
		}
	};

	// Controleur
	$('input.ajouter', logiciel).on('click', function(event) {
		enregistrerLogiciel(event, elem, isEdition);
	});

	// Controleur
	$('input.modifier', logiciel).on('click', function(event) {
		event.preventDefault();
		if (isEdition) {
			enregistrerLogiciel(event, elem, isEdition);
		} else {
			var nouveauLogiciel = me.ajouterLogiciel(elem, true);
			$('#' + me.idCv + ' .logiciels-form div[data-id=' + elem.idBean + ']').replaceWith(nouveauLogiciel);
		}
	});

	// Controleur
	$('input.supprimer', logiciel).on('click', function(event) {
		event.preventDefault();
		var dataid = $(event.target).attr('data-id');
		// Modele
		me.logiciels = $.grep(me.logiciels, function(item) {
			return item.idBean !== dataid;
		});
		$('.logiciels-form', me.$cv).trigger('update-data');
		// Vue
		$('.logiciels-form div[data-id=' + dataid + ']', me.$cv).remove();
	});
	return logiciel;
};

CV.prototype.ajouterLangage = function(element, pEdition) {
	var me = this,
		isEdition, nouveau, elem,
		libelleLangage, libelleNiveau, langage;

	isEdition = pEdition || false;
	nouveau = false;
	if (element) {
		elem = element;
	} else {
		nouveau = true;
		elem = {};
		elem.niveau = null;
		elem.niveauNonRepertorie = null;
		elem.libelle = null;
		elem.libelleNonRepertorie = null;
		elem.cles = null;
		elem.idBean = new Date().valueOf().toString();
	}
	// Quid migration
	if (elem.libelle && $('#selectbox > select.selectbox__langage__libelle option[value="' + elem.libelle + '"]').length === 0) {
		elem.libelleNonRepertorie = elem.libelle;
		elem.libelle = '99';
	}
	if (elem.libelle === '99') {
		libelleLangage = elem.libelleNonRepertorie;
	} else {
		libelleLangage = $('#selectbox > select.selectbox__langage__libelle option[value="' + elem.libelle + '"]').text();
	}
	// Quid migration
	if (elem.niveau && $('#selectbox > select.selectbox__langage__niveau option[value="' + elem.niveau + '"]').length === 0) {
		elem.niveauNonRepertorie = elem.niveau;
		elem.niveau = '99';
	}
	if (elem.niveau === '99') {
		libelleNiveau = elem.niveauNonRepertorie;
	} else {
		libelleNiveau = $('#selectbox > select.selectbox__langage__niveau option[value="' + elem.niveau + '"]').text();
	}

	langage = $('<div data-id ="' + elem.idBean + '" class="cv__item__contenu langage"></div>');
	if (isEdition) {
		var langageLibelle, langageNiveau;

		langageLibelle = $('<p></p>');
		langageLibelle.append('<label for="langage__libelle__' + elem.idBean + '">Langage</label>');
		langageLibelle.append($('#selectbox > .selectbox__langage__libelle').clone().attr('id', 'langage__libelle__' + elem.idBean));

		langage.append(langageLibelle);
		langage.append('<p class="langage__autre"><label class="langage__autre" for="langage__autre__' + elem.idBean + '"style="display: none;">Autre langage</label><input id="langage__autre__' + elem.idBean + '" class="langage__autre" type="text" maxlength="255" style="display: none;"/></p>');

		langageNiveau = $('<p></p>');
		langageNiveau.append('<label for="langage__niveau__' + elem.idBean + '">Niveau</label>');
		langageNiveau.append($('#selectbox > .selectbox__langage__niveau').clone().attr('id', 'langage__niveau__' + elem.idBean));
		langage.append(langageNiveau);

		langage.append('<p class="langage__niveau__autre"><label class="langage__niveau__autre" for="langage__niveau__autre__' + elem.idBean + '"style="display: none;">Autre niveau</label><input id="langage__niveau__autre__' + elem.idBean + '" class="langage__niveau__autre" type="text" maxlength="255" style="display: none;"/></p>');
		langage.append('<p><label for="langage__cles__' + elem.idBean + '">Certification</label><input id="langage__cles__' + elem.idBean + '" class="langage__cles" type="text" maxlength="255"/></p>');
	} else {
		langage.append('<div class="cv__item__ligne"><span>Langage :&nbsp;</span><span class="langage__libelle">' + CV.valeurAffichage(libelleLangage) + '</span></div>');
		langage.append('<div class="cv__item__ligne"><span>Niveau :&nbsp;</span><span class="langage__niveau">' + CV.valeurAffichage(libelleNiveau) + '</span></div>');
		if (elem.cles) {
			langage.append('<div class="cv__item__ligne"><span>Certification :&nbsp;</span><span class="langage__cles">' + CV.valeurAffichage(elem.cles) + '</span></div>');
		}
	}
	this.ajouterBoutons(langage, elem.idBean, nouveau, isEdition);

	// Valeurs deja saisies
	if (elem.libelle) {
		$('select.selectbox__langage__libelle option[value=' + elem.libelle + ']', langage).prop('selected', true);
	}
	if (elem.libelle === '99') {
		$('.langage__autre', langage).show();
		$('input.langage__autre', langage).val(CV.valeurAffichage(elem.libelleNonRepertorie));
	} else {
		$('.langage__autre', langage).hide();
	}
	if (elem.niveau) {
		$('select.selectbox__langage__niveau option[value=' + elem.niveau + ']', langage).prop('selected', true);
	}
	if (elem.niveau === '99') {
		$('.langage__niveau__autre', langage).show();
		$('input.langage__niveau__autre', langage).val(CV.valeurAffichage(elem.niveauNonRepertorie));
	} else {
		$('.langage__niveau__autre', langage).hide();
	}
	if (elem.cles) {
		$('input.langage__cles', langage).val(CV.valeurAffichage(elem.cles));
	}
	$('.selectbox__langage__libelle', langage).on('change', function() {
		var selected = $('.selectbox__langage__libelle option:selected', langage);
		if (selected.length === 1 && selected[0].value === '99') {
			$('.langage__autre', langage).show();
		} else {
			$('.langage__autre', langage).hide();
		}
	});
	$('.selectbox__langage__niveau', langage).on('change', function() {
		var selected = $('.selectbox__langage__niveau option:selected', langage);
		if (selected.length === 1 && selected[0].value === '99') {
			$('.langage__niveau__autre', langage).show();
		} else {
			$('.langage__niveau__autre', langage).hide();
		}
	});

	var enregistrerLangage = function(event, pElem, edition) {
		event.preventDefault();
		// Target étant un bouton contenu dans une div, il faut récupérer le parent de la div
		var parent = $(event.target).parent().parent();
		// Modele
		pElem.libelle = $('select.selectbox__langage__libelle', langage).val();

		if (pElem.libelle === '99') {
			pElem.libelleNonRepertorie = CV.valeurEdition($('input.langage__autre', langage));
		}
		pElem.niveau = $('select.selectbox__langage__niveau', langage).val();

		if (pElem.niveau === '99') {
			pElem.niveauNonRepertorie = CV.valeurEdition($('input.langage__niveau__autre', langage));
		}
		pElem.cles = CV.valeurEdition($('input.langage__cles', langage));

		if (edition && !nouveau) {
			$.each(me.langages, function(index, item) {
				if (item.idBean === elem.idBean) {
					item = elem;
				}
			});
			$('.langages-form', me.$cv).trigger('update-data');
			var nouveauLangage = me.ajouterLangage(elem, false);
			$('#' + me.idCv + ' .langages-form div[data-id=' + elem.idBean + ']').replaceWith(nouveauLangage);
		} else {
			me.langages.push(pElem);
			$('.langages-form', me.$cv).trigger('update-data');
			// Ajout de la nouvelle langage (saisie)
			$('.langages-form', me.$cv).append(me.ajouterLangage(pElem, false));
			// Supprimer langage nouvelle correspondante
			parent.remove();
			// On en ajoute une nouvelle pour une saisie future liï¿½ ï¿½ un ajout)
			$('.langages-form', me.$cv).append(me.ajouterLangage(null, true));
		}

	};

	// Controleur
	$('input.ajouter', langage).on('click', function(event) {
		enregistrerLangage(event, elem, isEdition);
	});

	// Controleur
	$('input.modifier', langage).on('click', function(event) {
		event.preventDefault();
		if (isEdition) {
			enregistrerLangage(event, elem, isEdition);
		} else {
			var nouveauLangage = me.ajouterLangage(elem, true);
			$('#' + me.idCv + ' .langages-form div[data-id=' + elem.idBean + ']').replaceWith(nouveauLangage);
		}
	});

	// Controleur
	$('input.supprimer', langage).on('click', function(event) {
		event.preventDefault();
		var dataid = $(event.target).attr('data-id');
		// Modele
		me.langages = $.grep(me.langages, function(item) {
			return item.idBean !== dataid;
		});
		$('.langages-form', me.$cv).trigger('update-data');
		// Vue
		$('.langages-form div[data-id=' + dataid + ']', me.$cv).remove();
	});
	return langage;
};

CV.prototype.ajouterFormation = function(element, pEdition) {
	var me = this,
		isEdition, nouveau, elem;

	isEdition = pEdition || false;
	nouveau = false;
	if (element) {
		elem = element;
	} else {
		nouveau = true;
		elem = {};
		elem.type = null;
		elem.libelle = null;
		elem.etablissement = null;
		elem.commune = null;
		elem.departement = null;
		elem.dateDebutAnnee = null;
		elem.dateDebutMois = null;
		elem.dateDebutJour = null;
		elem.dateFinAnnee = null;
		elem.dateFinMois = null;
		elem.dateFinJour = null;
		elem.idBean = new Date().valueOf().toString();
	}

	var formation = $('<div data-id ="' + elem.idBean + '" class="cv__item__contenu formation"></div>');

	if (isEdition) {
		var formationDateDebut, formationDateFin;

		formation.append('<p><label for="formation__libelle__' + elem.idBean + '"><span>Formation (*)</span></label><input id="formation__libelle__' + elem.idBean + '" class="formation__libelle" type="text" maxlength="255"/><span class="message-erreur-validation">Le libellé de la formation est obligatoire</span></p>');
		formation.append('<p><label for="formation__etablissement__' + elem.idBean + '">Etablissement</label><input id="formation__etablissement__' + elem.idBean + '" class="formation__etablissement" type="text" maxlength="255"/></p>');
		formation.append('<p><label for="formation__commune__' + elem.idBean + '">Commune (*)</label><input id="formation__commune__' + elem.idBean + '" class="formation__commune" type="text" maxlength="85"/><span class="message-erreur-validation">Le nom de la commune est obligatoire</span><p>');
		formation.append('<p><label for="formation__departement__' + elem.idBean + '"><span>Code postal</span></label><input id="formation__departement__' + elem.idBean + '" class="formation__departement" type="text" maxlength="5"/><p>');

		formationDateDebut = $('<p></p>');
		formationDateDebut.append('<label for="formation__dateDebutAnnee__' + elem.idBean + '"><span>Date de d\u00e9but (*)</span></label>');
		formationDateDebut.append($('#selectbox > .selectbox__date__annee').clone().attr('id', 'formation__dateDebutAnnee__' + elem.idBean).addClass('dateDebutAnnee formation__dateDebutAnnee'));
		formationDateDebut.append($('#selectbox > .selectbox__date__mois').clone().attr('id', 'formation__dateDebutMois__' + elem.idBean).addClass('dateDebutMois formation__dateDebutMois'));
		formationDateDebut.append($('#selectbox > .selectbox__date__jour').clone().attr('id', 'formation__dateDebutJour__' + elem.idBean).addClass('dateDebutJour formation__dateDebutJour'));
		formationDateDebut.append('<span class="message-erreur-validation">Le date de début est obligatoire</span>');
		formation.append(formationDateDebut);

		formationDateFin = $('<p></p>');
		formationDateFin.append('<label for="formation__dateFinAnnee__' + elem.idBean + '">Date de fin</label>');
		formationDateFin.append($('#selectbox > .selectbox__date__annee').clone().attr('id', 'formation__dateFinAnnee__' + elem.idBean).addClass('dateFinAnnee formation__dateFinAnnee'));
		formationDateFin.append($('#selectbox > .selectbox__date__mois').clone().attr('id', 'formation__dateFinMois__' + elem.idBean).addClass('dateFinMois formation__dateFinMois'));
		formationDateFin.append($('#selectbox > .selectbox__date__jour').clone().attr('id', 'formation__dateFinJour__' + elem.idBean).addClass('dateFinJour formation__dateFinJour'));
		formation.append(formationDateFin);
		formation.append('<p class="checkbox"><label for="formation__encours__' + elem.idBean + '">En cours</label><input id="formation__encours__' + elem.idBean + '" class="formation__encours" type="checkbox"/></p>');
	} else {
		var date = CV.formateDateComplet(elem.dateDebutAnnee, elem.dateDebutMois, elem.dateDebutJour, elem.dateFinAnnee, elem.dateFinMois, elem.dateFinJour, elem.type);
		formation.append('<div class="cv__item__ligne"><span>Formation :&nbsp;</span><span class="formation__libelle">' + CV.valeurAffichage(elem.libelle) + '</span></div>');
		formation.append('<div class="cv__item__ligne"><span>Etablissement :&nbsp;</span><span class="formation__etablissement">' + CV.valeurAffichage(elem.etablissement) + '</span></div>');
		formation.append('<div class="cv__item__ligne"><span>Commune :&nbsp;</span><span class="formation__commune">' + CV.valeurAffichage(elem.commune) + '</span></div>');
		formation.append('<div class="cv__item__ligne"><span>Code postal :&nbsp;</span><span class="formation__departement">' + CV.valeurAffichage(elem.departement) + '</span></div>');
		formation.append('<div class="cv__item__ligne"><span>Date :&nbsp;</span><span class="formation__date">' + date + '</span></div>');
	}
	this.ajouterBoutons(formation, elem.idBean, nouveau, isEdition);

	// Valeurs deja saisies
	if (elem.libelle) {
		$('input.formation__libelle', formation).val(CV.valeurAffichage(elem.libelle));
	}

	if (elem.etablissement) {
		$('input.formation__etablissement', formation).val(CV.valeurDecodee(elem.etablissement));
	}
	if (elem.commune) {
		$('input.formation__commune', formation).val(CV.valeurDecodee(elem.commune));
	}
	if (elem.departement) {
		$('input.formation__departement', formation).val(CV.valeurDecodee(elem.departement));
	}

	if (elem.dateDebutAnnee) {
		$('select.dateDebutAnnee option[value=' + elem.dateDebutAnnee + ']', formation).prop('selected', true);
		if (elem.dateDebutMois) {
			$('select.dateDebutMois option[value=' + elem.dateDebutMois + ']', formation).prop('selected', true);
			if (elem.dateDebutJour) {
				$('select.dateDebutJour option[value=' + elem.dateDebutMois + ']', formation).prop('selected', true);
			}
		}
	}

	if (elem.dateFinAnnee) {
		$('select.dateFinAnnee option[value=' + elem.dateFinAnnee + ']', formation).prop('selected', true);
		if (elem.dateFinMois) {
			$('select.dateFinMois option[value=' + elem.dateFinMois + ']', formation).prop('selected', true);
			if (elem.dateFinJour) {
				$('select.dateFinJour option[value=' + elem.dateFinMois + ']', formation).prop('selected', true);
			}
		}
		$('select.dateFinAnnee', formation).prop('disabled', false);
		$('select.dateFinMois', formation).prop('disabled', false);
		$('select.dateFinJour', formation).prop('disabled', false);
		$('input.formation__encours', formation).prop('checked', false);
	} else {
		$('select.dateFinAnnee', formation).prop('disabled', true);
		$('select.dateFinMois', formation).prop('disabled', true);
		$('select.dateFinJour', formation).prop('disabled', true);
		$('input.formation__encours', formation).prop('checked', true);
	}

	$('input.formation__encours', formation).on('change', function() {
		var dataid = $(this).closest('.cv__item__contenu').attr('data-id');
		elem.dateFinAnnee = null;
		$('#formation__dateFinAnnee__' + dataid + ' option[value="0"]').prop('selected', true);
		$('select.dateFinAnnee', formation).prop('disabled', $(this).is(':checked'));
		$('select.dateFinMois', formation).prop('disabled', $(this).is(':checked'));
		$('select.dateFinJour', formation).prop('disabled', $(this).is(':checked'));
	});

	CV.activerSelectDate(formation, 'Debut');
	CV.activerSelectDate(formation, 'Fin');

	var enregistrerFormation = function(event, pElem, edition) {
		event.preventDefault();

		CV.editionValide = true;

		// Target étant un bouton contenu dans une div, il faut récupérer le parent de la div
		var parent = $(event.target).parent().parent();
		// Modele
		pElem.type = 'formation';
		pElem.libelle = CV.valeurEdition($('input.formation__libelle', formation), true);
		pElem.etablissement = CV.valeurEdition($('input.formation__etablissement', formation));
		pElem.commune = CV.valeurEdition($('input.formation__commune', formation), true);
		pElem.departement = CV.valeurEdition($('input.formation__departement', formation));
		pElem.dateDebutAnnee = CV.valeurDate($('select.dateDebutAnnee', formation), true);
		if (pElem.dateDebutAnnee) {
			pElem.dateDebutMois = CV.valeurDate($('select.dateDebutMois', formation));
			if (pElem.dateDebutMois) {
				pElem.dateDebutJour = CV.valeurDate($('select.dateDebutJour', formation));
			}
		}

		if (!$('input.formation__encours', formation).prop('checked')) {
			pElem.dateFinAnnee = CV.valeurDate($('select.dateFinAnnee', formation));
			if (pElem.dateFinAnnee) {
				pElem.dateFinMois = CV.valeurDate($('select.dateFinMois', formation));
				if (pElem.dateFinMois) {
					pElem.dateFinJour = CV.valeurDate($('select.dateFinJour', formation));
				}
			}
		} else {
			pElem.dateFinAnnee = null;
			pElem.dateFinMois = null;
			pElem.dateFinJour = null;
		}

		if (CV.editionValide) {
			if (edition && !nouveau) {
				$.each(me.formations, function(index, item) {
					if (item.idBean === elem.idBean) {
						item = elem;
					}
				});
				$('.formations-form', me.$cv).trigger('update-data');
				var nouvelleFormation = me.ajouterFormation(elem, false);
				$('#' + me.idCv + ' .formations-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleFormation);
			} else {
				me.formations.push(pElem);
				$('.formations-form', me.$cv).trigger('update-data');
				// Ajout de la nouvelle langue (saisie)
				$('.formations-form', me.$cv).append(me.ajouterFormation(pElem, false));
				// Supprimer langue nouvelle correspondante
				parent.remove();
				// On en ajoute une nouvelle pour une saisie future lié à un ajout)
				$('.formations-form', me.$cv).append(me.ajouterFormation(null, true));
			}
		}

	};

	// Controleur
	$('input.ajouter', formation).on('click', function(event) {
		enregistrerFormation(event, elem, isEdition);
	});

	// Controleur
	$('input.modifier', formation).on('click', function(event) {
		event.preventDefault();
		if (isEdition) {
			enregistrerFormation(event, elem, isEdition);
		} else {
			var nouvelleFormation = me.ajouterFormation(elem, true);
			$('#' + me.idCv + ' .formations-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleFormation);
		}
	});

	// Controleur
	$('input.supprimer', formation).on('click', function(event) {
		event.preventDefault();
		var dataid = $(event.target).attr('data-id');
		// Modele
		me.formations = $.grep(me.formations, function(item) {
			return item.idBean !== dataid;
		});
		$('.formations-form', me.$cv).trigger('update-data');
		// Vue
		$('.formations-form div[data-id=' + dataid + ']', me.$cv).remove();
	});
	return formation;
};


CV.prototype.ajouterDiplome = function(element, pEdition) {
	var me = this,
		isEdition, nouveau, elem, libelleDiplome, diplome;

	isEdition = pEdition || false;
	nouveau = false;
	if (element) {
		elem = element;
	} else {
		nouveau = true;
		elem = {};
		elem.type = null;
		elem.libelle = null;
		elem.libelleNonRepertorie = null;
		elem.etablissement = null;
		elem.commune = null;
		elem.departement = null;
		elem.dateDebutAnnee = null;
		elem.idBean = new Date().valueOf().toString();
	}

	// Quid migration
	if (elem.libelle && $('#selectbox > select.selectbox__diplome__libelle option[value="' + elem.libelle + '"]').length === 0) {
		elem.libelleNonRepertorie = elem.libelle;
		elem.libelle = '99';
	}
	if (elem.libelle === '99') {
		libelleDiplome = elem.libelleNonRepertorie;
	} else {
		libelleDiplome = $('#selectbox > select.selectbox__diplome__libelle option[value="' + elem.libelle + '"]').text();
	}

	diplome = $('<div data-id ="' + elem.idBean + '" class="cv__item__contenu diplome"></div>');
	if (isEdition) {
		var diplomeLibelle, diplomeDateDebut;

		diplomeLibelle = $('<p></p>');
		diplomeLibelle.append('<label for="diplome__libelle__' + elem.idBean + '">Dipl\u00f4me</label>');
		diplomeLibelle.append($('#selectbox > .selectbox__diplome__libelle').clone().attr('id', 'diplome__libelle__' + elem.idBean));
		diplome.append(diplomeLibelle);

		diplome.append('<p class="diplome__autre"><label class="diplome__autre" for="diplome__autre__' + elem.idBean + '"style="display: none;">Autre dipl\u00f4me</label><input id="diplome__autre__' + elem.idBean + '" class="diplome__autre" type="text" maxlength="255" style="display: none;"/></p>');
		diplome.append('<p><label for="diplome__etablissement__' + elem.idBean + '">Etablissement</label><input id="diplome__etablissement__' + elem.idBean + '" class="diplome__etablissement" type="text" maxlength="255"/></p>');
		diplome.append('<p><label for="diplome__commune__' + elem.idBean + '">Commune (*)</label><input id="diplome__commune__' + elem.idBean + '" class="diplome__commune" type="text" maxlength="85"/><span class="message-erreur-validation">Le nom de la commune est obligatoire</span></p>');
		diplome.append('<p><label for="diplome__departement__' + elem.idBean + '"><span>Code postal</span></label><input id="diplome__departement__' + elem.idBean + '" class="diplome__departement" type="text" maxlength="5"/><p>');

		diplomeDateDebut = $('<p></p>');
		diplomeDateDebut.append('<label for="diplome__dateDebutAnnee__' + elem.idBean + '"><span>Date d\'obtention (*)</span></label>');
		diplomeDateDebut.append($('#selectbox > .selectbox__date__annee').clone().attr('id', 'diplome__dateDebutAnnee__' + elem.idBean).addClass('dateDebutAnnee diplome__dateDebutAnnee'));
		diplomeDateDebut.append($('#selectbox > .selectbox__date__mois').clone().attr('id', 'diplome__dateDebutMois__' + elem.idBean).addClass('dateDebutMois diplome__dateDebutMois'));
		diplomeDateDebut.append($('#selectbox > .selectbox__date__jour').clone().attr('id', 'diplome__dateDebutJour__' + elem.idBean).addClass('dateDebutJour diplome__dateDebutJour'));
		diplomeDateDebut.append('<span class="message-erreur-validation">Le date de début est obligatoire</span>');
		diplome.append(diplomeDateDebut);

	} else {
		var date = CV.formateDateComplet(elem.dateDebutAnnee, elem.dateDebutMois, elem.dateDebutJour, null, null, null, elem.type);
		diplome.append('<div class="cv__item__ligne"><span>Dipl\u00f4me :&nbsp;</span><span class="diplome__libelle">' + CV.valeurAffichage(libelleDiplome) + '</span></div>');
		diplome.append('<div class="cv__item__ligne"><span>Etablissement :&nbsp;</span><span class="diplome__etablissement">' + CV.valeurAffichage(elem.etablissement) + '</span></div>');
		diplome.append('<div class="cv__item__ligne"><span>Commune (*) :&nbsp;</span><span class="diplome__commune">' + CV.valeurAffichage(elem.commune) + '</span></div>');
		diplome.append('<div class="cv__item__ligne"><span>Code postal :&nbsp;</span><span class="diplome__departement">' + CV.valeurAffichage(elem.departement) + '</span></div>');
		diplome.append('<div class="cv__item__ligne"><span>Date d\'obtention (*) :&nbsp;</span><span class="diplome__date">' + date + '</span></div>');
	}
	this.ajouterBoutons(diplome, elem.idBean, nouveau, isEdition);

	// Valeurs deja saisies
	if (elem.libelle) {
		$('select.selectbox__diplome__libelle option[value=' + elem.libelle + ']', diplome).prop('selected', true);
	}
	if (elem.libelle === '99') {
		$('.diplome__autre', diplome).show();
		$('input.diplome__autre', diplome).val(CV.valeurAffichage(elem.libelleNonRepertorie));
	} else {
		$('.diplome__autre', diplome).hide();
	}

	if (elem.etablissement) {
		$('input.diplome__etablissement', diplome).val(CV.valeurDecodee(elem.etablissement));
	}
	if (elem.commune) {
		$('input.diplome__commune', diplome).val(CV.valeurDecodee(elem.commune));
	}
	if (elem.departement) {
		$('input.diplome__departement', diplome).val(CV.valeurDecodee(elem.departement));
	}

	if (elem.dateDebutAnnee) {
		$('select.dateDebutAnnee option[value=' + elem.dateDebutAnnee + ']', diplome).prop('selected', true);
		if (elem.dateDebutMois) {
			$('select.dateDebutMois option[value=' + elem.dateDebutMois + ']', diplome).prop('selected', true);
			if (elem.dateDebutJour) {
				$('select.dateDebutJour option[value=' + elem.dateDebutMois + ']', diplome).prop('selected', true);
			}
		}
	}

	$('.selectbox__diplome__libelle', diplome).on('change', function() {
		var selected = $('.selectbox__diplome__libelle option:selected', diplome);
		if (selected.length === 1 && selected[0].value === '99') {
			$('.diplome__autre', diplome).show();
		} else {
			$('.diplome__autre', diplome).hide();
		}
	});

	CV.activerSelectDate(diplome, 'Debut');

	var enregistrerDiplome = function(event, pElem, edition) {
		event.preventDefault();

		CV.editionValide = true;

		// Target étant un bouton contenu dans une div, il faut récupérer le parent de la div
		var parent = $(event.target).parent().parent();
		// Modele
		pElem.libelle = $('select.selectbox__diplome__libelle', diplome).val();
		if (pElem.libelle === '99') {
			pElem.libelleNonRepertorie = CV.valeurEdition($('input.diplome__autre', diplome));
		}
		pElem.type = 'diplome';
		pElem.etablissement = CV.valeurEdition($('input.diplome__etablissement', diplome));
		pElem.commune = CV.valeurEdition($('input.diplome__commune', diplome), true);
		pElem.departement = CV.valeurEdition($('input.diplome__departement', diplome));
		pElem.dateDebutAnnee = CV.valeurDate($('select.dateDebutAnnee', diplome), true);
		if (pElem.dateDebutAnnee) {
			pElem.dateDebutMois = CV.valeurDate($('select.dateDebutMois', diplome));
			if (pElem.dateDebutMois) {
				pElem.dateDebutJour = CV.valeurDate($('select.dateDebutJour', diplome));
			}
		}

		if (CV.editionValide) {
			if (edition && !nouveau) {
				$.each(me.diplomes, function(index, item) {
					if (item.idBean === elem.idBean) {
						item = elem;
					}
				});
				$('.diplomes-form', me.$cv).trigger('update-data');
				var nouvelleDiplome = me.ajouterDiplome(elem, false);
				$('#' + me.idCv + ' .diplomes-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleDiplome);
			} else {
				me.diplomes.push(pElem);
				$('.diplomes-form', me.$cv).trigger('update-data');
				// Ajout de la nouvelle langue (saisie)
				$('.diplomes-form', me.$cv).append(me.ajouterDiplome(pElem, false));
				// Supprimer langue nouvelle correspondante
				parent.remove();
				// On en ajoute une nouvelle pour une saisie future lié à un ajout)
				$('.diplomes-form', me.$cv).append(me.ajouterDiplome(null, true));
			}
		}
	};

	// Controleur
	$('input.ajouter', diplome).on('click', function(event) {
		enregistrerDiplome(event, elem, isEdition);
	});

	// Controleur
	$('input.modifier', diplome).on('click', function(event) {
		event.preventDefault();
		if (isEdition) {
			enregistrerDiplome(event, elem, isEdition);
		} else {
			var nouvelleDiplome = me.ajouterDiplome(elem, true);
			$('#' + me.idCv + ' .diplomes-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleDiplome);
		}
	});

	// Controleur
	$('input.supprimer', diplome).on('click', function(event) {
		event.preventDefault();
		var dataid = $(event.target).attr('data-id');
		// Modele
		me.diplomes = $.grep(me.diplomes, function(item) {
			return item.idBean !== dataid;
		});
		$('.diplomes-form', me.$cv).trigger('update-data');
		// Vue
		$('.diplomes-form div[data-id=' + dataid + ']', me.$cv).remove();
	});
	return diplome;
};

CV.prototype.ajouterExperience = function(element, pEdition) {
	var me = this,
		isEdition, nouveau, elem, typeExperience, experience;

	isEdition = pEdition || false;
	nouveau = false;
	if (element) {
		elem = element;
	} else {
		nouveau = true;
		elem = {};
		elem.type = null;
		elem.typeNonRepertorie = null;
		elem.typeContrat = null;
		elem.mention = null;
		elem.fonction = null;
		elem.tache = null;
		elem.competences = null;
		elem.nomEntreprise = null;
		elem.commune = null;
		elem.departement = null;
		elem.dateDebutAnnee = null;
		elem.dateDebutMois = null;
		elem.dateDebutJour = null;
		elem.dateFinAnnee = null;
		elem.dateFinMois = null;
		elem.dateFinJour = null;
		elem.idBean = new Date().valueOf().toString();
	}
	// Quid migration
	if (elem.type && $('#selectbox > select.selectbox__experience__type option[value="' + elem.type + '"]').length === 0) {
		elem.typeNonRepertorie = elem.type;
		elem.type = '99';
	}
	if (elem.type === '99') {
		typeExperience = elem.typeNonRepertorie;
	} else {
		typeExperience = $('#selectbox > select.selectbox__experience__type option[value="' + elem.type + '"]').text();
	}

	experience = $('<div data-id ="' + elem.idBean + '" class="cv__item__contenu experience"></div>');
	if (isEdition) {
		var experienceType, experienceDateDebut, experienceDateFin;

		experienceType = $('<p></p>');
		experienceType.append('<label for="experience__type__' + elem.idBean + '">Type d\'expérience professionnelle</label>');
		experienceType.append($('#selectbox > .selectbox__experience__type').clone().attr('id', 'experience__type__' + elem.idBean));
		experience.append(experienceType);

		experience.append('<p class="experience__autre"><label class="experience__autre" for="experience__autre__' + elem.idBean + '"style="display: none;">Autre exp\u00e9rience (*)</label><input id="experience__autre__' + elem.idBean + '" class="experience__autre" type="text" maxlength="255" style="display: none;"/><span class="message-erreur-validation">Si le type d\'expérience est à Autre, le champ autre expérience est obligatoire</span></p>');
		experience.append('<p><label for="experience__typeContrat__' + elem.idBean + '"><span>Type de contrat</span></label><input id="experience__typeContrat__' + elem.idBean + '" class="experience__typeContrat" type="text" maxlength="255"/></p>');
        experience.append('<span class="infos">Apprentissage ou professionnalisation</span>');
		experience.append('<p><label for="experience__fonction__' + elem.idBean + '"><span>Fonction (*)</span></label><input id="experience__fonction__' + elem.idBean + '" class="experience__fonction" type="text" maxlength="255"/><span class="message-erreur-validation">La fonction est obligatoire</span></p>');
		experience.append('<p><label for="experience__nomEntreprise__' + elem.idBean + '"><span>Nom entreprise (*)</span></label><input id="experience__nomEntreprise__' + elem.idBean + '" class="experience__nomEntreprise" type="text" maxlength="255"/><span class="message-erreur-validation">Le nom de l\'entreprise est obligatoire</span></p>');
		experience.append('<p><label for="experience__commune__' + elem.idBean + '"><span>Commune (*)</span></label><input id="experience__commune__' + elem.idBean + '" class="experience__commune" type="text" maxlength="85"/><span class="message-erreur-validation">Le nom de la commune est obligatoire</span></p>');
		experience.append('<p><label for="experience__departement__' + elem.idBean + '"><span>Code postal</span></label><input id="experience__departement__' + elem.idBean + '" class="experience__departement" type="text" maxlength="5"/><p>');

		experienceDateDebut = $('<p></p>');
		experienceDateDebut.append('<label for="experience__dateDebutAnnee__' + elem.idBean + '"><span>Date de d\u00e9but (*)</span></label>');
		experienceDateDebut.append($('#selectbox > .selectbox__date__annee').clone().attr('id', 'experience__dateDebutAnnee__' + elem.idBean).addClass('dateDebutAnnee experience__dateDebutAnnee'));
		experienceDateDebut.append($('#selectbox > .selectbox__date__mois').clone().attr('id', 'experience__dateDebutMois__' + elem.idBean).addClass('dateDebutMois experience__dateDebutMois'));
		experienceDateDebut.append($('#selectbox > .selectbox__date__jour').clone().attr('id', 'experience__dateDebutJour__' + elem.idBean).addClass('dateDebutJour experience__dateDebutJour'));
		experienceDateDebut.append('<span class="message-erreur-validation">Le date de début est obligatoire</span>');
		experience.append(experienceDateDebut);

		experienceDateFin = $('<p></p>');
		experienceDateFin.append('<label for="experience__dateFinAnnee__' + elem.idBean + '">Date de fin</label>');
		experienceDateFin.append($('#selectbox > .selectbox__date__annee').clone().attr('id', 'experience__dateFinAnnee__' + elem.idBean).addClass('dateFinAnnee experience__dateFinAnnee'));
		experienceDateFin.append($('#selectbox > .selectbox__date__mois').clone().attr('id', 'experience__dateFinMois__' + elem.idBean).addClass('dateFinMois experience__dateFinMois'));
		experienceDateFin.append($('#selectbox > .selectbox__date__jour').clone().attr('id', 'experience__dateFinJour__' + elem.idBean).addClass('dateFinJour experience__dateFinJour'));
		experience.append(experienceDateFin);

		experience.append('<p class="checkbox"><label for="experience__encours__' + elem.idBean + '">En cours</label><input id="experience__encours__' + elem.idBean + '" class="experience__encours" type="checkbox"/></p>');
		experience.append('<p><label for="experience__tache__' + elem.idBean + '">Missions</label><textarea rows="4" cols="30" id="experience__tache__' + elem.idBean + '" class="experience__tache zone-50" maxlength="2000"></textarea></p>');
		experience.append('<p><label for="experience__competences__' + elem.idBean + '">Comp\u00e9tences acquises</label><textarea rows="4" cols="30" id="experience__competences__' + elem.idBean + '" class="experience__competences zone-50" maxlength="2000"></textarea></p>');

	} else {
		var date = CV.formateDateComplet(elem.dateDebutAnnee, elem.dateDebutMois, elem.dateDebutJour, elem.dateFinAnnee, elem.dateFinMois, elem.dateFinJour, elem.type);
		experience.append('<div class="cv__item__ligne"><span>Type d\'exp\u00e9rience :&nbsp;</span><span class="experience__type">' + typeExperience + '</span></div>');

		if (elem.type === '01' && elem.mention) {
			experience.append('<div class="cv__item__ligne"><span>Type de stage :&nbsp;</span><span class="experience__mention">' + CV.valeurAffichage(elem.mention) + '</span></div>');
		}

		experience.append('<div class="cv__item__ligne"><span>Type de contrat :&nbsp;</span><span class="experience__typeContrat">' + CV.valeurAffichage(elem.typeContrat) + '</span></div>');
		experience.append('<div class="cv__item__ligne"><span>Fonction (*) :&nbsp;</span><span class="experience__fonction">' + CV.valeurAffichage(elem.fonction) + '</span></div>');
		experience.append('<div class="cv__item__ligne"><span>Nom entreprise (*) :&nbsp;</span><span class="experience__nomEntreprise">' + CV.valeurAffichage(elem.nomEntreprise) + '</span></div>');
		experience.append('<div class="cv__item__ligne"><span>Commune (*) :&nbsp;</span><span class="experience__commune">' + CV.valeurAffichage(elem.commune) + '</span></div>');
		experience.append('<div class="cv__item__ligne"><span>Code postal :&nbsp;</span><span class="experience__departement">' + CV.valeurAffichage(elem.departement) + '</span></div>');
		experience.append('<div class="cv__item__ligne"><span>Date (*) :&nbsp;</span><span class="experience__date">' + date + '</span></div>');
		experience.append('<div class="cv__item__ligne"><span>Missions :&nbsp;</span><span class="experience__tache">' + CV.valeurAffichage(elem.tache) + '</span></div>');
		experience.append('<div class="cv__item__ligne"><span>Comp\u00e9tences acquises :&nbsp;</span><span class="experience__competences">' + CV.valeurAffichage(elem.competences) + '</span></div>');
	}
	this.ajouterBoutons(experience, elem.idBean, nouveau, isEdition);

	// Valeurs deja saisies
	if (elem.type) {
		$('select.selectbox__experience__type option[value=' + elem.type + ']', experience).prop('selected', true);
	}
	if (elem.type === '99') {
		$('.experience__autre', experience).show();
		$('input.experience__autre', experience).val(CV.valeurAffichage(elem.typeNonRepertorie));
	} else {
		$('.experience__autre', experience).hide();
	}

	if (elem.typeContrat) {
		$('input.experience__typeContrat', experience).val(CV.valeurDecodee(elem.typeContrat));
	}
	if (elem.fonction) {
		$('input.experience__fonction', experience).val(CV.valeurDecodee(elem.fonction));
	}
	if (elem.nomEntreprise) {
		$('input.experience__nomEntreprise', experience).val(CV.valeurDecodee(elem.nomEntreprise));
	}
	if (elem.commune) {
		$('input.experience__commune', experience).val(CV.valeurDecodee(elem.commune));
	}
	if (elem.departement) {
		$('input.experience__departement', experience).val(CV.valeurDecodee(elem.departement));
	}

	if (elem.dateDebutAnnee) {
		$('select.dateDebutAnnee option[value=' + elem.dateDebutAnnee + ']', experience).prop('selected', true);
		if (elem.dateDebutMois) {
			$('select.dateDebutMois option[value=' + elem.dateDebutMois + ']', experience).prop('selected', true);
			if (elem.dateDebutJour) {
				$('select.dateDebutJour option[value=' + elem.dateDebutJour + ']', experience).prop('selected', true);
			}
		}
	}

	if (elem.dateFinAnnee) {
		$('select.dateFinAnnee option[value=' + elem.dateFinAnnee + ']', experience).prop('selected', true);
		if (elem.dateFinMois) {
			$('select.dateFinMois option[value=' + elem.dateFinMois + ']', experience).prop('selected', true);
			if (elem.dateFinJour) {
				$('select.dateFinJour option[value=' + elem.dateFinJour + ']', experience).prop('selected', true);
			}
		}
		$('select.dateFinAnnee', experience).prop('disabled', false);
		$('select.dateFinMois', experience).prop('disabled', false);
		$('select.dateFinJour', experience).prop('disabled', false);
		$('input.experience__encours', experience).prop('checked', false);
	} else {
		$('select.dateFinAnnee', experience).prop('disabled', true);
		$('select.dateFinMois', experience).prop('disabled', true);
		$('select.dateFinJour', experience).prop('disabled', true);
		$('input.experience__encours', experience).prop('checked', true);
	}

	if (elem.tache) {
		$('textarea.experience__tache', experience).val(CV.valeurDecodee(elem.tache));
	}
	if (elem.competences) {
		$('textarea.experience__competences', experience).val(CV.valeurDecodee(elem.competences));
	}

	$('input.experience__encours', experience).on('change', function() {
		var dataid = $(this).closest('.cv__item__contenu').attr('data-id');
		elem.dateFinAnnee = null;
		elem.dateFinMois = null;
		elem.dateFinJour = null;

		$('#experience__dateFinAnnee__' + dataid + ' option[value="0"]').prop('selected', true);
		$('#experience__dateFinMois__' + dataid + ' option[value="0"]').prop('selected', true);
		$('#experience__dateFinJour__' + dataid + ' option[value="0"]').prop('selected', true);
		$('select.dateFinAnnee', experience).prop('disabled', $(this).is(':checked'));
		$('select.dateFinMois', experience).prop('disabled', $(this).is(':checked'));
		$('select.dateFinJour', experience).prop('disabled', $(this).is(':checked'));
	});

	$('.selectbox__experience__type', experience).on('change', function() {
		var selected = $('.selectbox__experience__type option:selected', experience);
		if (selected.length === 1 && selected[0].value === '99') {
			$('.experience__autre', experience).show();
		} else {
			$('.experience__autre', experience).hide();
		}
		if (selected.length === 1 && selected[0].value === '01') {
			$('.experience__mention', experience).show();
		} else {
			$('.experience__mention', experience).hide();
		}
	});

	CV.activerSelectDate(experience, 'Debut');
	CV.activerSelectDate(experience, 'Fin');

	var enregistrerExperience = function(event, pElem, edition) {
		event.preventDefault();

		CV.editionValide = true;

		// Target étant un bouton contenu dans une div, il faut récupérer le parent de la div
		var parent = $(event.target).parent().parent();
		// Modele
		pElem.type = $('select.selectbox__experience__type', experience).val();

		if (pElem.type === '99') {
			pElem.typeNonRepertorie = CV.valeurEdition($('input.experience__autre', experience),true);
		}

		pElem.mention = null;
		if (pElem.type === '01') {
			pElem.mention = CV.valeurEdition($('input.experience__mention:checked', experience));
		}

		pElem.typeContrat = CV.valeurEdition($('input.experience__typeContrat', experience));
		pElem.fonction = CV.valeurEdition($('input.experience__fonction', experience), true);
		pElem.nomEntreprise = CV.valeurEdition($('input.experience__nomEntreprise', experience), true);
		pElem.commune = CV.valeurEdition($('input.experience__commune', experience), true);
		pElem.departement = CV.valeurEdition($('input.experience__departement', experience));

		pElem.dateDebutAnnee = CV.valeurDate($('select.dateDebutAnnee', experience), true);
		if (pElem.dateDebutAnnee) {
			pElem.dateDebutMois = CV.valeurDate($('select.dateDebutMois', experience));
			if (pElem.dateDebutMois) {
				pElem.dateDebutJour = CV.valeurDate($('select.dateDebutJour', experience));
			}
		}

		if (!$('input.experience__encours', experience).prop('checked')) {
			pElem.dateFinAnnee = CV.valeurDate($('select.dateFinAnnee', experience));
			if (pElem.dateFinAnnee) {
				pElem.dateFinMois = CV.valeurDate($('select.dateFinMois', experience));
				if (pElem.dateFinMois) {
					pElem.dateFinJour = CV.valeurDate($('select.dateFinJour', experience));
				}
			}
		} else {
			pElem.dateFinAnnee = null;
			pElem.dateFinMois = null;
			pElem.dateFinJour = null;
		}

		pElem.tache = CV.valeurEdition($('textarea.experience__tache', experience));
		pElem.competences = CV.valeurEdition($('textarea.experience__competences', experience));

		if (CV.editionValide) {
			if (edition && !nouveau) {
				$.each(me.experiences, function(index, item) {
					if (item.idBean === elem.idBean) {
						item = elem;
					}
				});
				$('.experiences-form', me.$cv).trigger('update-data');
				var nouvelleExperience = me.ajouterExperience(elem, false);
				$('#' + me.idCv + ' .experiences-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleExperience);
			} else {
				me.experiences.push(pElem);
				$('.experiences-form', me.$cv).trigger('update-data');
				// Ajout de la nouvelle langue (saisie)
				$('.experiences-form', me.$cv).append(me.ajouterExperience(pElem, false));
				// Supprimer langue nouvelle correspondante
				parent.remove();
				// On en ajoute une nouvelle pour une saisie future lié à un ajout)
				$('.experiences-form', me.$cv).append(me.ajouterExperience(null, true));
			}
		}

	};

	// Controleur
	$('input.ajouter', experience).on('click', function(event) {
		enregistrerExperience(event, elem, isEdition);
	});

	// Controleur
	$('input.modifier', experience).on('click', function(event) {
		event.preventDefault();
		if (isEdition) {
			enregistrerExperience(event, elem, isEdition);
		} else {
			var nouvelleExperience = me.ajouterExperience(elem, true);
			$('#' + me.idCv + ' .experiences-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleExperience);
		}
	});

	// Controleur
	$('input.supprimer', experience).on('click', function(event) {
		event.preventDefault();
		var dataid = $(event.target).attr('data-id');
		// Modele
		me.experiences = $.grep(me.experiences, function(item) {
			return item.idBean !== dataid;
		});
		$('.experiences-form', me.$cv).trigger('update-data');
		// Vue
		$('.experiences-form div[data-id=' + dataid + ']', me.$cv).remove();
	});
	return experience;
};

CV.prototype.ajouterQualite = function(element, pEdition) {
	var me = this,
		isEdition, nouveau, elem, libelleQualite, qualite;

	isEdition = pEdition || false;
	nouveau = false;
	if (element) {
		elem = element;
	} else {
		nouveau = true;
		elem = {};
		elem.libelle = null;
		elem.libelleNonRepertorie = null;
		elem.precision = null;
		elem.idBean = new Date().valueOf().toString();

	}
	// Quid migration
	if (elem.libelle && $('#selectbox > select.selectbox__qualite__libelle option[value="' + elem.libelle + '"]').length === 0) {
		elem.libelleNonRepertorie = elem.libelle;
		elem.libelle = '99';
	}
	if (elem.libelle === '99') {
		libelleQualite = elem.libelleNonRepertorie;
	} else {
		libelleQualite = $('#selectbox > select.selectbox__qualite__libelle option[value="' + elem.libelle + '"]').text();
	}
	qualite = $('<div data-id ="' + elem.idBean + '" class="cv__item__contenu qualite"></div>');
	if (isEdition) {
		var qualiteLibelle = $('<p></p>');
		qualiteLibelle.append('<label for="qualite__libelle__' + elem.idBean + '">Qualite</label>');
		qualiteLibelle.append($('#selectbox > .selectbox__qualite__libelle').clone().attr('id', 'qualite__libelle__' + elem.idBean));
		qualite.append(qualiteLibelle);

		qualite.append('<p class="qualite__autre"><label class="qualite__autre" for="qualite__autre__' + elem.idBean + '"style="display: none;">Autre qualite</label><input id="qualite__autre__' + elem.idBean + '" class="qualite__autre" type="text" maxlength="255" style="display: none;"/></p>');
		qualite.append('<p><label for="qualite__precision__' + elem.idBean + '">Commentaire</label><input id="qualite__precision__' + elem.idBean + '" class="qualite__precision" type="text" maxlength="255"/></p>');
	} else {
		qualite.append('<div class="cv__item__ligne"><span>Qualite :&nbsp;</span><span class="qualite__libelle">' + CV.valeurAffichage(libelleQualite) + '</span></div>');
		if (elem.precision) {
			qualite.append('<div class="cv__item__ligne"><span>Commentaire :&nbsp;</span><span class="qualite__precision">' + CV.valeurAffichage(elem.precision) + '</span></div>');
		}
	}
	this.ajouterBoutons(qualite, elem.idBean, nouveau, isEdition);

	// Valeurs deja saisies
	if (elem.libelle) {
		$('select.selectbox__qualite__libelle option[value=' + elem.libelle + ']', qualite).prop('selected', true);
	}
	if (elem.libelle === '99') {
		$('.qualite__autre', qualite).show();
		$('input.qualite__autre', qualite).val(CV.valeurAffichage(elem.libelleNonRepertorie));
	} else {
		$('.qualite__autre', qualite).hide();
	}
	if (elem.precision) {
		$('input.qualite__precision', qualite).val(CV.valeurDecodee(elem.precision));
	}
	$('.selectbox__qualite__libelle', qualite).on('change', function() {
		var selected = $('.selectbox__qualite__libelle option:selected', qualite);
		if (selected.length === 1 && selected[0].value === '99') {
			$('.qualite__autre', qualite).show();
		} else {
			$('.qualite__autre', qualite).hide();
		}
	});

	var enregistrerQualite = function(event, pElem, edition) {
		event.preventDefault();
		// Target étant un bouton contenu dans une div, il faut récupérer le parent de la div
		var parent = $(event.target).parent().parent();
		// Modele
		pElem.libelle = $('select.selectbox__qualite__libelle', qualite).val();

		if (pElem.libelle === '99') {
			pElem.libelleNonRepertorie = CV.valeurEdition($('input.qualite__autre', qualite));
		}
		pElem.precision = CV.valeurEdition($('input.qualite__precision', qualite));

		if (edition && !nouveau) {
			$.each(me.qualites, function(index, item) {
				if (item.idBean === elem.idBean) {
					item = elem;
				}
			});
			$('.qualites-form', me.$cv).trigger('update-data');
			var nouvelleQualite = me.ajouterQualite(elem, false);
			$('#' + me.idCv + ' .qualites-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleQualite);
		} else {
			me.qualites.push(pElem);
			$('.qualites-form', me.$cv).trigger('update-data');
			// Ajout de la nouvelle qualite (saisie)
			$('.qualites-form', me.$cv).append(me.ajouterQualite(pElem, false));
			// Supprimer qualite nouvelle correspondante
			parent.remove();
			// On en ajoute une nouvelle pour une saisie future lié à un ajout)
			$('.qualites-form', me.$cv).append(me.ajouterQualite(null, true));
		}

	};

	// Controleur
	$('input.ajouter', qualite).on('click', function(event) {
		enregistrerQualite(event, elem, isEdition);
	});

	// Controleur
	$('input.modifier', qualite).on('click', function(event) {
		event.preventDefault();
		if (isEdition) {
			enregistrerQualite(event, elem, isEdition);
		} else {
			var nouvelleQualite = me.ajouterQualite(elem, true);
			$('#' + me.idCv + ' .qualites-form div[data-id=' + elem.idBean + ']').replaceWith(nouvelleQualite);
		}
	});

	// Controleur
	$('input.supprimer', qualite).on('click', function(event) {
		event.preventDefault();
		var dataid = $(event.target).attr('data-id');
		// Modele
		me.qualites = $.grep(me.qualites, function(item) {
			return item.idBean !== dataid;
		});
		$('.qualites-form', me.$cv).trigger('update-data');
		// Vue
		$('.qualites-form div[data-id=' + dataid + ']', me.$cv).remove();
	});
	return qualite;
};

CV.editionValide = false;

CV.valeurEdition = function(element, mandatory) {
	var result = null;
	if (element) {
		var value = $('<div/>').text(element.val()).html();
		if (value) {
			result = value;
			if (mandatory) {
				$('.message-erreur-validation', element.parent()).hide();
				element.removeClass('champ-erreur');
			}
		} else if (mandatory) {
			$('.message-erreur-validation', element.parent()).show();
			element.addClass('champ-erreur');
			CV.editionValide = false;
		}
	}
	return result;
};

CV.valeurDecodee = function(element) {
	var result = '';
	if (element) {
		result = $('<div/>').html(element).text();
	}
	return result;
};

CV.valeurAffichage = function(item) {
	var result = '';
	if (item) {
		result = item;
	}
	return result;
};

CV.valeurCoche = function(item) {
	return item ? 'Oui' : 'Non';
};

CV.prototype.existeErreur = function(type, index) {
	var existeErreur = false;
	if (this.erreurs) {
		$.each(this.erreurs, function(i, item) {
			// On ne traite que les erreurs de type liste (les autres sont gérées dans la JSP)
			if (item.path && item.path.lastIndexOf(type + '[' + index + ']', 0) === 0) {
				existeErreur = true;
				return false;
			}
		});
	}
	return existeErreur;
};

CV.prototype.traiterErreurs = function() {
	var me = this;
	if (this.erreurs) {
		$.each(this.erreurs, function(index, erreur) {
			// On ne traite que les erreurs de type liste (les autres sont gérées dans la JSP)
			var ajouterErreurs = function(types, item) {
				$.each(types, function(itype, type) {
					if (item.path.lastIndexOf(type, 0) === 0) {
						var tab = CV.EXPRESSION_ERREUR_ATTRIBUT.exec(item.path);
						if (tab.length === 4) {
							var indexErreur, attribute;
							indexErreur = tab[2];
							attribute = tab[3];
							$('.' + type + '-form > div', me.$cv).each(function(idx) {
								if (idx == indexErreur) {
									$('[class*="__' + attribute + '"]', $(this)).addClass('champ-erreur');
									$('[class*="__' + attribute + '"]', $(this)).after('<span class="message-erreur">' + item.message + '</span>');
								}
							});
						}
					}
				});
			};
			if (erreur.path) {
				ajouterErreurs(['langues', 'logiciels', 'formations', 'diplomes', 'experiences', 'stages'], erreur);
			}
		});
	}
};

CV.jsonDateToString = function(jsonDate) {
	var result = '';
	if (jsonDate) {
		var d, m, y;
		d = jsonDate.substring(8, 10);
		m = jsonDate.substring(5, 7);
		y = jsonDate.substring(0, 4);
		result = d + '/' + m + '/' + y;
	}
	return result;
};

CV.stringToJsonDate = function(chaine) {
	var result = null;
	if (chaine) {
		var d, m, y;
		d = chaine.substring(0, 2);
		m = chaine.substring(3, 5);
		y = chaine.substring(6, 10);
		result = y + '-' + m + '-' + d;
	}
	return result;
};

CV.getByIdBean = function(idBean, array) {
	var result = null;
	if ($.isArray(array)) {
		var i = 0,
			temp;
		while (result == null && i < array.length) {
			temp = array[i];
			if (temp && temp.idBean === idBean) {
				result = temp;
			};
			i++;
		}
	}
	return result;
};

CV.getByLibelleBean = function(libelle, array) {
	var result = null;
	if ($.isArray(array)) {
		var i = 0,
			temp;
		while (result == null && i < array.length) {
			temp = array[i];
			if (temp && temp.libelle === libelle) {
				result = temp;
			};
			i++;
		}
	}
	return result;
};

CV.updateInputJson = function(element, object) {
	var escaped = '';
	if (object) {
		escaped = JSON.stringify(object);
		escaped = escaped.replace(/\'/g, '\\u0027');
	}
	element.val(escaped);
};

CV.valeurDate = function(element, mandatory) {
	var valeur = CV.valeurEdition(element);
	if (!valeur || valeur === '0') {
		if (mandatory) {
			$('.message-erreur-validation', element.parent()).css('display', 'block');
			element.addClass('champ-erreur');
			CV.editionValide = false;
		}
		valeur = null;
	} else if (mandatory) {
		$('.message-erreur-validation', element.parent()).hide();
		element.removeClass('champ-erreur');
	}
	return valeur;
};

CV.activerSelectDate = function(element, type) {
	var selectAnnee, selectMois, selectJour;

	selectAnnee = $('select.date' + type + 'Annee', element);
	selectMois = $('select.date' + type + 'Mois', element);
	selectJour = $('select.date' + type + 'Jour', element);

	selectAnnee.on('change', function() {
		var selected = $(selectAnnee.children(' option:selected'), element);
		if (selected.length === 1 && selected[0].value === '0') {
			selectMois.hide();
		} else {
			selectMois.show().css('display', 'inline');
		}
	});
	selectAnnee.trigger('change');

	selectMois.on('change', function() {
		var selected = $(selectMois.children(' option:selected'), element);
		if (selected.length === 1 && selected[0].value === '0') {
			selectJour.hide();
		} else {
			selectJour.show().css('display', 'inline');
		}
	});
	selectMois.trigger('change');
};

CV.formateDate = function(annee, mois, jour) {
	var date = '';
	if (annee) {
		date = annee;
		if (mois) {
			date = $('#selectbox > select.selectbox__date__mois option[value="' + mois + '"]').text() + ' ' + date;
			if (jour) {
				date = jour + ' ' + date;
			}
		}
	}
	return date;
};

CV.formateDateComplet = function(dateDebutAnnee, dateDebutMois, dateDebutJour, dateFinAnnee, dateFinMois, dateFinJour, type) {
	var date = '';
	if (dateDebutAnnee) {
		if (type === 'diplome') {
			date = CV.formateDate(dateDebutAnnee, dateDebutMois, dateDebutJour);
		} else if (dateFinAnnee) {
			date = CV.formateDate(dateDebutAnnee, dateDebutMois, dateDebutJour) + ' - ' + CV.formateDate(dateFinAnnee, dateFinMois, dateFinJour);
		} else {
			date = '\u00c0 partir ' + (dateDebutJour ? 'du ' : 'de ') + CV.formateDate(dateDebutAnnee, dateDebutMois, dateDebutJour);
		}
	}
	return date;
};

CV.prototype.init = function() {
	var me = this;
	// Init Langues
	{
		if ($.isArray(this.langues) && this.langues.length > 0) {
			$.each(this.langues, function(index, elem) {
				$('.langues-form', this.$cv).append(me.ajouterLangue(elem, me.existeErreur('langues', index)));
			});
		}
		$('.langues-form', this.$cv).append(this.ajouterLangue(null, true));

		$('.langues-form', this.$cv).on('update-data', function() {
			CV.updateInputJson($('input[id="CV_LANGUES"]', this), me.langues);
		});

		// Déclenchement d'un premier élément pour valider :
		$('.langues-form', this.$cv).trigger('update-data');
	}

	// Init Logiciels
	{
		if ($.isArray(this.logiciels) && this.logiciels.length > 0) {
			$.each(this.logiciels, function(index, elem) {
				$('.logiciels-form', this.$cv).append(me.ajouterLogiciel(elem, me.existeErreur('logiciels', index)));
			});
		}
		$('.logiciels-form', this.$cv).append(this.ajouterLogiciel(null, true));

		$('.logiciels-form', this.$cv).on('update-data', function() {
			CV.updateInputJson($('input[id="CV_LOGICIELS"]', this), me.logiciels);
		});

		// Déclenchement d'un premier élément pour valider :
		$('.logiciels-form', this.$cv).trigger('update-data');
	}

	// Init Langages
	{
		if ($.isArray(this.langages) && this.langages.length > 0) {
			$.each(this.langages, function(index, elem) {
				$('.langages-form', this.$cv).append(me.ajouterLangage(elem, me.existeErreur('langages', index)));
			});
		}
		$('.langages-form', this.$cv).append(this.ajouterLangage(null, true));

		$('.langages-form', this.$cv).on('update-data', function() {
			CV.updateInputJson($('input[id="CV_LANGAGES"]', this), me.langages);
		});

		// Déclenchement d'un premier élément pour valider :
		$('.langages-form', this.$cv).trigger('update-data');
	}

	// Init Formations & diplomes
	{
		if ($.isArray(this.formations) && this.formations.length > 0) {
			$.each(this.formations, function(index, elem) {
				$('.formations-form', this.$cv).append(me.ajouterFormation(elem, me.existeErreur('formations', index)));
			});
		}
		$('.formations-form', this.$cv).append(this.ajouterFormation(null, true));

		$('.formations-form', this.$cv).on('update-data', function() {
			CV.updateInputJson($('input[id="CV_FORMATIONS"]', this), me.formations);
		});

		// Déclenchement d'un premier élément pour valider :
		$('.formations-form', this.$cv).trigger('update-data');
	}

	// Init Diplomes
	{
		if ($.isArray(this.diplomes) && this.diplomes.length > 0) {
			$.each(this.diplomes, function(index, elem) {
				$('.diplomes-form', this.$cv).append(me.ajouterDiplome(elem, me.existeErreur('diplomes', index)));
			});
		}
		$('.diplomes-form', this.$cv).append(this.ajouterDiplome(null, true));

		$('.diplomes-form', this.$cv).on('update-data', function() {
			CV.updateInputJson($('input[id="CV_DIPLOMES"]', this), me.diplomes);
		});

		// Déclenchement d'un premier élément pour valider :
		$('.diplomes-form', this.$cv).trigger('update-data');
	}

	// Init Experiences
	{
		if ($.isArray(this.experiences) && this.experiences.length > 0) {
			$.each(this.experiences, function(index, elem) {
				$('.experiences-form', this.$cv).append(me.ajouterExperience(elem, me.existeErreur('experiences', index)));
			});
		}
		$('.experiences-form', this.$cv).append(this.ajouterExperience(null, true));

		$('.experiences-form', this.$cv).on('update-data', function() {
			CV.updateInputJson($('input[id="CV_EXPERIENCES"]', this), me.experiences);
		});

		// Déclenchement d'un premier élément pour valider :
		$('.experiences-form', this.$cv).trigger('update-data');
	}

	// Init Qualites
	{
		if ($.isArray(this.qualites) && this.qualites.length > 0) {
			$.each(this.qualites, function(index, elem) {
				$('.qualites-form', this.$cv).append(me.ajouterQualite(elem, me.existeErreur('qualites', index), true));
			});
		}
		$('.qualites-form', this.$cv).append(this.ajouterQualite(null, true, true));

		$('.qualites-form', this.$cv).on('update-data', function() {
			CV.updateInputJson($('input[id="CV_QUALITES"]', this), me.qualites);
		});

		// Déclenchement d'un premier élément pour valider :
		$('.qualites-form', this.$cv).trigger('update-data');
	}

	// Init Erreurs
	this.initControle();
	$('.obligatoire').each(function() {
		$(this).attr('title', 'Champ obligatoire');
	});

};
