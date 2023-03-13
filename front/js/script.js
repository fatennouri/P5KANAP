fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(products => {
    for (const product of products) {
      console.log(products);
      /*FAUT ENVOYER LES DONNEES DANS LA PAGE INDEX (création des élements qui manque et ajout des data de l'api) */
      const Items = document.querySelector("#items");
      /*la section Items est l'emplacement de tous les produits*/
      let link = document.createElement('a')
      let productId = product._id
      link.setAttribute("href", `./product.html?id=${productId}`);
      Items.appendChild(link);
      let article = document.createElement('article');
      link.appendChild(article);

      let productimage = document.createElement('img');
      productimage.setAttribute("src", product.imageUrl);
      productimage.setAttribute("alt", product.altTxt);
      article.appendChild(productimage);

      let H3 = document.createElement('h3');
      H3.classList.add("productName");
      H3.textContent = product.name;
      article.appendChild(H3);

      let articleP = document.createElement('P');
      articleP.classList.add("productDescription");
      articleP.textContent = product.description;
      article.appendChild(articleP);
    }
  })
  .catch(err => {
    alert(`Veuillez nous excuser, mais une erreur est survenue et elle empêche l'affichage des produits de notre catalogue!`);
    console.log("Erreur Fetch script.js", err);
  })

