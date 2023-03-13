//récupère les éléments qui ont été stockés dans le localStorage avec la clé "produit" et
// les stocke dans la variable "productsInCart" 
//en utilisant JSON.parse pour les convertir en objet JavaScript

let productsInCart = JSON.parse(localStorage.getItem('produit'));
console.log(productsInCart);
//sélectionne ensuite l'élément HTML où les produits et leurs informations seront affichés sur la page.
const productsplace = document.getElementById("cart__items");

let contentofCart = [];
//On déclare nos variables globales pour pouvoir calculer la quantité total d'articles et le prix total du panier
let totalPrice = 0;
let totalQuantity = 0;
let quantityProductPanier = 0;
let priceProductPanier = 0;
let totalProductPricePanier = 0;
let myproducts = [];
const findProducts = 0;
//Fonction Calcul de la quantité total d'articles dans le panier, au chargement de la page Panier.html
function totalProductsQuantity() {
    totalQuantity += parseInt(quantityProductPanier);
    console.log("Total quantité panier", totalQuantity);
    document.getElementById("totalQuantity").textContent = totalQuantity;
}
//Fonction Calcul du montant total du panier, au chargement de la page Panier.html-
function totalProductsPrice() {
    // Calcul du prix total de chaque produit en multipliant la quantité par le prix unitaire
    totalProductPricePanier = quantityProductPanier * priceProductPanier;
    // console.log(totalProductPricePanier);
    // Calcul du prix total du panier
    totalPrice += totalProductPricePanier;
    console.log("Total prix panier", totalPrice);
    document.getElementById("totalPrice").textContent = totalPrice;
}
function totalsnumberandprice() {
    totalProductsQuantity();
    totalProductsPrice();
}
//Fonction Recalcul de la quantité total d'articles dans le panier, lors de la modification de la quantité ou de la suppression d'un article
function recalculTotalQuantity() {
    let newTotalQuantity = 0;
    for (const item of productsInCart) {
        //On calcul le nombre de quantité total de produits dans le localStorage
        newTotalQuantity += parseInt(item.quantityProduct);
    }
    console.log("Nouvelle quantité totale panier", newTotalQuantity);
    //On affichage la nouvelle quantité totale de produits dans le html
    document.getElementById("totalQuantity").textContent = newTotalQuantity;
}
//-Fonction Recalcul du montant total du panier, lors de la modification de la quantité ou de la suppression d'un article-
function recalculTotalPrice() {
    let newTotalPrice = 0;
    //(1) On fait une boucle sur le productsInCart et dans cette boucle, 
    for (const item of productsInCart) {
        const idProductsLocalStorage = item.productId;
        const quantityProductsLocalStorage = item.quantityProduct;
        //(2) on vérifie si l'id correspond
        const findProducts = myproducts.find((element) => element._id === idProductsLocalStorage);
        //console.log(findProducts);
        //(3) et si c'est le cas, on récupère le prix.
        if (findProducts) {
            const newTotalProductPricePanier = findProducts.price * quantityProductsLocalStorage;
            newTotalPrice += newTotalProductPricePanier;
            console.log("Nouveau prix total panier", newTotalPrice);
        }
        //On affichage le nouveau prix total du panier dans le html
        document.getElementById("totalPrice").textContent = newTotalPrice;
    }
}
//Fonction Modifier la quantité d'un article du panier
let messageErrorQuantity = false;
function changeQuantity() {
    // On sélectionne l'élément html (input) dans lequel la quantité est modifiée
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    changeQuantity.forEach((item) => {
        //On écoute le changement sur l'input "itemQuantity"
        item.addEventListener("change", (event) => {
            event.preventDefault();
            Quantitychosen = Number(item.value);
            // On pointe le parent hiérarchique <article> de l'input "itemQuantity"
            let myArticle = item.closest('article');
            //console.log(myArticle);
            // On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité
            let selectMyArticleInLocalStorage = productsInCart.find
                (element => element.idProduct === myArticle.dataset.id && element.colorProduct === myArticle.dataset.color);

            // Si la quantité est comprise entre 1 et 100 et que c'est un nombre entier,...
            //...on met à jour la quantité dans le localStorage et le DOM
            if (Quantitychosen > 0 && Quantitychosen <= 100 && Number.isInteger(Quantitychosen)) {
                parseQuantitychosen = parseInt(Quantitychosen);
                selectMyArticleInLocalStorage.quantityProduct = parseQuantitychosen;
                localStorage.setItem("produit", JSON.stringify(productsInCart));
                // Et, on recalcule la quantité et le prix total du panier
                recalculTotalQuantity();
                recalculTotalPrice();
                messageErrorQuantity = false;
            }
            // Sinon, on remet dans le DOM la quantité indiquée dans le localStorage et on indique un message d'erreur
            else {
                item.value = selectMyArticleInLocalStorage.quantityProduct;
                messageErrorQuantity = true;
            }
            if (messageErrorQuantity) {
                alert("La quantité d'un article (même référence et même couleur) doit être comprise entre 1 et 100 et être un nombre entier. Merci de rectifier la quantité choisie.");
            }
        });
    });
}
//On déclare nos variables utilisées dans le fonction supprimer
let idDelete = 0;
let colorDelete = 0;
//--Fonction Suppression d'un article du panier
function deleteProduct() {
    let selectSupprimer = document.querySelectorAll(".deleteItem");
    selectSupprimer.forEach((selectSupprimer) => {
        selectSupprimer.addEventListener("click", (event) => {
            event.preventDefault();

            // On pointe le parent hiérarchique <article> du lien "supprimer"
            let myArticle = selectSupprimer.closest('article');
            console.log(myArticle);
            // on filtre les éléments du localStorage pour ne garder que ceux qui sont différents de l'élément qu'on supprime
            productsInCart = productsInCart.filter
                (element => element.idProduct !== myArticle.dataset.id || element.colorProduct !== myArticle.dataset.color);

            // On met à jour le localStorage
            localStorage.setItem("produit", JSON.stringify(productsInCart));

            //Alerte produit supprimé
            alert("Ce produit va être supprimé du panier.");


            // On supprime physiquement la balise <article> du produit que l'on supprime depuis son parent, si elle existe
            if (myArticle.parentNode) {
                myArticle.parentNode.removeChild(myArticle);
            }
            //Si, du coup, le panier est vide (le localStorage est vide ou le tableau qu'il contient est vide),...
            //...on affiche "Le panier est vide"-
            if (productsInCart === null || productsInCart.length === 0) {
                messagePanierVide();
            }
            else {
                // Et, on recalcule la quantité et le prix total du panier
                recalculTotalQuantity();
                recalculTotalPrice();
            }
        });
    })
}
//-Fonction pour afficher la phrase "Le panier est vide !"
function messagePanierVide() {
    contentofCart = 'Le panier est vide !';
    let newH2 = document.createElement('h2');
    productsplace.appendChild(newH2);
    newH2.textContent = contentofCart;
    // On insère 0 dans le html pour la quantité et le prix du panier
    document.getElementById("totalQuantity").textContent = 0;
    document.getElementById("totalPrice").textContent = 0;
}
//Contrôle des infos avec Regex et Récupération des données du formulaire
const boutonCommander = document.getElementById("order");
let errorFormulaireFirstName = true;
let errorFormulaireLastName = true;
let errorFormulaireAddress = true;
let errorFormulaireCity = true;
let errorFormulaireEmail = true;

//Création des expressions régulières pour contrôler les infos entrées par l'utilisateur
let textRegex = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
let addressRegex = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
let emailRegex = new RegExp("^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$");

//Récupération des coordonnées du formulaire client et mise en variable
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');
//Déclaration des variables pour vérifier la bonne valeur des champs du formulaire
let checkValueFirstName;
let checkValueLastName;
let checkValueAddress;
let checkValueCity;
let checkValueEmail;

// Ecoute du contenu du champ "prénom", Vérification du prénom et affichage d'un message si celui-ci n'est pas correct
inputFirstName.addEventListener('change', function () {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    checkValueFirstName = textRegex.test(inputFirstName.value);
    if (checkValueFirstName) {
        firstNameErrorMsg.textContent = '';
        errorFormulaireFirstName = false;
    }
    else {
        firstNameErrorMsg.textContent = 'Veuillez indiquer un prénom.';
        errorFormulaireFirstName = true;
    }
});

// Ecoute du contenu du champ "nom", Vérification du nom et affichage d'un message si celui-ci n'est pas correct
inputLastName.addEventListener('change', function () {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    checkValueLastName = textRegex.test(inputLastName.value);
    if (checkValueLastName) {
        lastNameErrorMsg.textContent = '';
        errorFormulaireLastName = false;
    }
    else {
        lastNameErrorMsg.textContent = 'Veuillez indiquer un nom de famille.';
        errorFormulaireLastName = true;
    }
});

// Ecoute du contenu du champ "adresse", Vérification de l'adresse et affichage d'un message si celle-ci n'est pas correcte
inputAddress.addEventListener('change', function () {
    let addressErrorMsg = inputAddress.nextElementSibling;
    checkValueAddress = addressRegex.test(inputAddress.value);
    if (checkValueAddress) {
        addressErrorMsg.textContent = '';
        errorFormulaireAddress = false;
    }
    else {
        addressErrorMsg.textContent = 'Veuillez indiquer une adresse.';
        errorFormulaireAddress = true;
    }
});

// Ecoute du contenu du champ "ville", Vérification de la ville et affichage d'un message si celle-ci n'est pas correcte
inputCity.addEventListener('change', function () {
    let cityErrorMsg = inputCity.nextElementSibling;
    checkValueCity = textRegex.test(inputCity.value);
    if (checkValueCity) {
        cityErrorMsg.textContent = '';
        errorFormulaireCity = false;
    } else {
        cityErrorMsg.textContent = 'Veuillez indiquer le nom d\'une ville.';
        errorFormulaireCity = true;
    }
});

// Ecoute du contenu du champ "email", Vérification de l'email et affichage d'un message si celui-ci n'est pas correct
inputEmail.addEventListener('change', function () {
    let emailErrorMsg = inputEmail.nextElementSibling;
    checkValueEmail = emailRegex.test(inputEmail.value);
    if (checkValueEmail) {
        emailErrorMsg.textContent = '';
        errorFormulaireEmail = false;
    }
    else {
        emailErrorMsg.textContent = 'Veuillez renseigner un email correct.';
        errorFormulaireEmail = true;
    }
});
//Affichage des produits du LocalStorage

//Si le panier est vide (le localStorage est vide ou le tableau qu'il contient est vide), on affiche "Le panier est vide"
if (productsInCart === null || productsInCart.length === 0) {
    messagePanierVide();
    //Si le client clique quand même sur le bouton commander, on lui rappelle que le panier est vide
    boutonCommander.addEventListener("click", (event) => {
        alert("Votre panier est vide !");
        event.preventDefault();
    });
}
//Si le panier n'est pas vide alors, on affiche le contenu du localStorage-

else {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(data => {
            myproducts = data;
            // on récupère la couleur, la quantité et l'id de tous les produits contenus dans le localstorage et on les met dans des variables
            for (let i = 0; i < productsInCart.length; i++) {
                let colorProductPanier = productsInCart[i].colorProduct;
                let idProductPanier = productsInCart[i].productId;
                quantityProductPanier = productsInCart[i].quantityProduct;

                //on ne récupère que les données des canapés dont _id (de l'api) correspondent à l'id dans le localStorage
                const contentofCart = data.find((element) => element._id === idProductPanier);
                //console.log(contentofCart);
                // Récupération du prix de chaque produit que l'on met dans une variable priceProductPanier

                priceProductPanier = myproducts.price;

                //On cré les éléments html manquants de la page cart.html, dans la <section id="cart__items">...--
                //...et on y insère les infos du localstorage-

                //_Début Ajout Balises html_____
                //-Création de la balise article avec comme classe cart__item
                let newArticle = document.createElement('article');
                newArticle.setAttribute("class", "cart__item");
                newArticle.setAttribute("data-id", `${idProductPanier}`);
                newArticle.setAttribute("data-color", `${colorProductPanier}`);
                productsplace.appendChild(newArticle);

                //-Création de la div avec pour classe cart__item__img-
                let newDivImg = document.createElement('div');
                newDivImg.setAttribute("class", "cart__item__img");
                newArticle.appendChild(newDivImg);

                //--Création de la balise image qui contiendra la photo de chaque canapé-
                let newImg = document.createElement('img');
                newImg.setAttribute("src", productsInCart.imageUrl);
                newImg.setAttribute("alt", productsInCart.altTxt);
                newDivImg.appendChild(newImg);

                //--Création de la div avec pour classe cart__item__content--
                let newDivContent = document.createElement('div');
                newDivContent.setAttribute("class", "cart__item__content");
                newArticle.appendChild(newDivContent);

                //-Création de la div avec pour classe cart__item__content__description--
                let newDivContentDescription = document.createElement('div');
                newDivContentDescription.setAttribute("class", "cart__item__content__description");
                newDivContent.appendChild(newDivContentDescription);

                //-Création d'une balise titre h2 qui indique le nom du produit choisi par l'utilisateur--
                let newH2 = document.createElement('h2');
                newH2.textContent = productsInCart.name;
                newDivContentDescription.appendChild(newH2);

                //--Création d'une balise p qui indique la couleur choisie par l'utilisateur
                let newPColor = document.createElement('p');
                newPColor.textContent = colorProductPanier;
                newDivContentDescription.appendChild(newPColor);

                //--Création d'une balise p qui indique le prix du canapé-
                let newPPrice = document.createElement('p');
                newPPrice.textContent = productsInCart.price + " €";
                newDivContentDescription.appendChild(newPPrice);

                //Création de la div avec pour classe cart__item__content__settings
                let newDivContentSettings = document.createElement('div');
                newDivContentSettings.setAttribute("class", "cart__item__content__settings");
                newDivContent.appendChild(newDivContentSettings);

                //--Création de la div avec pour classe cart__item__content__settings__quantity--
                let newDivContentSettingsQuantity = document.createElement('div');
                newDivContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
                newDivContentSettings.appendChild(newDivContentSettingsQuantity);

                //Création d'une balise p qui indique le texte "Qté :"-
                let newPQuantite = document.createElement('p');
                newPQuantite.textContent = "Qté :";
                newDivContentSettingsQuantity.appendChild(newPQuantite);

                //Création d'une balise input avec la classe "itemQuantity" qui permet de modifier la quantité-
                let newPInput = document.createElement('input');
                newPInput.setAttribute("type", "number");
                newPInput.setAttribute("class", "itemQuantity");
                newPInput.setAttribute("name", "itemQuantity");
                newPInput.setAttribute("min", "1");
                newPInput.setAttribute("max", "100");
                newPInput.setAttribute("value", `${quantityProductPanier}`);
                newDivContentSettingsQuantity.appendChild(newPInput);

                //Création de la div avec pour classe cart__item__content__settings__delete-
                let newDivContentSettingsDelete = document.createElement('div');
                newDivContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
                newDivContentSettings.appendChild(newDivContentSettingsDelete);

                //Création d'une balise p qui indique le prix du canapé
                let newPDelete = document.createElement('p');
                newPDelete.setAttribute("class", "deleteItem");
                newPDelete.textContent = "Supprimer";
                newDivContentSettingsDelete.appendChild(newPDelete);

                //_____Fin Ajout Balises html__
                //__Appel de la fonction pour calculer la qtité totale de produits & le prix total du panier, au chargement de la page Panier.html______
                totalsnumberandprice();
            }//for
            //___Appel de la fonction Supprimer un produit
            deleteProduct();
            //_____Appel de le fonction Modifier la quantité d'un produit__
            changeQuantity();

        }); //then   
    //Ecoute du bouton Commander 
    boutonCommander.addEventListener("click", (event) => {
        event.preventDefault();// Empêche le rechargement de la page
        if (productsInCart === null || productsInCart.length === 0) {
            alert("Votre panier est vide !");
        }
        else {
            // On vérifie que tous les champs sont bien renseignés, sinon on indique un message à l'utilisateur
            // On vérifie qu'aucun champ n'est vide
            if (!inputFirstName.value || !inputLastName.value || !inputAddress.value || !inputCity.value || !inputEmail.value) {
                alert("Vous devez renseigner tous les champs !");
                event.preventDefault();
            }
            // On vérifie que les champs sont correctement remplis suivant les regex mises en place
            else if (errorFormulaireFirstName === true || errorFormulaireLastName === true || errorFormulaireAddress === true
                || errorFormulaireCity === true || errorFormulaireEmail === true) {
                alert("Veuillez vérifier les champs du formulaire et les remplir correctement !");
                event.preventDefault();
            }
            else {
                //Récupération des id des produits du panier, dans le localStorage
                let idProducts = [];
                for (let l = 0; l < productsInCart.length; l++) {
                    idProducts.push(productsInCart[l].idProduct);
                }
                //console.log(idProducts);
                // On cré un objet dans lequel on met les infos "Contact" et les infos "Produits du panier" (l'id)
                const order = {
                    contact: {
                        firstName: inputFirstName.value,
                        lastName: inputLastName.value,
                        address: inputAddress.value,
                        city: inputCity.value,
                        email: inputEmail.value,
                    },
                    products: idProducts,
                }
                //console.log(order);
                // On indique la méthode d'envoi des données
                const options = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                };
                //console.log(options);
                // on envoie les données Contact et l'id des produits à l'API
                fetch("http://localhost:3000/api/products/order", options)
                    .then((response) => response.json())
                    .then((data) => {
                        //console.log(data);
                        // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
                        document.location.href = `confirmation.html?orderId=${data.orderId}`;
                    })
                    .catch((err) => {
                        console.log("Erreur Fetch product.js", err);
                        alert("Un problème a été rencontré lors de l'envoi du formulaire.");
                    });
                //vider le localStorage
                localStorage.clear();
            }; //fin else
        }
    }); //fin écoute bouton Commander
}; //fin else