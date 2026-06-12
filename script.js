//=============//
//BONUS//
//============//

//SON A CHAQUE ERREUR DE FRAPPE//

const sonErreur = document.getElementById("son-erreur");
//SON A LA FIN DU TEST//
const sonVictoire = document.getElementById("son-victoire");


//==================//
//TABLEAU DES TEXTES//
//==================//

const textes = [
    "Les logiciels et les cathédrales, c'est un peu la même chose, d'abord on les construit, ensuite on prie.",
    "Le copier/coller a été programmé par des programmeurs pour des programmeurs",
    "99 petits bugs dans le code. 99 petits bugs dans le code. Enlevez-en-un, corrigez-le. 127 petits bugs dans le code...",
    "Un bon programmeur est quelqu'un qui regarde des deux côtés avant de traverser une rue à sens unique",
    "Quand j'ai écrit ce code, seuls Dieu et moi comprenions ce que j'ai fait. Maintenant, seul Dieu le sait."
];
//Afficher un texte aléatoire à reproduire
function afficherTexte() {
//Génère un nombre aléatoire entre 0 et la taille du tableau
    let indexAleatoire = Math.floor(Math.random() * textes.length);
    
    const texteChoisi = textes[indexAleatoire];
    const zoneTexte = document.getElementById("texte-a-recopier");
    zoneTexte.innerHTML = "";
    for (let i = 0; i < texteChoisi.length; i++) {
        const span = document.createElement("span");
        span.textContent = texteChoisi[i];
        zoneTexte.appendChild(span);
    }
}

afficherTexte();


//==================//
//VARIABLES DU JEU//
//=================//

let temps =0;

let timerDemarre = false;

let intervalTimer;

const saisieTexte = document.getElementById("saisie-texte");

//=================//
//DEMARRER LE TIMER//
//================//

//Démarrer le timer 
function demarrerTimer() {
    intervalTimer = setInterval(function() {
        temps++;
        document.getElementById("timer").textContent = temps;
    }, 1000);

    }
    afficherTexte();
//Pour démarrer au premier caractère tapé
saisieTexte.addEventListener("input", function() {
    if (timerDemarre === false) {
        demarrerTimer();
        timerDemarre = true;
    }
    const spans = document.querySelectorAll("#texte-a-recopier span");
    const texteTape = saisieTexte.value;
    for(let i = 0; i < spans.length; i++) {
        spans[i].classList.remove("correct");
        spans[i].classList.remove("inccorect")
        if(i < texteTape.length) {
            if (texteTape[i] === spans[i].textContent) {
    spans[i].classList.add("correct");
} else {
    spans[i].classList.add("incorrect");

    sonErreur.currentTime = 0;
    sonErreur.play();
}
        }
    }
        
    
//Stopper le chronomètre à la fin de la saisie
    const texteAffiche = document.getElementById("texte-a-recopier").textContent;
    if (saisieTexte.value.length >= texteAffiche.length) {
        clearInterval(intervalTimer);
        calculerWPM();
        calculerPrecision();
        saisieTexte.disabled = true;
        sonVictoire.play();
        alert("Bravo ! Aucun bug n'a été détecté. C'est suspect.");
    }
});


//===============//
//CALCULER LE WPM//
//===============//

//Calculer le nombre de mots par minute
function calculerWPM() {
    const texteAffiche = document.getElementById("texte-a-recopier").textContent;
//Découpe la phrase en mots grâce aux espaces "split"
    let nombreMots = texteAffiche.split(" ").length;
//Calcul du nombre de mots par minutes
    let wpm = Math.round((nombreMots / temps) * 60);

    document.getElementById("wpm").textContent = wpm;
}

//=====================//
//CALCULER LA PRECISION//
//====================//

//Calculer la précision en pourcentage 
function calculerPrecision() {

    const texteAffiche = document.getElementById("texte-a-recopier").textContent;
    const texteTape = saisieTexte.value;

    let caracteresCorrects = 0;
//Vérifier chaque caractère du texte affiché 
    for (let i = 0; i < texteAffiche.length; i++) {
//Vérifier que les caractères sont identiques au texte à recopier
        if (texteAffiche[i] === texteTape[i]) {
        caracteresCorrects++;
    }
}
    let precision = Math.round((caracteresCorrects / texteAffiche.length) * 100);
    document.getElementById("precision").textContent = precision;
}

//===================//
//BOUTON RECOMMENCER//
//=================//

//Pour reprendre l'exercice à zéro
function recommencer() {

clearInterval(intervalTimer);
temps = 0;
timerDemarre = false;

document.getElementById("timer").textContent = 0;
document.getElementById("wpm").textContent = 0;
document.getElementById("precision").textContent = 0;

saisieTexte.value = "";
afficherTexte();
}
const boutonRecommencer = document.getElementById("btn-recommencer");
boutonRecommencer.addEventListener("click", function () {
    recommencer();
});


//=====================================//
//AFFICHAGE ET COLORIAGE EN TEMPS REEL//
//===================================//


