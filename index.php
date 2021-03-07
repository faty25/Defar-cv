<!DOCTYPE HTML>
<html>
<head>
    <title>Mon CV en ligne</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" type="text/css" href="css/screen.css"/>
    <link rel="stylesheet" href="css/fancybox/jquery.fancybox-1.3.4.css" type="text/css" media="screen" />
    <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
    <link rel="icon" type="image/png" href="/img/favicon.png" />
</head>
<body class="ressource cv" data-toggle=".active" data-toggle-group="filtres">
    <header>
    <div class="container"><!--
        --><<!--a href="http://www.onisep.fr/" class="logo logo--folios">-->
        <img src="cv-logo-template-with-gold-colors-isolated-on-black-background-png_130994.jpg" height="200px" left="200px" alt="Mon cv en ligne"></a><!--
    --></div>
</header>
<div id="saisie_cv">
        <div class="container">
            <p class="intro_saisie_cv">Ce formulaire est conçu pour faciliter la rédaction de votre CV.</p></p>
            <form action="word.php" method="post">
                <!--Accordéon "Général"-->
                <div id="accordion" class="ui-accordion ui-widget ui-helper-reset ui-accordion-icons" role="tablist">
                    <h3 class="cv__title ui-accordion-header ui-helper-reset ui-state-default ui-state-active ui-corner-top" role="tab" aria-expanded="true" aria-selected="true" tabindex="0">
                        <span class="ui-icon ui-icon-triangle-1-s"></span>
                        <span>Général</span>
                        <i class="icomoon cur-help" title="Indiquez ici l&#39;intitulé du CV (à qui s&#39;adresse-t-il ? Pour quel type de demande ?)."></i>
                    </h3>
                    <div class="cv__item ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active" role="tabpanel">
                        <fieldset class="form__fieldset">
                            <p>
                                <label for="CV_NOM">Nom (*)</label>
                                <input id="CV_NOM" value="" maxlength="50" size="50" type="text" name="nom">
								
                                <span class="message-erreur"></span>
                            </p>
                            <p>
                                <label for="CV_PRENOM">Prénom (*)</label>
                                <input id="CV_PRENOM" value="" maxlength="50" size="50" type="text" name="prenom">
								
                            </p>
                            <p>
                                <label for="CV_ETABLISSEMENT">Établissement</label>
                                <input id="CV_ETABLISSEMENT" value="" maxlength="50" size="50" type="text" name="etablissement">
                            </p>
                            <p>
                                <label for="CV_LIBELLE">Intitulé du CV (*)</label>
                                <input id="CV_LIBELLE" value="" maxlength="50" size="50" type="text" name="libelle">
							
                            </p>
                        </fieldset>
                    </div>
                    <!--Accordéon "Présentation"-->
                    <h3 class="cv__title ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">
                        <span class="ui-icon ui-icon-triangle-1-e"></span>
                        <span>Ma présentation</span>
                        <i class="icomoon cur-help" title="Décrivez vos qualités principales et vos atouts en une phrase."></i>
                    </h3>
                    <div class="cv__item ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">
                        <fieldset class="form__fieldset">
                            <p>
                                <textarea id="CV_PRESENTATION" cols="40" rows="6" name="presentation"></textarea>
                            </p>
                        </fieldset>
                    </div>
                    <!--Accordéon "Informations personnelles"-->
                    <h3 class="cv__title ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">
                        <span class="ui-icon ui-icon-triangle-1-e"></span><span>Informations personnelles</span>
                    </h3>
                    <div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">
                        <fieldset class="form__fieldset">
                            <input id="pictureUUID" type="hidden" name="pictureUUID" value=""/>
                            <span class="form_photo">
                                <label for="IMG_1">Photo</label>
                                <div style="display: grid">
                                    <img id="IMG_1" width="150" style="display: none"/>
                                    <span class="form__photo__controls">
                                        <a id="BTN_AJOUT_MODIF_1" href="/upload" class="iframecrop_image">Ajouter une photo</a>
                                        <a id="BTN_EFFACER_1" href="#" style="display: none" onclick="eraseFile();return false;">Effacer</a>
                                    </span>
                                </div>
                            </span>
                            
                            <p class="form__input">
                                <label for="CV_DATE_NAISSANCE">Date de naissance</label>
                                <input id="CV_DATE_NAISSANCE" value="" size="11" class="hasDatepicker" type="date" name="dateNaissance">
								
                            </p>
                            <p class="form__select">
                                <label for="CV_GENRE">Sexe</label>
                                <select id="CV_GENRE" size="1" name="genre">
                                    <option value="">Sélectionnez dans la liste</option>
                                    
                                        <option value="MASCULIN"  title="MASCULIN">MASCULIN</option>
                                    
                                        <option value="FEMININ"  title="FEMININ">FEMININ</option>
                                    
                                </select>
								
                            </p>
                            <p class="form__input">
                                <label for="CV_ADRESSE">Adresse</label>
                                <input id="CV_ADRESSE" value="" maxlength="255" size="50" type="text" name="adresse">
                            </p>
                            <p class="form__input">
                                <label for="CV_CODE_POSTAL">Code postal</label>
                                <input id="CV_CODE_POSTAL" value="" maxlength="10" size="10" type="text" name="codePostal">
								
                            </p>
                            <p class="form__input">
                                <label for="CV_COMMUNE">Commune</label>
                                <input id="CV_COMMUNE" value="" maxlength="85" size="50" type="text" name="commune">
                            </p>
                            <p class="form__input">
                                <label for="CV_PAYS">Pays</label>
                                <input id="CV_PAYS" value="" maxlength="30" size="30" type="text" name="pays">
                            </p>
                            <p class="form__input">
                                <label for="CV_EMAIL">E-mail</label>
                                <input id="CV_EMAIL" value="" maxlength="320" size="50" type="text" name="email">
							
                            </p>
                            <p class="form__input">
                                <label for="CV_TELEPHONE">Téléphone fixe (*)</label>
                                <input id="CV_TELEPHONE" value="" maxlength="10" size="10" type="text" name="telephone">
								
                            </p>
                            <p class="form__input">
                                <label for="CV_MOBILE">Téléphone mobile (*)</label>
                                <input id="CV_MOBILE" value="" maxlength="10" size="10" type="text" name="mobile">
								
                            </p>
                        </fieldset>
                    </div>
                    <!--Accordéon "Compétences"-->
                    <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">
                        <span class="ui-icon ui-icon-triangle-1-e"></span>
                        <span>Compétences</span>
                        <i class="icomoon cur-help" title="Vous pouvez faire apparaître autant de compétences que vous maîtrisez, en mentionnant précisément le niveau de maîtrise."></i>
                    </h3>
                    <div class="cv__item ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">
                        <fieldset class="form__fieldset">
                            <legend class="form__legend">Langues</legend>
                            <div class="activite_section_deco langues-form">
                                <input type="hidden" id="CV_LANGUES" value="" name="languesJson"/>
                            </div>
                        </fieldset>
                        <fieldset class="form__fieldset">
                            <legend class="form__legend">Informatique</legend>
                            <div class="activite_section_deco logiciels-form">
                                <input id="CV_LOGICIELS" value="" type="hidden" name="logicielsJson">
                            </div>
                        </fieldset>
                        <fieldset class="form__fieldset">
                            <legend class="form__legend">Langages</legend>
                            <div class="activite_section_deco langages-form">
                                <input id="CV_LANGAGES" value="" type="hidden" name="langagesJson">
                            </div>
                        </fieldset>
                    </div>
                    <!--Accordéon "Ma formation et mes diplômes acquis"-->
                    <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">
                        <span class="ui-icon ui-icon-triangle-1-e"></span>
                        <span>Ma formation et mes diplômes acquis</span>
                        <i class="icomoon cur-help" title="Indiquez précisément la spécialité de chacun des diplômes que vous possédez. Commencez par le plus récent et terminez par le plus ancien."></i>
                    </h3>
                    <div class="cv__item ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">
                        <fieldset class="form__fieldset">
                            <legend class="form__legend">Formations</legend>
                            <div class="activite_section_deco formations-form">
                                <input id="CV_FORMATIONS" value="" type="hidden" name="formationsJson">
                            </div>
                        </fieldset>
                        <fieldset class="form__fieldset">
                            <legend class="form__legend">Diplomes</legend>
                            <div class="activite_section_deco diplomes-form">
                                <input id="CV_DIPLOMES" value="" type="hidden" name="diplomesJson">
                            </div>
                        </fieldset>
                    </div>
                    <!--Accordéon "Mes expériences"-->
                    <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">
                        <span class="ui-icon ui-icon-triangle-1-e"></span>
                        <span>Mes expériences</span>
                        <i class="icomoon cur-help" title="Vous pouvez faire apparaître autant d&#39;expériences professionnelles que vous le jugez utile. Les missions et les compétences acquises ne renvoient pas à une liste a priori : c&#39;est à vous de les construire."></i>
                    </h3>
                    <div class="cv__item ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">
                        <fieldset class="form__fieldset">
                            <div class="activite_section_deco experiences-form">
                                <input id="CV_EXPERIENCES" name="experiencesJson" value="" type="hidden">
                            </div>
                        </fieldset>
                    </div>
                    <!--Accordéon "Mes qualités"-->
                    <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">
                        <span class="ui-icon ui-icon-triangle-1-e"></span>
                        <span>Mes qualités</span>
                        <i class="icomoon cur-help" title="Pour chacune des qualités que vous choisirez, vous avez la possibilité de la commenter (par exemple, ajouter à « calme » : « je maîtrise mon sang-froid en toutes circonstances »). Vous pouvez également ajouter des qualités que vous ne trouvez pas dans cette liste."></i>
                    </h3>
                    <div class="cv__item ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">
                        <fieldset class="form__fieldset">
                            <div class="activite_section_deco qualites-form">
                                <input id="CV_QUALITES" value="" type="hidden" name="qualitesJson">
                            </div>
                        </fieldset>
                    </div>

                    <!--Accordéon "Centres d'intérêt"-->
                    <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">
                        <span class="ui-icon ui-icon-triangle-1-e"></span>
                        <span>Centres d&#39;intérêt</span>
                        <i class="icomoon cur-help" title="Indiquez ici vos loisirs, vos passions, vos engagements. N&#39;hésitez pas à commenter brièvement vos choix."></i>
                    </h3>
                    <div class="cv__item ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">
                        <fieldset class="form__fieldset">
                            <p>
                                <textarea id="CV_COMPETENCES" cols="40" rows="6" name="centreInteret"></textarea>
                            </p>
                        </fieldset>
                    </div>
                    <!--Accordéon "Préférences de génération"-->
                    <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">
                        <span class="ui-icon ui-icon-triangle-1-e"></span>
                        <span>Paramètres de génération de votre CV</span>
                        <i class="icomoon cur-help" title="Indiquez ici quel modèle de CV vous souhaitez générer."></i>
                    </h3>
                    <div class="cv__item ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">
                        <fieldset class="form__fieldset">
                            <p class="form__select">
                                <label for="CV_MODELE">Modèle de CV sélectionné</label>
                                <select id="CV_MODELE" size="1" name="modelecv">
                                    
                                        <option value="Blanc - Bleu.docx">Blanc - Bleu.docx</option>
                                    
                                        <option value="Blanc - Rouge.docx">Blanc - Rouge.docx</option>
                                    
                                        <option value="Blanc - Violet.docx">Blanc - Violet.docx</option>
                                    
                                </select>
                            </p>
                        </fieldset>
                    </div>
                </div>
                <!-- #accordion -->
                <div style="display:none">
                    <input name="TYPE_ENREGISTREMENT" value="1" type="hidden">
                </div>
                <p id="valider-formulaire" class="content__validate">
                    <input class="submit" name="ENREGISTRER" value="Générer votre CV" type="submit">
                </p>
            </form>
        </div>
    </div>
    <footer>
    <div class="container">
        © CVPARFAIT, 2021
    </div>
</footer>
    <div id="selectbox" style="display: none">
    <select class="selectbox__langue__libelle">
        
            <option value="01">Allemand</option>
        
            <option value="02">Anglais</option>
        
            <option value="03">Arabe</option>
        
            <option value="04">Chinois</option>
        
            <option value="05">Espagnol</option>
        
            <option value="06">Hébreu</option>
        
            <option value="07">Italien</option>
        
            <option value="08">Portugais</option>
        
            <option value="09">Russe</option>
        
            <option value="10">Français</option>
        
            <option value="99">Autre</option>
        
    </select>

    <select class="selectbox__langue__niveau_comprendre">
        <option value="" title="Sélectionnez un niveau"></option>
        
            <option value="01">A1 - Utilisateur débutant</option>
        
            <option value="02">A2 - Utilisateur débutant</option>
        
            <option value="03">B1 - Utilisateur indépendant</option>
        
            <option value="04">B2 - Utilisateur indépendant</option>
        
            <option value="05">C1 - Utilisateur expérimenté</option>
        
            <option value="06">C2 - Utilisateur expérimenté</option>
        
    </select>

    <select class="selectbox__langue__niveau_ecrire">
        <option value="">Sélectionnez un niveau</option>
        
            <option value="01">A1 - Utilisateur débutant</option>
        
            <option value="02">A2 - Utilisateur débutant</option>
        
            <option value="03">B1 - Utilisateur indépendant</option>
        
            <option value="04">B2 - Utilisateur indépendant</option>
        
            <option value="05">C1 - Utilisateur expérimenté</option>
        
            <option value="06">C2 - Utilisateur expérimenté</option>
        
    </select>

    <select class="selectbox__langue__niveau_parler">
        <option value="">Sélectionnez un niveau</option>
        
            <option value="01">A1 - Utilisateur débutant</option>
        
            <option value="02">A2 - Utilisateur débutant</option>
        
            <option value="03">B1 - Utilisateur indépendant</option>
        
            <option value="04">B2 - Utilisateur indépendant</option>
        
            <option value="05">C1 - Utilisateur expérimenté</option>
        
            <option value="06">C2 - Utilisateur expérimenté</option>
        
    </select>

    <select class="selectbox__logiciel__niveau">
        
            <option value="01">DÉBUTANT</option>
        
            <option value="02">INTERMÉDIAIRE</option>
        
            <option value="03">CONFIRMÉ</option>
        
            <option value="04">EXPERT</option>
        
            <option value="99">Autre niveau/certification</option>
        
    </select>

    <select class="selectbox__langage__libelle">
        
            <option value="01">Java</option>
        
            <option value="02">PHP</option>
        
            <option value="99">Autre</option>
        
    </select>

    <select class="selectbox__langage__niveau">
        
            <option value="01">DÉBUTANT</option>
        
            <option value="02">INTERMÉDIAIRE</option>
        
            <option value="03">CONFIRMÉ</option>
        
            <option value="04">EXPERT</option>
        
            <option value="99">Autre niveau/certification</option>
        
    </select>

    <select class="selectbox__diplome__libelle">
        
            <option value="01">Baccalauréat</option>
        
            <option value="02">BTS</option>
        
            <option value="03">DUT</option>
        
            <option value="06">DNB (Brevet)</option>
        
            <option value="99">Autre niveau/certification</option>
        
    </select>

    <select class="selectbox__experience__type">
        
            <option value="01">Stage</option>
        
            <option value="02">Expérience professionnelle</option>
        
            <option value="03">Expérience personnelle</option>
        
            <option value="04">Expérience dans un cadre familial</option>
        
            <option value="05">Emploi étudiant</option>
        
            <option value="06">Emploi saisonnier</option>
        
            <option value="99">Autre</option>
        
    </select>

    <select class="selectbox__date__annee">
        <option value="0">Année</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
        <option value="2014">2014</option>
        <option value="2013">2013</option>
        <option value="2012">2012</option>
        <option value="2011">2011</option>
        <option value="2010">2010</option>
        <option value="2009">2009</option>
        <option value="2008">2008</option>
        <option value="2007">2007</option>
        <option value="2006">2006</option>
        <option value="2005">2005</option>
        <option value="2004">2004</option>
        <option value="2003">2003</option>
        <option value="2002">2002</option>
        <option value="2001">2001</option>
        <option value="2000">2000</option>
        <option value="1999">1999</option>
        <option value="1998">1998</option>
        <option value="1997">1997</option>
        <option value="1996">1996</option>
        <option value="1995">1995</option>
        <option value="1994">1994</option>
        <option value="1993">1993</option>
        <option value="1992">1992</option>
        <option value="1991">1991</option>
        <option value="1990">1990</option>
        <option value="1989">1989</option>
        <option value="1988">1988</option>
        <option value="1987">1987</option>
        <option value="1986">1986</option>
        <option value="1985">1985</option>
        <option value="1984">1984</option>
        <option value="1983">1983</option>
        <option value="1982">1982</option>
        <option value="1981">1981</option>
        <option value="1980">1980</option>
        <option value="1979">1979</option>
        <option value="1978">1978</option>
        <option value="1977">1977</option>
        <option value="1976">1976</option>
        <option value="1975">1975</option>
        <option value="1974">1974</option>
        <option value="1973">1973</option>
        <option value="1972">1972</option>
        <option value="1971">1971</option>
        <option value="1970">1970</option>
        <option value="1969">1969</option>
        <option value="1968">1968</option>
        <option value="1967">1967</option>
        <option value="1966">1966</option>
        <option value="1965">1965</option>
        <option value="1964">1964</option>
        <option value="1963">1963</option>
        <option value="1962">1962</option>
        <option value="1961">1961</option>
        <option value="1960">1960</option>
        <option value="1959">1959</option>
        <option value="1958">1958</option>
        <option value="1957">1957</option>
        <option value="1956">1956</option>
        <option value="1955">1955</option>
        <option value="1954">1954</option>
        <option value="1953">1953</option>
        <option value="1952">1952</option>
        <option value="1951">1951</option>
    </select>

    <select class="selectbox__date__mois">
        <option value="0">Mois</option>
        
            <option value="1">Janvier</option>
        
            <option value="2">Février</option>
        
            <option value="3">Mars</option>
        
            <option value="4">Avril</option>
        
            <option value="5">Mai</option>
        
            <option value="6">Juin</option>
        
            <option value="7">Juillet</option>
        
            <option value="8">Août</option>
        
            <option value="9">Septembre</option>
        
            <option value="10">Octobre</option>
        
            <option value="11">Novembre</option>
        
            <option value="12">Décembre</option>
        
    </select>

    <select class="selectbox__date__jour">
        <option value="0">Jour</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
    </select>

    <select class="selectbox__qualite__libelle">
        
            <option value="01">Actif(ve)</option>
        
            <option value="02">Appliqué(e)</option>
        
            <option value="03">Autonome</option>
        
            <option value="04">Calme</option>
        
            <option value="05">Communicatif(ve)</option>
        
            <option value="06">Convaincant(e)</option>
        
            <option value="07">Créatif(ve)</option>
        
            <option value="08">Curieux(se)</option>
        
            <option value="09">Débrouillard(e)</option>
        
            <option value="10">Décidé(e)</option>
        
            <option value="11">Energique</option>
        
            <option value="12">Inventif(ve)</option>
        
            <option value="13">Minutieux(se)</option>
        
            <option value="14">Observateur(trice)</option>
        
            <option value="15">Organisé(e)</option>
        
            <option value="16">Patient(e)</option>
        
            <option value="17">Persuasif(ve)</option>
        
            <option value="18">Pratique</option>
        
            <option value="19">Réfléchi(e)</option>
        
            <option value="20">Rigoureux(se)</option>
        
            <option value="21">Spontané(e)</option>
        
            <option value="99">Autre</option>
        
    </select>
</div>
    <script src="js/jquery-1.7.2.min.js"></script>
    <script src="js/jquery-ui-1.8.16.custom.min.js"></script>
    <script src="js/jquery.fancybox-1.3.4.pack.js"></script>
    <script src="js/cv_commun.js"></script>
    <script src="js/cv_saisie.js"></script>
    <script src="js/cv_onready.js"></script>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="js/js.js"></script>

	<script>

        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}

        gtag('js', new Date());

        gtag('config', "UA-47223423-1");

	</script>

</body>
</html>