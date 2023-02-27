// créer une variable appelée "productputinLocalStorage qui stocke les clés et les valeurs présentes dans le stockage local du navigateur.
// La méthode JSON.parse() est utilisée pour convertir les données au format JSON stockées dans le stockage local en un objet JavaScript exploitable.
let productputinLocalStorage
 = JSON.parse(localStorage.getItem("produit"));
console.log(productputinLocalStorage
);
//sélectionner la balise HTML de la page "product.html" dans laquelle les produits et leurs informations vont être insérés.
let productsplacefromHtml = document.getElementById("cart__items");
// déclarer les variables
let ContentofPanier = [];
//En déclarant des variables à l'échelle globale, nous sommes en mesure de calculer la quantité totale d'articles et le prix total du panier. 
//Cette approche permet de rendre ces variables accessibles à partir de n'importe quelle partie du code, 
//sans avoir à les passer en tant qu'arguments à chaque fonction. en maintenant ces variables dans un contexte global,
// il est plus facile de les mettre à jour et de les utiliser dans différentes parties du code.
let TotalPrice = 0;  
let TotalQuantity = 0;
let NumberofProductPanier = 0;
let PriceofProductPanier = 0;
let Total
ProductPricePanier = 0;
let MyProducts = [];
const FindProducts = 0;
//La fonction suivante est chargée de calculer la quantité totale d'articles dans le panier, lors du chargement de la page "Panier.html".
function NumberofProducts(){
    Total
Quantity += parseInt(NumberofProductPanier);
    console.log("Total quantité panier",TotalQuantity);
    document.getElementById("TotalQuantity").textContent = Total
Quantity;
}
//La fonction suivante va calculer le montant total du panier lors du chargement de la page "Panier.html".
function TotalProductsPrice (){
    // Calcul du prix total de chaque produit en multipliant la quantité par le prix unitaire
    Total
ProductPricePanier = NumberofProductPanier * PriceofProductPanier;
   console.log(TotalProductPricePanier);
    // Calcul du prix total du panier
    Total
Price += Total
ProductPricePanier;
    console.log("Total prix panier",TotalPrice);
    document.getElementById("totalPrice").textContent = Total
Price; 
    }
    function Totals (){
        NumberofProducts();
        Total
ProductsPrice();
    }
    //La fonction va recalculer la quantité totale de produits dans le panier en cas de modification de la quantité ou de suppression.
    function RecalculateTotalQuantity() {
        let newTotal
Quantity = 0;
        for (const item of productputinLocalStorage) {
            //On calcul le nombre de quantité total de produits dans le localStorage
            newTotal
Quantity += parseInt(item.quantityProduct);
        }
            console.log("Nouvelle quantité totale panier",newTotalQuantity);
        //On affichage la nouvelle quantité totale de produits dans le html
        document.getElementById("totalQuantity").textContent = newTotal
Quantity;
    }
    //Fonction qui recalculer le prix total du panier, aprés modification de la quantité ou de la suppression d'un produit
    function RecalculateTotalPrice() {
    let newTotal
Price = 0;
    //(1) On fait une boucle sur les productputinLocalStorage et dans cette boucle, 
    for (const item of productputinLocalStorage) {
        const idProductsLocalStorage = item.idProduct;
        const quantityProductsLocalStorage = item.quantityProduct;
        //(2) on vérifie si l'id correspond
        const FindProducts = MyProduits.find((element) => element._id === idProductsLocalStorage);
            //console.log(FindProducts);
        //(3) et si c'est le cas, on récupère le prix.
        if (FindProducts) {
            const newTotalProductPricePanier = FindProducts.price * quantityProductsLocalStorage;
            newTotal
Price += newTotal
ProductPricePanier;
                console.log("Nouveau prix total panier",newTotalPrice);
        }
    //On affichage le nouveau prix total du panier dans le html
    document.getElementById("totalPrice").textContent = newTotal
Price;
    } 
}
//Fonction pour modifier la quantité d'un produit du panier
let messageErrorQuantity = false; 
//Cette variable sera utilisée plus tard pour vérifier s'il y a eu une erreur dans l'entrée de quantité.
function ModifiyQuantity() {
    // On sélectionne l'élément html (input) dans lequel la quantité est modifiée
    let ModifyQuantity = document.querySelectorAll(".itemQuantity");
   ModifyQuantity.forEach((item) => {
        //On écoute le changement sur l'input "itemQuantity"
        item.addEventListener("change", (event) => {
            event.preventDefault();
            ModifiedQuantity = Number(item.value);
            //ON cherche l'élément parent "article" de l'entrée et utilise ses attributs dataset (en particulier id et color) 
            //pour trouver l'article correspondant dans le panier d'achat, qui est stocké dans le tableau productputinLocalStorage
            let myArticle = item.closest('article');
                //console.log(myArticle);
            // On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité
            let FindMyArticleInLocalStorage = productputinLocalStorage.find
            ( element => element.idProduct === myArticle.dataset.id && element.colorProduct === myArticle.dataset.color );
            
            // Si la quantité est comprise entre 1 et 100 et que c'est un nombre entier,...
            //...on met à jour la quantité dans le localStorage et le DOM
            if(ModifiedQuantity > 0 && ModifiedQuantity <= 100 && Number.isInteger(ModifiedQuantity)){
                parseModifiedQuantity = parseInt(ModifiedQuantity);
                FindMyArticleInLocalStorage.quantityProduct = parseModifiedQuantity;
                localStorage.setItem("produit", JSON.stringify(productputinLocalStorage));
                // Et, on Recalculer la quantité et le prix Total du panier
                RecalculateTotalQuantity();
                RecalculateTotalPrice();
                messageErrorQuantity = false;
            }
            // Sinon, on remet dans le DOM la quantité indiquée dans le localStorage et on indique un message d'erreur
            else{
                item.value = FindMyArticleInLocalStorage.quantityProduct;
                messageErrorQuantity = true;
            }
            if(messageErrorQuantity){       
                alert("La quantité d'un article doit être un nombre entier compris entre 1 et 100 pour le même article de référence et de couleur. Veuillez modifier la quantité choisie pour respecter cette plage de valeurs..");
            } 
        });
    });
}
//Cette fonction JavaScript permet de supprimer un article du panier. 
//Elle ajoute un écouteur d'événements sur tous les boutons de suppression de produit dans le panier (selectSupprimer).
function deleteProduct() {
    let selectSupprimer = document.querySelectorAll(".deleteItem");
    selectSupprimer.forEach((selectSupprimer) => {
            selectSupprimer.addEventListener("click" , (event) => {
                event.preventDefault();
                            
//identifie l'article dans le panier qui doit être supprimé en utilisant la méthode closest() pour trouver le parent hiérarchique <article> du bouton de suppression de produit.
                let myArticle = selectSupprimer.closest('article');
                console.log(myArticle);
                //filtre le tableau stocké dans le localStorage pour ne garder que les éléments qui ne correspondent pas à l'article à supprimer, en utilisant la méthode filter().
                RegisteredProducs = RegisteredProducs.filter
                ( element => element.idProduct !== myArticle.dataset.id || element.colorProduct !== myArticle.dataset.color );
                
                //MISE à jour du localStorage
                localStorage.setItem("produit", JSON.stringify(RegisteredProducs));
                
                //Alerte de suppression du produit 
                alert("Ce produit va être supprimé du panier.");
                // Elle supprime physiquement l'article du panier en utilisant la méthode removeChild() pour supprimer le nœud <article> correspondant du DOM.
                if (myArticle.parentNode) {
                    myArticle.parentNode.removeChild(myArticle);
                }
                //Si le panier est maintenant vide, on appelle la fonction messagePanierVide() pour afficher un message approprié.
                if(RegisteredProducs === null || RegisteredProducs.length === 0){
                    messagePanierVide();
                }
                else{
                // Sinon, on Recalculer la quantité et le prix total du panier en appelant les fonctions RecalculateTotalQuantity() et RecalculateTotal Price().
                RecalculateTotalQuantity();
                RecalculateTotalPrice();
                }
            }); 
    })
}

// fonction qui affiche le message "Le panier est vide !" lorsque le panier ne contient aucun produit
function messagePanierVide() {
    compositionProduitsPanier = 'Le panier est vide !';
    let newH2 = document.createElement('h2');
    productsPositionHtml.appendChild(newH2);
    newH2.textContent = compositionProduitsPanier;
    // remplace les valeurs des éléments HTML correspondant à la quantité et au prix total du panier par des zéros 
    document.getElementById("totalQuantity").textContent = 0;
    document.getElementById("totalPrice").textContent = 0;
}