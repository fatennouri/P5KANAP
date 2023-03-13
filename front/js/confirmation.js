//La première fonction getOrderId() utilise l'API URLSearchParams pour extraire la valeur du paramètre "orderId" de l'URL de la page. 
function getOrderId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has("orderId") ? urlParams.get("orderId") : null;
}
//La deuxième fonction showOrderId() prend cette valeur orderId en paramètre et l'affiche dans un élément HTML avec l'ID "orderId"
function showOrderId(orderId) {
    const orderIdElement = document.querySelector("#orderId");
    if (orderIdElement) {
        orderIdElement.innerText = orderId;
    }
}
//La troisième fonction emptylocalstorage() supprime toutes les données stockées localement dans le navigateur en utilisant l'objet localStorage.
function emptylocalstorage() {
    localStorage.clear();
}