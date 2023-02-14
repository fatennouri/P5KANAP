
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);


if (productId !== null){
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(selectProduct => {
    console.log(selectProduct);

//Affichage sur la page product.html du canapé sélectionné sur la page d'accueil, à partir de l'id de l'URL

    document.title = selectProduct.name;
    const img = document.createElement("img");
    img.src = selectProduct.imageUrl;
    img.alt = selectProduct.altTxt;
    document.getElementsByClassName("item__img")[0].appendChild(img);
    document.getElementById("title").innerText = selectProduct.name;
    document.getElementById("price").innerText = selectProduct.price + " ";
    document.getElementById("description").innerText = selectProduct.description;

    // Boucle forEach pour ajouter toutes les couleurs en option du select en HTML
    selectProduct.colors.forEach(function (color) {
        const option = document.createElement("option");
        const select = document.getElementById("colors");
    
        // Récupération des données de l'API
        option.value = color;
        option.innerText = color;
    
        // Ajout de l'option à la sélection (select en HTML)
        select.appendChild(option);
    })

// Récupération des données sélectionnées par l'utilisateur pour l'envoi vers le panier

    const selectBoutonPanier = document.querySelector("#addToCart");
        selectBoutonPanier.addEventListener("click", (event)=>{
            event.preventDefault();
            const colorId = document.querySelector("#colors");
            choiceColor = colorId.value;
            const quantity = document.querySelector("#quantity");
            choiceQuantity = Number(quantity.value);
            console.log(choiceQuantity);

           // Récupération des données (id, couleur et quantité) après les choix faits par l'utilisateur,....
            if (choiceColor !== "" && choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)) {
                let optionsProduct = {
                    idProduct: selectProduct._id ,
                    colorProduct: choiceColor ,
                    quantityProduct: choiceQuantity
                }
                console.log(optionsProduct);
                let messageLocalStorageUpdating = false;
                const addProductLocalStorage = () => {
        
                    let findProduct = produitEnregistreDansLocalStorage.find((x) => {return x.idProduct === optionsProduct.idProduct && x.colorProduct === optionsProduct.colorProduct});
                    if(findProduct){
                        const total = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
                        if(total <= 100){
                            messageLocalStorageUpdating = false;
                            findProduct.quantityProduct = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
                            alert(`La quantité du produit ${selectProduct.name} de couleur ${choiceColor} a bien été mise à jour.`);
                        }
                        else{
                            messageLocalStorageUpdating = false;
                            alert("La quantité d'un article (même référence et même couleur) ne peut pas dépasser 100. Merci de rectifier la quantité choisie.");
                        }
                    }
                    else{
                        messageLocalStorageUpdating = true;
                        produitEnregistreDansLocalStorage.push(optionsProduct);
                    }
                    localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage))
                }// end fonction addProductLocalStorage

                let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

                 // if le localStorage contient une clé "produit"
                if(produitEnregistreDansLocalStorage){
                    addProductLocalStorage();
                    console.log(produitEnregistreDansLocalStorage);
                }
                // if le localStorage est vide
                else{
                    produitEnregistreDansLocalStorage = [];
                    addProductLocalStorage();
                    console.log(produitEnregistreDansLocalStorage);
                    messageLocalStorageUpdating = false;
                    alert(`Félicitations !! Vous venez d'ajouter votre premier produit dans le panier ! `);
                }
                if(messageLocalStorageUpdating){
                    alert(`Le produit ${selectProduct.name} de couleur ${choiceColor} a bien été ajouté au panier.`);
                    }
            }
            // if la couleur n'est pas choisie ou la quantité > 100 on met un message d'alerte
            else {
                alert(`La couleur n'est pas sélectionnée et/ou la quantité n'est pas comprise entre 1 et 100 ou n'est pas un nombre entier. Veuillez vérifier !`);
            }
        });
    })
    .catch((err) => {
        console.log("Erreur Fetch product.js : l'id du produit est incorrect.", err);
        alert(`Le produit sélectionné n'a pas été trouvé !`);
        window.location.href = "index.html";
    })
}
else{
    console.log("L'id du produit n'a pas été indiqué dans l'url.");
    alert(`Le produit sélectionné n'a pas été trouvé !`);
    window.location.href = "index.html";
 }
