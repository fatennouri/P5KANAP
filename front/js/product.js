//récupérer l’id du produit ayant été cliqué sur la page d’accueil.

const productId = new URLSearchParams(window.location.search).get("id");

if (productId !== null) {
  // Récupération des données du produit depuis l'API
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(data => {
      const chosenProduct = data; // stocker les données du produit dans la variable chosenProduct
      console.log(chosenProduct); // afficher les données du produit dans la console

      // Mise à jour de la page du produit avec les détails du produit sélectionné
      document.title = chosenProduct.name;
// création de la balise <IMG>
      const img = document.createElement("img");
      img.src = chosenProduct.imageUrl;
      img.alt = chosenProduct.altTxt;
      
      //ajout des élements correspondant au produit choisi

      document.getElementsByClassName("item__img")[0].appendChild(img);
      document.getElementById("title").textContent = chosenProduct.name;
      document.getElementById("price").textContent = chosenProduct.price + " ";
      document.getElementById("description").textContent = chosenProduct.description;

//utilisation de la boucle foreach pour parcourir les couleurs
      chosenProduct.colors.forEach(function (color) {
          // Créer un nouvel élément d'option
        const option = document.createElement("option");
        
  // Récupérer l'élément de sélection par son ID
        const select = document.getElementById("colors");


        // Configurer l'option avec la couleur en tant que valeur et texte

        option.value = color;
        option.textContent = color;

 // Ajouter l'option nouvellement créée à l'élément de sélection
        select.appendChild(option);
      });
    });

    // Récupérer des données choisies par l'utilisateur pour les envoyer dans le panier d'achat
// Sélection du bouton "Ajouter au panier" en utilisant son ID
const selectPanierButton = document.getElementById('addToCart');

// Ajout d'un écouteur d'événements sur le bouton
selectPanierButton.addEventListener("click", (event)=>{
  event.preventDefault();

// récupérer l'ID colors pour le choisir la couleur
 let colorId = document.getElementById('colors');

 //récupérer la couleur sélectionnée par l'utilisateur et la mettre dans une variable pour étre réutiliser aprés
 chosencolor= colorId.value;

 //sélectionner l'élément HTML correspondant à la quantité choisie par l'utilisateur pour un produit à l'aide de l"id"
 //création d'une variable "quantity" pour le réferencer dans le code js
 // LA VALEUR CHOISIE va etre stocker dans la variable "Quantitychosen" après avoir été convertie en un nombre à l'aide de la fonction "Number()

 const quantity = document.getElementById("#quantity")
  Quantitychosen = Number(quantity.value);
 console.log(Quantitychosen);
// une autre alternative pour cette partie (quantity) serait la parseInt pour transformer les chaine de caractére en nombre
 // Quantitychosen = parseInt(document.getElementById("#quantity").value); console.log(Quantitychosen); 

 //étape 6: récupérer les données saisies par l'utilisateur (id, color, quantity)
 // ces données seront utiliser pour commander ou mettre à jours les info stockés
 //en vérifiant que la couleur est sélectionnée, que la quantité est comprise entre 1 et 100 et qu'elle est un nombre entier 

 if (choiceColor && choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)) {
  const Productchoices = {
    idProduct: chosenProduct._id,
    colorProduct: Colorchosen,
    quantityProduct: Quantitychosen
  }
  console.log(Productchoises);
  // utilisation du local storage (objet js pour stocker les données avec clé/valeur)
  //En créant une variable "LocalStorageNotification" avec une valeur initiale de "false", 
  //on pourra ultérieurement afficher un message à l'utilisateur si un produit est ajouté dans le "localStorage".
 
  let LocalStorageNotification = false
 
  //function addproduct to localstorage avec tous les choices id, color, quantity
  const addProducttoStorage = () => {
    //SI le produit et la couleur sélectionnés par l'utilisateur existent déjà dans le "localStorage", 
    // ALORS seule la quantité du produit sera modifiée en y ajoutant la quantité du produit sélectionné.

const existingProduct = productputinLocalStorage.find(product => product.productId === Productchoices.productId && product.colorProduct === Productchoices.colorProduct);

if (existingProduct) {
  const totalQuantity = Number(existingProduct.quantityProduct) + Number(Productchoices.quantityProduct);
  if(total <= 100){
    // la variable LocalStorageNotification est définie sur false pour indiquer qu'aucun message n'a encore été affiché dans un certain contexte, afin de pouvoir afficher un message plus approprié ultérieurement.
    LocalStorageNotification = false;
    existingProduct.quantityProduct = Number(existingProduct.quantityProduct) + Number(Productchoices.quantityProduct);
    alert(`La quantité du produit ${chosenProduct.name} de couleur ${Colorchosen} a été mise à jour.`);
}
else{
//si la quantité dépasse 100 on déchlenche une alerte et on demande à l'utilisateur de modifier la quantité
LocalStorageNotification = false;
const errorMessage = "La quantité d'un article ne peut pas dépasser 100. Merci de modifier la quantité demandée.";
alert(errorMessage);
}
  }
  //Si le produit sélectionné et sa couleur n'ont pas encore été enregistrés dans le stockage local, 
  //nous allons ajouter ces informations au stockage local en tant que nouveau produit avec les options sélectionnées.
else{
 // Nous définissons la variable "message" sur "true" car nous souhaitons afficher ce message en particulier.
LocalStorageNotification = true;

//Les options choisies pour le produit sont stockées dans la variable "productputinLocalStorage" 
//à l'aide de la méthode "push", qui ajoute ces options à la fin du tableau existant.

productputinLocalStorage.push(Productchoices)
}
//Nous convertissons les informations sélectionnées au format JSON, 
//puis nous les envoyons et stockons dans la clé "produit" du stockage local.

//Nous utilisons la méthode "setItem" de l'objet "localStorage" pour stocker les options du produit sous la clé "product".
// Nous utilisons la méthode "JSON.stringify" pour convertir les options au format JSON avant de les stocker dans le stockage local.

localStorage.setItem("produit", JSON.stringify(productputinLocalStorage))
}//end of function addProducttoStorage

//Nous créons une variable nommée "productputinLocalStorage" pour stocker les informations du produit enregistrées dans le localStorage.
// Nous utilisons la méthode "getItem" de l'objet "localStorage" pour récupérer les clés et les valeurs stockées dans le localStorage sous la clé "produit". 
//Cette étape nous permet de vérifier si le localStorage est vide ou non.

let productputinLocalStorage = JSON.parse(localStorage.getItem("produit"));
//La méthode "JSON.parse()" est une méthode JavaScript qui permet de convertir une chaîne de caractères JSON en objet JavaScript.

//Si la clé "produit" existe déjà dans le localStorage, cela signifie qu'il y a des produits enregistrés.
 //Dans ce cas, la fonction "addProducttoStorage()" est appelée pour ajouter de nouveaux produits à la liste existante, 
//puis la liste de produits est affichée dans la console pour vérifier si le nouveau produit a été ajouté avec succès.
if(productputinLocalStorage){
  addProducttoStorage();
  console.log(productputinLocalStorage);
}
//Si le localStorage ne contient pas de clé nommée "produit", cela signifie qu'aucun produit n'a été enregistré auparavant. 
//Dans ce cas, une nouvelle liste vide est créée pour stocker les nouveaux produits, 
//puis la fonction "addProducttoStorage()" est appelée pour ajouter des produits à cette liste.
//Enfin, la liste de produits est affichée dans la console pour vérifier si le produit a été ajouté avec succès.
else{
    productputinLocalStorage = [];
    addProducttoStorage();
    console.log(prouctputinLocalStorage);
    // Mise à jour de la variable "messageLocalStorageUpdating" pour afficher un message de succès
LocalStorageNotification = false;

// Affichage d'un message d'alerte pour indiquer que le premier produit a été ajouté avec succès dans le panier
alert(`Félicitations ! Vous venez d'ajouter votre premier produit dans le panier ! `);
}
 // si la variable LocalStorageNotification est vrai alors on affiche ce message pour confirmer l'ajout d'un produits avec ses détails :
 if(LocalStorageNotification){
  alert(`Le produit ${chosenProduct.name} de couleur ${Colorchosen} a bien été ajouté au panier.`);
  }
}
//si la couleur n'est pas choisie et/ou la quantité n'est pas valide(100>non valide<1)
else {
  alert(`Veuillez sélectionner une couleur et une quantité comprise entre 1 et 100 (entier) pour ajouter le produit au panier !`);
}
});
}