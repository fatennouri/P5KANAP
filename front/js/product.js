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
      document.getElementsByClassName("item__img")[0].appendChild(img);
      document.getElementById("title").innerText = chosenProduct.name;
      document.getElementById("price").innerText = chosenProduct.price + " ";
      document.getElementById("description").innerText = chosenProduct.description;

 
//utilisation de la boucle foreach pour parcourir les couleurs
      chosenProduct.colors.forEach(function (color) {
          // Créer un nouvel élément d'option
        const option = document.createElement("option");
        
  // Récupérer l'élément de sélection par son ID
        const select = document.getElementById("colors");

// Configurer l'option avec la couleur en tant que valeur et texte

        option.value = color;
        option.innerText = color;

 // Ajouter l'option nouvellement créée à l'élément de sélection
        select.appendChild(option);
      });
    });
}