<?php
//$nombre = $_POST['nombre'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$etablissement= $_POST['etablissement'];
$libelle = $_POST['libelle'];
$presentation = $_POST['presentation'];
$dateNaissance = $_POST['dateNaissance'];
$genre = $_POST['genre'];
$adresse = $_POST['adresse'];
$codePostal = $_POST['codePostal'];
$commune = $_POST['commune'];
$pays = $_POST['pays'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$mobile = $_POST['mobile'];
$languesJson = $_POST['languesJson'];
$logicielsJson = $_POST['logicielsJson'];
$langagesJson = $_POST['langagesJson'];
$formationsJson = $_POST['formationsJson'];
$diplomesJson= $_POST['diplomesJson'];
$experiencesJson= $_POST['experiencesJson'];
$qualitesJson = $_POST['qualitesJson'];
$centreInteret = $_POST['centreInteret'];
$modelecv = $_POST['modelecv'];


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>curiculum Vitea</title>
    <link type="text/css" rel="stylesheet" href="css/css.css" />
    
</head>
<body>
    <div id="wrapper">
    <div class="wrapper-top"></div>
    <div class="wropper-mid">
    <div id="paper">
    <div class="paper-top"></div>
    <div id="papper-mid">
    <div class="entry">
    <img class="portrait" src="team-member1.jpg" width="120" height="120"/>
    <div class="self">
    <h1 class="name"> <span> <?php// echo $nombre ?> </span> </h1>
    <ul>
        
    
    </ul>
    </div>
    </div>
    <div class="entry">
    <h2>General</h2>
    <p>
    <ul>
    <li><?php echo $nom ?></li>
    <li><?php echo $prenom ?></li>
    <li><?php echo $etablissement ?></li>
    <li><?php echo $libelle ?></li>
    </ul>
    </p>
    </div>
    <div class="entry">
    <h2>Ma presentation</h2>
    <p><?php echo $presentation ?></p>
    </div>
    <div class="entry">
    <h2>Informations personnelles</h2>
    <p>
    <li><?php echo $dateNaissance ?></li>
     <li><?php echo $genre ?></li>
    <li><?php echo  $adresse ?></li>
    <li><?php echo $codePostal ?></li>
    <li><?php echo  $commune ?></li>
    <li><?php echo  $pays ?></li>
    <li><?php echo  $email ?></li>
    <li><?php echo  $telephone ?></li>
    <li><?php echo   $mobile ?></li></p>
    </div>
    <div class="entry">
    <h2>Competences</h2>
    <h3>Langues</h3>
    <p><ul>
    <li><?php echo $languesJson ?></li>
    <li><?php echo $logicielsJson ?></li>
    </ul></p>
    <h3>Langages</h3>
    <p><ul>
    <li><?php echo $langagesJson ?></li>
    </ul></p>
    </div>
    <div class="entry">
    <h2>Ma formation et mes diplomes acquis</h2>
    <p><ul>
    <li><?php echo $formationsJson ?></li>
    <li><?php echo $diplomesJson ?></li>
    </ul></p>
    </div>
    <div class="entry">
    <h2>Mes experiences</h2>
    <p><?php echo $experiencesJson ?></p>
    </div>
    <div class="entry">
    <h2>Mes qualites</h2>
    <p><?php echo $qualitesJson ?></p>
    </div>
    <div class="entry">
    <h2>Centres d&#39;interet</h2>
    <p><?php echo $centreInteret ?></p>
    </div>
    <div class="entry">
    <h2>Parametres de generation de votre CV</h2>
    <p><?php echo $modelecv ?></p>
    </div>
    </div>
    <div class="wrapper-bottom"></di>
</div>
</body>
</html>
